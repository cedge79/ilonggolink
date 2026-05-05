"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2, Volume2, ShieldCheck, X } from "lucide-react";
import { translateOffline, getGlossary } from "@/lib/offline-engine";

export function VoiceTranslator() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ transcribed: string; translated: string } | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "fil-PH";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        processTranslation(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech Recognition Error", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") setHasPermission(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) {
      alert("Your browser doesn't support local speech recognition.");
      return;
    }
    setResult(null);
    setIsListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const processTranslation = (text: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const glossary = getGlossary();
      const translated = translateOffline(text, "English", glossary);
      setResult({ transcribed: text, translated });
      setIsProcessing(false);
      speakText(translated);
    }, 400);
  };

  const speakText = (text: string) => {
    const cleanText = text.replace(/\(some words unknown\)/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-border shadow-md overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">100% Offline Voice Core</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-headline font-bold text-primary">Offline Voice</CardTitle>
          <CardDescription>Speak in Ilonggo. Your phone processes everything locally.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-8 space-y-8">
          {hasPermission === false && (
            <div className="mb-4 p-4 rounded-lg border border-red-200 bg-red-50 w-full">
              <div className="flex items-center gap-2">
                <X className="h-4 w-4 text-red-600" />
                <div>
                  <p className="font-bold text-sm text-red-800">Mic Access Blocked</p>
                  <p className="text-xs text-red-600">Enable microphone in browser settings to use voice.</p>
                </div>
              </div>
            </div>
          )}

          <div className="relative">
            {isListening && (
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
            )}
            <Button
              size="icon"
              className={`w-24 h-24 rounded-full shadow-xl transition-all duration-300 transform ${isListening ? "bg-destructive scale-110" : "bg-primary scale-100"}`}
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
            >
              {isListening ? <Square className="w-8 h-8 fill-current" /> : <Mic className="w-10 h-10" />}
            </Button>
          </div>

          <div className="text-center space-y-4 w-full max-w-sm">
            {isListening ? (
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground animate-pulse">Listening locally...</div>
              </div>
            ) : isProcessing ? (
              <div className="flex flex-col items-center gap-4 py-4">
                <Loader2 className="w-10 h-10 text-accent animate-spin" />
                <span className="text-sm font-semibold italic">Processing locally...</span>
              </div>
            ) : (
              <p className="text-sm font-medium text-muted-foreground">Tap the mic and speak in Ilonggo</p>
            )}
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-primary/20 bg-primary/5 animate-in zoom-in-95">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase text-primary/70">You said (Ilonggo)</div>
              <p className="text-lg italic">&ldquo;{result.transcribed}&rdquo;</p>
            </div>
            <div className="flex justify-center">
              <svg className="w-4 h-4 text-muted-foreground rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase text-accent">English Translation</div>
                <p className="text-xl font-bold">{result.translated}</p>
              </div>
              <Button variant="outline" size="icon" onClick={() => speakText(result.translated)}>
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
