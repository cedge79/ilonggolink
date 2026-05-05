"use client";

import React, { useState, useEffect } from "react";
import { Check, Save, MessageSquarePlus } from "lucide-react";
import { saveCorrection, getCorrections, addWordToGlossary } from "@/lib/offline-engine";

export function CorrectionTool({ initialOriginal, initialAiTranslation }: { initialOriginal?: string; initialAiTranslation?: string }) {
  const [originalText, setOriginalText] = useState(initialOriginal || "");
  const [correctTranslation, setCorrectTranslation] = useState("");
  const [corrections, setCorrections] = useState<any[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setCorrections(getCorrections());
  }, []);

  useEffect(() => {
    if (initialOriginal) setOriginalText(initialOriginal);
  }, [initialOriginal]);

  const handleSubmit = () => {
    if (!originalText.trim() || !correctTranslation.trim()) return;
    saveCorrection(originalText.trim(), "", correctTranslation.trim());
    addWordToGlossary(originalText.trim(), correctTranslation.trim());
    setSaved(true);
    setCorrections(getCorrections());
    setOriginalText("");
    setCorrectTranslation("");
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="px-5 py-6 max-w-md mx-auto space-y-6">
      <div className="text-center space-y-1">
        <div className="w-12 h-12 mx-auto bg-amber-100 rounded-2xl flex items-center justify-center">
          <MessageSquarePlus className="w-6 h-6 text-amber-600" />
        </div>
        <h2 className="text-xl font-bold">Teach the App</h2>
        <p className="text-sm text-gray-500">Fix a wrong translation</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4 shadow-sm">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ilonggo word</label>
          <input
            type="text"
            placeholder="e.g. gwapo"
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Correct English</label>
          <input
            type="text"
            placeholder="e.g. handsome"
            value={correctTranslation}
            onChange={(e) => setCorrectTranslation(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && originalText.trim() && correctTranslation.trim()) handleSubmit(); }}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!originalText.trim() || !correctTranslation.trim()}
          className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 text-white rounded-xl font-semibold text-sm disabled:opacity-40 active:scale-[0.98] transition-all"
        >
          <Save className="w-4 h-4" />
          Save Correction
        </button>
      </div>

      {saved && (
        <div className="text-center text-sm text-green-600 font-medium">
          <Check className="w-4 h-4 inline mr-1" />
          Saved!
        </div>
      )}

      {corrections.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">Corrections</h3>
          {corrections.slice(0, 10).map((c, i) => (
            <div key={i} className="p-3 bg-white rounded-xl border border-gray-200 flex justify-between">
              <span className="font-medium">{c.original}</span>
              <span className="text-amber-600 font-semibold">{c.correctTranslation}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
