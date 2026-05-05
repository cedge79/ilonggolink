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
    <div className="px-5 py-6 max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <Select value={targetLang} onValueChange={(val) => setTargetLang(val as "English" | "Ilonggo")}>
          <SelectTrigger className="w-36 h-9 bg-gray-100 border-0 rounded-xl text-sm font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="English">to English</SelectItem>
            <SelectItem value="Ilonggo">to Ilonggo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <textarea
          placeholder="Type in Ilonggo..."
          className="w-full px-4 pt-4 pb-3 min-h-[160px] resize-none text-lg leading-relaxed bg-transparent focus:outline-none"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="flex items-center justify-between px-4 pb-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">{inputText.length} characters</span>
          <Button
            size="sm"
            onClick={handleTranslate}
            disabled={isTranslating || !inputText.trim()}
            className="bg-blue-600 hover:bg-blue-700 rounded-xl px-5 h-9 text-sm font-semibold"
          >
            {isTranslating ? "..." : "Translate"}
          </Button>
        </div>
      </div>

      {translatedText && (
        <div className="bg-blue-50 rounded-2xl border border-blue-100 overflow-hidden">
          <div className="px-4 pt-4 pb-3">
            <p className={`text-lg leading-relaxed ${translatedText.includes("?") ? "text-amber-600" : "text-blue-900"}`}>
              {translatedText.replace(" (some words unknown)", "")}
            </p>
            {translatedText.includes("?") && (
              <p className="text-xs text-amber-600 mt-2 font-medium">Some words unknown — try Word Collector to teach the app</p>
            )}
          </div>
          <div className="px-4 pb-3 flex justify-end">
            <button
              onClick={() => copyToClipboard(translatedText.replace(" (some words unknown)", ""))}
              className="flex items-center gap-1.5 text-xs text-blue-600 font-medium px-3 py-1.5 rounded-lg bg-blue-100 active:bg-blue-200 transition-colors"
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
