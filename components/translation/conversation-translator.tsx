"use client";

import React, { useState } from "react";
import { translateOffline, getGlossary, saveHistory } from "@/lib/offline-engine";

type ConversationMessage = {
  text: string;
  translation: string;
  from: "ilonggo" | "english";
  timestamp: number;
};

export function ConversationTranslator() {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [speakingAs, setSpeakingAs] = useState<"ilonggo" | "english">("ilonggo");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const glossary = getGlossary();
      const targetLang = speakingAs === "ilonggo" ? "English" : "Ilonggo";
      const translation = translateOffline(inputText, targetLang, glossary);
      const newMessage: ConversationMessage = {
        text: inputText.trim(),
        translation,
        from: speakingAs,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, newMessage]);
      saveHistory(inputText.trim(), translation);
      setInputText("");
      setIsProcessing(false);
    }, 200);
  };

  return (
    <div className="px-5 py-4 max-w-md mx-auto flex flex-col h-[calc(100vh-160px)]">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSpeakingAs("ilonggo")}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
            speakingAs === "ilonggo" ? "bg-sky-600 text-white shadow-lg shadow-sky-600/30" : "bg-slate-800 text-gray-400 border border-slate-700"
          }`}
        >
          Ilonggo → English
        </button>
        <button
          onClick={() => setSpeakingAs("english")}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
            speakingAs === "english" ? "bg-sky-600 text-white shadow-lg shadow-sky-600/30" : "bg-slate-800 text-gray-400 border border-slate-700"
          }`}
        >
          English → Ilonggo
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {messages.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-sm">Start a conversation</p>
            <p className="text-xs mt-1">Translate back and forth in real time</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "ilonggo" ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              msg.from === "ilonggo"
                ? "ios-card border border-slate-700"
                : "bg-sky-600 text-white"
            }`}>
              <p className="font-medium text-base">{msg.text}</p>
              <p className={`text-sm mt-1 ${msg.from === "ilonggo" ? "text-sky-400" : "text-sky-100"}`}>
                {msg.translation}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-3 border-t border-slate-700">
        <input
          type="text"
          placeholder={speakingAs === "ilonggo" ? "Type in Ilonggo..." : "Type in English..."}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
          className="flex-1 px-4 py-3 bg-slate-800 rounded-xl border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500 ios-input"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputText.trim() || isProcessing}
          className="px-5 py-3 bg-sky-600 text-white rounded-xl font-semibold text-sm disabled:opacity-40 active:scale-[0.98] transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}
