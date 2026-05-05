"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, ArrowRightLeft, ArrowDown } from "lucide-react";
import { translateOffline, saveHistory, getHistory, getGlossary } from "@/lib/offline-engine";

export function TextTranslator({ onTranslate }: { onTranslate?: (orig: string, trans: string) => void }) {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState<"English" | "Ilonggo">("English");
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    setIsTranslating(true);
    setTimeout(() => {
      const glossary = getGlossary();
      const finalTranslation = translateOffline(inputText, targetLang, glossary);
      setTranslatedText(finalTranslation);
      setIsTranslating(false);
      onTranslate?.(inputText, finalTranslation);
      saveHistory(inputText, finalTranslation);
    }, 150);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="px-5 py-6 max-w-md mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="section-title mb-0">Translate</span>
        </div>
        <Select value={targetLang} onValueChange={(val) => setTargetLang(val as "English" | "Ilonggo")}>
          <SelectTrigger className="w-36 h-9 bg-white border-2 border-blue-200 rounded-xl text-sm font-medium shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="English">to English</SelectItem>
            <SelectItem value="Ilonggo">to Ilonggo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="ios-card overflow-hidden">
        <textarea
          placeholder="Type in Ilonggo or English..."
          className="w-full px-4 pt-4 pb-3 min-h-[160px] resize-none text-lg leading-relaxed bg-transparent focus:outline-none ios-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="flex items-center justify-between px-4 pb-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">{inputText.length} characters</span>
          <button
            onClick={handleTranslate}
            disabled={isTranslating || !inputText.trim()}
            className="translate-btn px-5 py-2 h-9 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTranslating ? "Translating..." : "Translate"}
          </button>
        </div>
      </div>

      {translatedText && (
        <div className="result-box overflow-hidden">
          <div className="px-4 pt-4 pb-3">
            <p className="text-lg leading-relaxed text-blue-900 font-medium">
              {translatedText.replace(" (some words unknown)", "")}
            </p>
            {translatedText.includes("?") && (
              <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-700 font-medium">Some words unknown — try Word Collector to teach the app</p>
              </div>
            )}
          </div>
          <div className="px-4 pb-3 flex justify-end">
            <button
              onClick={() => copyToClipboard(translatedText.replace(" (some words unknown)", ""))}
              className="flex items-center gap-1.5 text-xs text-blue-700 font-medium px-3 py-1.5 rounded-lg bg-blue-100 active:bg-blue-200 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
