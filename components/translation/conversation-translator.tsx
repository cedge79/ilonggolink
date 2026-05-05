"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MessageCircle, ArrowRightLeft, ShieldCheck } from "lucide-react";
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
    }, 300);
  };

  const speakTranslation = (text: string, lang: string) => {
    const cleanText = text.replace(/\(some words unknown\)/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === "ilonggo" ? "fil-PH" : "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const clearConversation = () => {
    setMessages([]);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Conversation Mediator</span>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearConversation}>
            Clear
          </Button>
        )}
      </div>

      <div className="flex justify-center gap-2">
        <Button
          variant={speakingAs === "ilonggo" ? "default" : "outline"}
          onClick={() => setSpeakingAs("ilonggo")}
          className="flex-1"
        >
          <Mic className="w-4 h-4 mr-2" />
          Speaking Ilonggo
        </Button>
        <Button
          variant={speakingAs === "english" ? "default" : "outline"}
          onClick={() => setSpeakingAs("english")}
          className="flex-1"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Speaking English
        </Button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {messages.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <ArrowRightLeft className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Start a conversation</p>
            <p className="text-sm mt-1">Select which language you're speaking, then type or use voice.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <Card key={i} className={`border-l-4 ${msg.from === "ilonggo" ? "border-l-primary" : "border-l-accent"}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${msg.from === "ilonggo" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                  {msg.from === "ilonggo" ? "Ilonggo Speaker" : "English Speaker"}
                </span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => speakTranslation(msg.translation, msg.from === "ilonggo" ? "en" : "ilonggo")}>
                  <Mic className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-lg font-medium">{msg.text}</p>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t">
                <ArrowRightLeft className="w-3 h-3 text-muted-foreground" />
                <p className="text-sm text-primary font-semibold">{msg.translation}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder={speakingAs === "ilonggo" ? "Type in Ilonggo..." : "Type in English..."}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
          className="flex-1 px-4 py-3 rounded-xl border bg-background text-sm"
        />
        <Button onClick={handleSendMessage} disabled={!inputText.trim() || isProcessing}>
          {isProcessing ? "..." : "Translate"}
        </Button>
      </div>
    </div>
  );
}
