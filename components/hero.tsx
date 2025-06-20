import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Hero = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const [resumeText, setResumeText] = useState("");

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setResumeText(text);
  };

  const handleSend = async () => {
    if (!input.trim() && !resumeText.trim()) return;

    if (input.trim()) {
      const newUserMessage: Message = { role: "user", content: input };
      setMessages((prev) => [...prev, newUserMessage]);
    }
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input, resume: resumeText }),
      });
      if (!res.ok) {
        throw new Error("Failed to send message");
      }
      const data = await res.json();
      const modelReply: Message = {
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [...prev, modelReply]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="grid w-full gap-3 max-w-4xl mx-auto pt-4 px-4 md:px-1">
      <div className="flex justify-center items-center mb-4 flex-col">
      <h1 className="text-5xl font-bold text-purple-400 text-center">
        Roastumé
      </h1>
      <div className="text-gray-400 text-sm mt-2">
        Upload your resume or type a message to get brutally honest feedback
        </div>
      </div>
      <div
        ref={chatRef}
        className="rounded-md bg-black/20 border border-white/20 p-4 h-[400px] overflow-y-auto space-y-2"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[40%] text-md ${
              msg.role === "user"
                ? "bg-purple-600 text-white self-end ml-auto"
                : "bg-white text-black self-start"
            }`}
          >
            <strong className="block text-xs mb-1 opacity-70">
              {msg.role === "user" ? "You" : "Roastumé"}
            </strong>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="text-xs text-gray-400 italic">Loading...</div>
        )}
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 ..."
      />
      <div className="flex items-center gap-2">
        <Textarea
          id="message"
          placeholder="Type your message here. (Optional if uploading resume)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button onClick={handleSend} disabled={loading}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Hero;
