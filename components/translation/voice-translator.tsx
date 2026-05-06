"use client";

import React, { useState, useRef } from "react";
import { Mic, Square, Loader2, Volume2, ArrowDown } from "lucide-react";
import { translateOffline, getGlossary } from "@/lib/offline-engine";

export function VoiceTranslator() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ transcribed: string; translated: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const startListening = async () => {
    setError(null);
    setResult(null);
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeTypes = ["audio/webm", "audio/mp4", "audio/aac", ""];
      let selectedMime = "";
      for (const mime of mimeTypes) {
        if (!mime || MediaRecorder.isTypeSupported(mime)) {
          selectedMime = mime;
          break;
        }
      }

      const mediaRecorder = selectedMime
        ? new MediaRecorder(stream, { mimeType: selectedMime })
        : new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType || "audio/webm" });
        stream.getTracks().forEach((t) => t.stop());
        await transcribeAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (err: any) {
      if (err.name === "NotAllowedError") {
        setError("Microphone access denied.");
      } else if (err.name === "NotFoundError") {
        setError("No microphone found.");
      } else {
        setError("Cannot start: " + err.message);
      }
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      setIsProcessing(true);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      console.log("Audio type:", audioBlob.type, "size:", audioBlob.size);

      const formData = new FormData();
      formData.append("audio", audioBlob);

      const response = await fetch("/api/speech", { method: "POST", body: formData });
      const data = await response.json();

      console.log("Deepgram response:", data);

      if (data.transcript && data.transcript.trim()) {
        processTranslation(data.transcript);
      } else if (data.error) {
        setError("Server: " + data.error);
        setIsProcessing(false);
      } else {
        setError("No speech detected. Try again.");
        setIsProcessing(false);
      }
    } catch (err: any) {
      setError("Transcription failed: " + err.message);
      setIsProcessing(false);
    }
  };

  const processTranslation = (text: string) => {
    const glossary = getGlossary();
    const translated = translateOffline(text, "English", glossary);
    setResult({ transcribed: text, translated });
    setIsProcessing(false);
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
