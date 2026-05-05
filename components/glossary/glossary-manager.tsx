"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Search } from "lucide-react";
import { getGlossary, COMMON_PHRASES } from "@/lib/offline-engine";

export function GlossaryManager() {
  const [glossary, setGlossary] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"phrases" | "learned">("phrases");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setGlossary(getGlossary());
  }, []);

  const CATEGORIES = [
    { key: "all", label: "All" },
    { key: "greeting", label: "Greetings" },
    { key: "food", label: "Food" },
    { key: "money", label: "Shopping" },
    { key: "transport", label: "Travel" },
    { key: "emergency", label: "Emergency" },
    { key: "social", label: "Social" },
    { key: "basic", label: "Basics" },
  ];

  const phrases = category === "all"
    ? COMMON_PHRASES
    : COMMON_PHRASES.filter((p: any) => p.category === category);

  const filtered = glossary.filter(
    (item) =>
      item.ilonggo.toLowerCase().includes(search.toLowerCase()) ||
      item.english.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-5 py-6 max-w-md mx-auto space-y-5">
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("phrases")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "phrases" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
          }`}
        >
          Phrases
        </button>
        <button
          onClick={() => setActiveTab("learned")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "learned" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
          }`}
        >
          Learned ({glossary.length})
        </button>
      </div>

      {activeTab === "phrases" && (
        <>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  category === cat.key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {phrases.map((phrase: any, i: number) => (
              <div key={i} className="p-4 bg-white rounded-2xl border border-gray-200">
                <p className="font-semibold text-base">{phrase.ilonggo}</p>
                <p className="text-sm text-gray-500 mt-0.5">{phrase.english}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "learned" && (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No words learned yet</p>
              <p className="text-xs mt-1">Use Word Collector to add words</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((item) => (
                <div key={item.ilonggo} className="p-4 bg-white rounded-2xl border border-gray-200">
                  <p className="font-semibold text-base">{item.ilonggo}</p>
                  <p className="text-sm text-blue-600 mt-0.5">{item.english}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
