"use client";

import { useState, useRef, useEffect } from "react";
import { Message } from "@/components/Message";
import { LoadingDots } from "@/components/LoadingDots";
import { AudioRecorder } from "@/components/AudioRecorder";
import { transcribeAudio } from "@/utils/transcribe";

type MessageType = {
  role: "user" | "assistant";
  content: string;
};

type AssistantProps = {
  inputMode: "text" | "audio";
};

export function Assistant({ inputMode }: AssistantProps) {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      role: "assistant",
      content:"Сайн байна уу! Би таны зээлийн туслах байна."
   },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent, userInput: string = input) => {
    e.preventDefault();
    if (!userInput.trim() || isProcessing) return;

    const userMessage = { role: "user", content: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, there was an error processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAudioInput = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      const transcription = await transcribeAudio(audioBlob);
      setInput(transcription);
      // Automatically submit after transcription
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSubmit(fakeEvent, transcription);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh]">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg py-2 px-4 max-w-[80%]">
              <LoadingDots />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto">
        {inputMode === "text" ? (
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Зээлийн талаар..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={isProcessing}
            />
            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        ) : (
          <AudioRecorder onAudioRecorded={handleAudioInput} isDisabled={isProcessing} />
        )}
      </div>
    </div>
  );
}