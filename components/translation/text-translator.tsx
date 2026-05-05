"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, ShieldCheck, Zap, Database, History, RotateCcw } from "lucide-react";
import { translateOffline, saveHistory, getHistory, getGlossary } from "@/lib/offline-engine";

export function TextTranslator({ onTranslate }: { onTranslate?: (orig: string, trans: string) => void }) {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState<"English" | "Ilonggo">("English");
  const [isTranslating, setIsTranslating] = useState(false);
  const [history, setHistory] = useState<{ original: string; translated: string }[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

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
      setHistory(getHistory());
    }, 200);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Select value={targetLang} onValueChange={(val) => setTargetLang(val as "English" | "Ilonggo")}>
          <SelectTrigger className="w-36 h-10 bg-card border-border rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="English">to English</SelectItem>
            <SelectItem value="Ilonggo">to Ilonggo</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Offline Mode
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-sm border-border overflow-hidden">
          <Textarea
            placeholder="Type word or phrase..."
            className="border-none focus-visible:ring-0 min-h-[200px] resize-none p-5 text-lg bg-transparent"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) handleTranslate(); }}
          />
        </Card>

        <Card className="shadow-sm border-border overflow-hidden bg-muted/5">
          <div className="p-5 min-h-[200px] text-lg leading-relaxed">
            {isTranslating ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 mt-12">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                <p className={translatedText ? "text-foreground font-semibold" : "text-muted-foreground italic"}>
                  {translatedText || "Translation appears here."}
                </p>
                {translatedText && translatedText.includes("(some words unknown)") && (
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full uppercase dark:bg-amber-900/30 dark:text-amber-400">
                    Unknown Words Detected — Use Learning tab to fix
                  </div>
                )}
                {translatedText && !translatedText.includes("(some words unknown)") && (
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">
                    Fully Translated
                  </div>
                )}
              </div>
            )}
          </div>
          {translatedText && !isTranslating && (
            <div className="p-2 border-t flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(translatedText)}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          )}
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleTranslate}
          disabled={isTranslating || !inputText.trim()}
          className="px-16 rounded-full h-14 shadow-xl bg-primary hover:bg-primary/90 text-lg font-bold"
        >
          <Zap className="w-5 h-5 mr-2" />
          Translate
        </Button>
      </div>

      {history.length > 0 && (
        <div className="space-y-3 pt-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
            <History className="w-3 h-3" /> Recent
          </h3>
          <div className="space-y-2">
            {history.map((h, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border bg-card text-sm flex justify-between items-center group cursor-pointer"
                onClick={() => { setInputText(h.original); setTranslatedText(h.translated); }}
              >
                <div className="truncate flex-1 pr-4">
                  <span className="font-medium">{h.original}</span>
                  <span className="mx-2 text-muted-foreground">→</span>
                  <span className="text-primary font-bold">{h.translated}</span>
                </div>
                <RotateCcw className="w-3 h-3 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-primary/5 p-6 rounded-2xl border border-dashed border-primary/20 flex flex-col items-center justify-center text-center">
        <Database className="w-8 h-8 text-primary/20 mb-2" />
        <h4 className="font-headline font-bold text-sm text-primary uppercase">No Cloud, No Cost</h4>
        <p className="text-xs text-muted-foreground mt-2 max-w-[240px]">
          Fully offline. Your data stays on this device.
        </p>
      </div>
    </div>
  );
}
