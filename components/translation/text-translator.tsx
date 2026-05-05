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
          <SelectTrigger className="w-36 h-9 bg-slate-800 border-2 border-sky-800 rounded-xl text-sm font-medium shadow-sm text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700 text-white">
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
        <div className="flex items-center justify-between px-4 pb-3 border-t border-slate-700/50">
          <span className="text-xs text-gray-500">{inputText.length} characters</span>
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
            <p className="text-lg leading-relaxed text-sky-100 font-medium">
              {translatedText.replace(" (some words unknown)", "")}
            </p>
            {translatedText.includes("?") && (
              <div className="mt-3 p-2 bg-amber-900/30 rounded-lg border border-amber-800">
                <p className="text-xs text-amber-300 font-medium">Some words unknown — try Word Collector to teach the app</p>
              </div>
            )}
          </div>
          <div className="px-4 pb-3 flex justify-end">
            <button
              onClick={() => copyToClipboard(translatedText.replace(" (some words unknown)", ""))}
              className="flex items-center gap-1.5 text-xs text-sky-300 font-medium px-3 py-1.5 rounded-lg bg-sky-900/40 active:bg-sky-900/60 transition-colors"
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
