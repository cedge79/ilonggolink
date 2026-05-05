"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import { addWordToGlossary, getGlossary, deleteFromGlossary } from "@/lib/offline-engine";

export function WordCollector() {
  const [ilonggoInput, setIlonggoInput] = useState("");
  const [englishInput, setEnglishInput] = useState("");
  const [glossary, setGlossary] = useState<any[]>([]);
  const [justAdded, setJustAdded] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    setGlossary(getGlossary());
  }, []);

  const handleAdd = () => {
    if (!ilonggoInput.trim() || !englishInput.trim()) return;
    addWordToGlossary(ilonggoInput.trim(), englishInput.trim());
    setGlossary(getGlossary());
    setSessionCount((c) => c + 1);
    setJustAdded(true);
    setIlonggoInput("");
    setEnglishInput("");
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleDelete = (ilonggo: string) => {
    deleteFromGlossary(ilonggo);
    setGlossary(getGlossary());
  };

  return (
    <div className="px-5 py-6 max-w-md mx-auto space-y-6">
      <div className="text-center space-y-1">
        <div className="w-12 h-12 mx-auto bg-indigo-900/50 rounded-2xl flex items-center justify-center">
          <Users className="w-6 h-6 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold">Word Collector</h2>
        <p className="text-sm text-gray-500">She says it. You type it. It remembers forever.</p>
      </div>

      {sessionCount > 0 && (
        <div className="text-center text-xs text-gray-500">
          <span className="font-semibold text-sky-400">{sessionCount}</span> words this session &bull; <span className="font-semibold text-sky-400">{glossary.length}</span> total
        </div>
      )}

      <div className="ios-card p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ilonggo</label>
          <input
            type="text"
            placeholder="e.g. mahumot"
            value={ilonggoInput}
            onChange={(e) => setIlonggoInput(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 rounded-xl text-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-slate-700 transition-all ios-input"
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">English</label>
          <input
            type="text"
            placeholder="e.g. smells good"
            value={englishInput}
            onChange={(e) => setEnglishInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && ilonggoInput.trim() && englishInput.trim()) handleAdd(); }}
            className="w-full px-4 py-3 bg-slate-800 rounded-xl text-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-slate-700 transition-all ios-input"
          />
        </div>

        <button
          onClick={handleAdd}
          disabled={!ilonggoInput.trim() || !englishInput.trim()}
          className="w-full flex items-center justify-center gap-2 py-3 bg-sky-600 text-white rounded-xl font-semibold text-sm disabled:opacity-40 active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" />
          Save Word
        </button>
      </div>

      {justAdded && (
        <div className="text-center text-sm text-green-400 font-medium animate-pulse">Saved!</div>
      )}

      {glossary.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">Learned Words</h3>
          <div className="space-y-2">
            {glossary.sort((a, b) => b.learnedAt - a.learnedAt).slice(0, 20).map((item) => (
              <div key={item.ilonggo} className="flex items-center justify-between p-3 ios-card">
                <div>
                  <p className="font-semibold">{item.ilonggo}</p>
                  <p className="text-sm text-sky-400">{item.english}</p>
                </div>
                <button onClick={() => handleDelete(item.ilonggo)} className="p-2 text-gray-500 active:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {glossary.length === 0 && !justAdded && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No words yet — start with Nessa!</p>
        </div>
      )}
    </div>
  );
}
