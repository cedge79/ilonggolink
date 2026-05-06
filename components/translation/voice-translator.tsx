"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Loader2, Volume2, ArrowDown } from "lucide-react";
import { translateOffline, getGlossary } from "@/lib/offline-engine";

export function VoiceTranslator() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ transcribed: string; translated: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        setIsListening(false);
        setIsProcessing(false);
        if (event.error === "not-allowed") {
          setError("Microphone access denied in Settings.");
        } else if (event.error === "service-not-allowed") {
          setError("Speech service blocked. Try: Settings → Safari → Advanced → Experimental Features → Enable Speech Recognition");
        } else if (event.error === "no-speech") {
          setError("No speech detected. Try again.");
        } else {
          setError("Error: " + event.error);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) {
      setError("Speech recognition not supported in this browser.");
      return;
    }
    setError(null);
    setResult(null);
    setIsListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setIsProcessing(true);
    }
  };

  const processTranslation = (text: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const glossary = getGlossary();
      const translated = translateOffline(text, "English", glossary);
      setResult({ transcribed: text, translated });
      setIsProcessing(false);
    }, 300);
  };

  const speakText = (text: string) => {
    const clean = text.replace(/\(some words unknown\)/g, "");
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = "en-US";
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="px-5 py-8 max-w-md mx-auto space-y-8">
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-500">Tap and speak in Ilonggo</p>
      </div>

      <div className="flex justify-center">
        <div className="relative">
          {isListening && (
            <>
              <div className="absolute inset-0 animate-ping rounded-full bg-sky-900 opacity-50" />
              <div className="absolute -inset-4 animate-pulse rounded-full bg-sky-800 opacity-30" />
            </>
          )}
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
            className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
              isListening
                ? "bg-red-600 scale-110 shadow-red-600/40"
                : "bg-sky-600 scale-100 shadow-sky-600/40 active:scale-95"
            }`}
          >
            {isListening ? (
              <Square className="w-10 h-10 text-white fill-white" />
            ) : (
              <Mic className="w-10 h-10 text-white" />
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/30 rounded-xl border border-red-800 text-center">
          <p className="text-sm font-medium text-red-300">{error}</p>
        </div>
      )}

      {isListening && (
        <p className="text-center text-sm font-medium text-sky-400 animate-pulse">Listening...</p>
      )}

      {isProcessing && (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
          <p className="text-sm text-gray-500">Translating...</p>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="ios-card">
            <p className="text-xs text-gray-500 font-medium mb-1">You said</p>
            <p className="text-lg font-medium italic">&ldquo;{result.transcribed}&rdquo;</p>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-4 h-4 text-gray-500" />
          </div>

          <div className="result-box">
            <p className="text-xs text-sky-300 font-medium mb-1">English</p>
            <p className="text-xl font-bold text-white">
              {result.translated.replace(" (some words unknown)", "")}
            </p>
            {result.translated.includes("?") && (
              <p className="text-xs text-amber-300 mt-2">Some words unknown</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => speakText(result.translated)}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm font-medium shadow-lg active:scale-[0.98] transition-transform text-white"
            >
              <Volume2 className="w-4 h-4" />
              Play English
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
