"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    console.log("🟡 Form submitted with data:", formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("🟡 Response status:", res.status);
      console.log(
        "🟡 Response headers:",
        Object.fromEntries(res.headers.entries())
      );

      if (res.ok) {
        const data = await res.json();
        console.log("✅ Success response:", data);
        setResult("Message sent — thanks!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.log("❌ Error response status:", res.status);
        // Try to get error message from response
        try {
          const errorData = await res.json();
          console.log("❌ Error response data:", errorData);
          setResult(`Error: ${errorData?.error ?? "Failed to send message"}`);
        } catch (parseError) {
          console.log("❌ Could not parse error response");
          setResult(`Error: HTTP ${res.status} - ${res.statusText}`);
        }
      }
    } catch (err: any) {
      console.error("❌ Network error:", err);
      setResult(`Error: ${err?.message ?? "Network error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Get in Touch</CardTitle>
        <CardDescription>
          Looking to start a project and need that magical touch? Let's talk
          about making it come to life.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <textarea
            name="message"
            placeholder="Provide a detailed explanation of your problem/question"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send your message"}
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </form>

        {result && (
          <div className="mt-4 p-3 rounded bg-gray-100 text-sm">{result}</div>
        )}
      </CardContent>
    </Card>
  );
}
