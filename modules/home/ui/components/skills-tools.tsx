"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  PointerEvent as ReactPointerEvent,
} from "react";

type Item = {
  id: number;
  label: string;
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex: number;
};

const SKILLS = [
  "Product Design",
  "Interaction Design",
  "UX Design",
  "Mentoring",
  "User Testing",
  "ReactJs",
  "NextJs",
  "Java",
  "NodeJs",
  "Spring Boot",
  "Microservices",
  "Usability Testing",
  "Leadership",
  "UI Design",
  "Web Design",
];

/** Rectangle overlap detection */
function rectsOverlap(
  a: { left: number; top: number; width: number; height: number },
  b: { left: number; top: number; width: number; height: number }
) {
  return !(
    a.left + a.width <= b.left ||
    b.left + b.width <= a.left ||
    a.top + a.height <= b.top ||
    b.top + b.height <= a.top
  );
}

export default function SkillsToolsDraggable(): React.ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measuringRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const draggingRef = useRef<{
    id: number;
    offsetX: number;
    offsetY: number;
    pointerId: number;
  } | null>(null);
  const rafRef = useRef<number | null>(null);

  const [items, setItems] = useState<Item[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Measure container size and update on resize
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateContainerSize = () => {
      const rect = container.getBoundingClientRect();
      setContainerSize({
        width: rect.width,
        height: rect.height,
      });
    };

    updateContainerSize();

    const resizeObserver = new ResizeObserver(updateContainerSize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Seed initial positions with boundary checks
  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return;

    const seeded = SKILLS.map((label, i) => {
      // Calculate initial positions within safe boundaries
      const estimatedWidth = 120;
      const estimatedHeight = 40;
      const pad = 8;

      const maxLeft = containerSize.width - estimatedWidth - pad;
      const maxTop = containerSize.height - estimatedHeight - pad;

      // Ensure initial positions are within bounds
      const left = Math.max(
        pad,
        Math.min(40 + (i % 3) * 120 + (i % 2 === 0 ? -20 : 10), maxLeft)
      );
      const top = Math.max(
        pad,
        Math.min(40 + Math.floor(i / 3) * 48 + (i % 2 === 0 ? -10 : 20), maxTop)
      );

      return {
        id: i,
        label,
        left,
        top,
        width: estimatedWidth,
        height: estimatedHeight,
        zIndex: 1,
      };
    }) as Item[];

    setItems(seeded);
  }, [containerSize]);

  // Measure actual sizes after first paint and clamp within container
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || containerSize.width === 0) return;

    setItems((prev) =>
      prev.map((it) => {
        const el = measuringRefs.current[it.id];
        if (!el) return it;

        const rect = el.getBoundingClientRect();
        const w = Math.round(rect.width);
        const h = Math.round(rect.height);
        const pad = 8;

        // Ensure items stay within container boundaries
        const maxLeft = containerSize.width - w - pad;
        const maxTop = containerSize.height - h - pad;

        const left = Math.max(pad, Math.min(it.left, maxLeft));
        const top = Math.max(pad, Math.min(it.top, maxTop));

        return { ...it, width: w, height: h, left, top };
      })
    );
  }, [containerSize]);

  // helpers
  const getItem = (id: number) => items.find((i) => i.id === id);

  const updateItemPos = (
    id: number,
    left: number,
    top: number,
    zIndex?: number
  ) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, left, top, zIndex: zIndex ?? it.zIndex } : it
      )
    );
  };

  // Check if position is valid (no overlaps and within bounds)
  const isValidPosition = (id: number, left: number, top: number) => {
    const container = containerRef.current;
    const item = getItem(id);
    if (!container || !item) return false;

    // Check boundaries strictly
    const pad = 8;
    if (left < pad || top < pad) return false;
    if (left + item.width > container.clientWidth - pad) return false;
    if (top + item.height > container.clientHeight - pad) return false;

    // Check overlaps with other items
    const candidateRect = {
      left,
      top,
      width: item.width,
      height: item.height,
    };

    const others = items.filter((i) => i.id !== id);
    const hasOverlap = others.some((other) =>
      rectsOverlap(candidateRect, {
        left: other.left,
        top: other.top,
        width: other.width,
        height: other.height,
      })
    );

    return !hasOverlap;
  };

  // Find nearest valid position
  const findNearestValidPosition = (
    id: number,
    startLeft: number,
    startTop: number
  ) => {
    const container = containerRef.current;
    const item = getItem(id);
    if (!container || !item) return { left: startLeft, top: startTop };

    const pad = 8;
    const maxLeft = container.clientWidth - item.width - pad;
    const maxTop = container.clientHeight - item.height - pad;

    // First try the exact position
    if (isValidPosition(id, startLeft, startTop)) {
      return { left: startLeft, top: startTop };
    }

    // Search in expanding circles around the desired position
    const maxRadius = Math.max(container.clientWidth, container.clientHeight);

    for (let radius = 1; radius <= maxRadius; radius += 2) {
      // Check positions in a spiral pattern
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
        const offsetX = Math.round(Math.cos(angle) * radius);
        const offsetY = Math.round(Math.sin(angle) * radius);

        const candidateLeft = Math.max(
          pad,
          Math.min(maxLeft, startLeft + offsetX)
        );
        const candidateTop = Math.max(
          pad,
          Math.min(maxTop, startTop + offsetY)
        );

        if (isValidPosition(id, candidateLeft, candidateTop)) {
          return { left: candidateLeft, top: candidateTop };
        }
      }
    }

    // Fallback: return to original position
    return { left: item.left, top: item.top };
  };

  // Pointer handlers
  const onPointerDown = (e: ReactPointerEvent, id: number) => {
    const el = measuringRefs.current[id];
    const container = containerRef.current;
    if (!el || !container) return;

    try {
      el.setPointerCapture(e.nativeEvent.pointerId);
    } catch {
      // ignore if setPointerCapture not allowed
    }

    const item = getItem(id);
    if (!item) return;
    const containerRect = container.getBoundingClientRect();

    draggingRef.current = {
      id,
      offsetX: e.clientX - (containerRect.left + item.left),
      offsetY: e.clientY - (containerRect.top + item.top),
      pointerId: e.nativeEvent.pointerId,
    };

    // raise zIndex while dragging
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, zIndex: 999 } : { ...it, zIndex: 1 }
      )
    );
  };

  const onPointerMove = (e: PointerEvent) => {
    const drag = draggingRef.current;
    const container = containerRef.current;
    if (!drag || !container) return;
    if (e.pointerId !== drag.pointerId) return;

    const containerRect = container.getBoundingClientRect();
    const item = getItem(drag.id);
    if (!item) return;

    let newLeft = e.clientX - containerRect.left - drag.offsetX;
    let newTop = e.clientY - containerRect.top - drag.offsetY;

    // Apply strict boundary constraints
    const pad = 8;
    const maxLeft = containerRect.width - item.width - pad;
    const maxTop = containerRect.height - item.height - pad;

    newLeft = Math.max(pad, Math.min(newLeft, maxLeft));
    newTop = Math.max(pad, Math.min(newTop, maxTop));

    // Check for overlaps and adjust position if needed
    if (!isValidPosition(drag.id, newLeft, newTop)) {
      const validPos = findNearestValidPosition(drag.id, newLeft, newTop);
      newLeft = validPos.left;
      newTop = validPos.top;
    }

    updateItemPos(drag.id, newLeft, newTop, 999);
  };

  const onPointerUp = (e: PointerEvent) => {
    const drag = draggingRef.current;
    const container = containerRef.current;
    if (!drag || !container) return;

    // Ensure final position is valid
    const item = getItem(drag.id);
    if (item && !isValidPosition(drag.id, item.left, item.top)) {
      const validPos = findNearestValidPosition(drag.id, item.left, item.top);
      updateItemPos(drag.id, validPos.left, validPos.top, 1);
    } else {
      setItems((prev) =>
        prev.map((it) => (it.id === drag.id ? { ...it, zIndex: 1 } : it))
      );
    }

    // release capture
    try {
      measuringRefs.current[drag.id]?.releasePointerCapture(drag.pointerId);
    } catch {
      /* ignore */
    }

    draggingRef.current = null;
  };

  // Attach pointermove/up to container
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const moveHandler = (ev: PointerEvent) => onPointerMove(ev);
    const upHandler = (ev: PointerEvent) => onPointerUp(ev);
    c.addEventListener("pointermove", moveHandler);
    c.addEventListener("pointerup", upHandler);
    c.addEventListener("pointercancel", upHandler);
    return () => {
      c.removeEventListener("pointermove", moveHandler);
      c.removeEventListener("pointerup", upHandler);
      c.removeEventListener("pointercancel", upHandler);
    };
  }, [items]);

  // cancel RAF helper
  const cancelRAF = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      cancelRAF();
    };
  }, []);

  // render
  return (
    <div className="">
      <div
        className="rounded-2xl border border-gray-200 bg-white p-2"
        style={{ minHeight: 420, position: "relative", overflow: "hidden" }}
      >
        <h2 className="text-2xl font-bold mb-2">
          Skills & <span className="text-blue-600">Tools</span>
        </h2>

        <div
          ref={containerRef}
          style={{
            position: "relative",
            height: 340,
            marginTop: 8,
            // borderRadius: 16,
            // border: "1px solid #e5e7eb",
            background: "rgba(249, 250, 251, 0.5)",
            overflow: "hidden", // Prevent any overflow
          }}
        >
          {items.map((it) => {
            const isDragging = draggingRef.current?.id === it.id;
            const wrapperStyle: React.CSSProperties = {
              position: "absolute",
              left: it.left,
              top: it.top,
              width: it.width,
              height: it.height,
              transform: `rotate(${((it.id % 5) - 2) * 6}deg)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "grab",
              userSelect: "none",
              zIndex: it.zIndex ?? 1,
              transition: isDragging
                ? "none"
                : "transform 150ms, top 300ms, left 300ms",
            };

            const pillStyle: React.CSSProperties = {
              padding: "10px 18px",
              borderRadius: 999,
              background: "rgba(59,130,246,0.06)",
              color: "#3b82f6",
              border: "1px solid rgba(59,130,246,0.12)",
              fontSize: 16,
              fontWeight: 500,
              boxShadow: "0 1px 0 rgba(0,0,0,0.03)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            };

            return (
              <div
                key={it.id}
                ref={(el) => {
                  measuringRefs.current[it.id] = el;
                }}
                onPointerDown={(e) => onPointerDown(e, it.id)}
                style={wrapperStyle}
              >
                <div style={pillStyle}>{it.label}</div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          4+ years of design experience
        </p>
      </div>
    </div>
  );
}
