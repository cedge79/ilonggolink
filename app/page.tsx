"use client";

import React, { useState } from "react";
import {
  Type,
  BookMarked,
  ArrowRightLeft,
  Mic,
  Headphones,
  Settings,
  Users,
} from "lucide-react";
import { TextTranslator } from "@/components/translation/text-translator";
import { GlossaryManager } from "@/components/glossary/glossary-manager";
import { WordCollector } from "@/components/glossary/word-collector";
import { CorrectionTool } from "@/components/translation/correction-tool";
import { VoiceTranslator } from "@/components/translation/voice-translator";
import { ConversationTranslator } from "@/components/translation/conversation-translator";

type ViewMode = "text" | "voice" | "conversation" | "glossary" | "collector" | "settings";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewMode>("text");
  const [lastTranslation, setLastTranslation] = useState<{ original: string; translated: string } | null>(null);

  const handleTranslationComplete = (original: string, translated: string) => {
    setLastTranslation({ original, translated });
  };

  const tabs = [
    { id: "text" as ViewMode, label: "Translate", icon: Type },
    { id: "voice" as ViewMode, label: "Voice", icon: Mic },
    { id: "conversation" as ViewMode, label: "Mediator", icon: Headphones },
    { id: "glossary" as ViewMode, label: "Phrases", icon: BookMarked },
    { id: "settings" as ViewMode, label: "Settings", icon: Settings },
  ];

  const renderView = () => {
    switch (activeView) {
      case "text":
        return <TextTranslator onTranslate={handleTranslationComplete} />;
      case "voice":
        return <VoiceTranslator />;
      case "conversation":
        return <ConversationTranslator />;
      case "glossary":
        return <GlossaryManager />;
      case "collector":
        return <WordCollector />;
      case "settings":
        return (
          <div className="space-y-8 py-8">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ArrowRightLeft className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold">IlonggoLink</h1>
              <p className="text-sm text-gray-500">Offline translator for iPhone</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setActiveView("collector")}
                className="ios-card w-full flex items-center gap-4 active:scale-[0.98] transition-transform"
              >
                <div className="w-10 h-10 bg-indigo-900/50 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-sm">Word Collector</p>
                  <p className="text-xs text-gray-500">Learn words with Nessa</p>
                </div>
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>

              <button
                onClick={() => setActiveView("glossary")}
                className="ios-card w-full flex items-center gap-4 active:scale-[0.98] transition-transform"
              >
                <div className="w-10 h-10 bg-green-900/50 rounded-xl flex items-center justify-center">
                  <BookMarked className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-sm">Phrasebook</p>
                  <p className="text-xs text-gray-500">150+ common phrases</p>
                </div>
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>

            <div className="p-5 bg-gray-50 rounded-2xl space-y-4">
              <h3 className="font-semibold text-sm">How to install on your iPhone</h3>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <span>Open this page in Safari</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <span>Tap the Share button (box with arrow)</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                  <span>Tap "Add to Home Screen"</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</span>
                  <span>Tap Add — it works like a real app</span>
                </li>
              </ol>
            </div>

            <p className="text-center text-[10px] text-gray-400 uppercase tracking-wider font-bold">
               600+ words &bull; 150+ phrases &bull; v1.2
            </p>
          </div>
        );
      default:
        return <TextTranslator onTranslate={handleTranslationComplete} />;
    }
  };

  const version = "1.3";
  return (
    <div className="app-container">
      <header className="ios-header">
        <div className="ios-header-inner">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-bold text-lg">IlonggoLink</h1>
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-full">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wide">v{version}</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        {renderView()}
      </main>

      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          {tabs.map((tab) => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`bottom-nav-btn ${isActive ? "active" : ""}`}
              >
                <tab.icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
