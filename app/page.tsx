"use client";
import { useState } from "react";
import { Assistant } from "@/components/Assistant";
import { Header } from "@/components/Header";

export default function Home() {
  const [inputMode, setInputMode] = useState<"text" | "audio">("text");

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl mt-20">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6 flex justify-center">
            <div className="relative inline-flex rounded-full bg-gray-100 p-1 shadow-inner">
              <button
                type="button"
                className={`relative px-6 py-2 text-sm font-medium transition-all duration-200 ease-in-out rounded-full ${
                  inputMode === "text"
                    ? "bg-[#60A5FA] text-white shadow-md transform -translate-y-0.5"
                    : "bg-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setInputMode("text")}
              >
                Text
              </button>
              <button
                type="button"
                className={`relative px-6 py-2 text-sm font-medium transition-all duration-200 ease-in-out rounded-full ${
                  inputMode === "audio"
                    ? "bg-[#60A5FA] text-white shadow-md transform -translate-y-0.5"
                    : "bg-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setInputMode("audio")}
              >
                Audio
              </button>
            </div>
          </div>
          <Assistant inputMode={inputMode} />
        </div>
      </div>
      <footer className=" text-gray py-4 shadow-inner">
        <div className="container mx-auto flex justify-center items-center">
          <p className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
            © 2025 Таван Богд Файнанс ББСБ
          </p>
        </div>
      </footer>
    </main>
  );
}
