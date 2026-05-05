"use client";

import React, { useState } from "react";
import {
  Type,
  BookMarked,
  MessageSquarePlus,
  ArrowRightLeft,
  Settings,
  Mic,
  Headphones,
  ShieldCheck,
  Cpu,
  Database,
  Smartphone,
  Terminal,
  ChevronRight,
  Users,
} from "lucide-react";
import { TextTranslator } from "@/components/translation/text-translator";
import { GlossaryManager } from "@/components/glossary/glossary-manager";
import { WordCollector } from "@/components/glossary/word-collector";
import { CorrectionTool } from "@/components/translation/correction-tool";
import { VoiceTranslator } from "@/components/translation/voice-translator";
import { ConversationTranslator } from "@/components/translation/conversation-translator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { clearAllLocalData } from "@/lib/offline-engine";

type ViewMode = "text" | "voice" | "conversation" | "glossary" | "collector" | "correction" | "settings";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewMode>("text");
  const [lastTranslation, setLastTranslation] = useState<{ original: string; translated: string } | null>(null);

  const menuItems = [
    { id: "text", label: "Translator", icon: Type },
    { id: "voice", label: "Voice Mode", icon: Mic },
    { id: "conversation", label: "Mediator", icon: Headphones },
    { id: "glossary", label: "Dictionary", icon: BookMarked },
    { id: "collector", label: "Word Collector", icon: Users },
    { id: "correction", label: "Learning", icon: MessageSquarePlus },
    { id: "settings", label: "Build & Info", icon: Settings },
  ];

  const handleTranslationComplete = (original: string, translated: string) => {
    setLastTranslation({ original, translated });
  };

  const renderActiveView = () => {
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
      case "correction":
        return (
          <CorrectionTool
            initialOriginal={lastTranslation?.original}
            initialAiTranslation={lastTranslation?.translated}
          />
        );
      case "settings":
        return (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-headline font-bold">Install on Your iPhone</h2>
              <p className="text-muted-foreground">This app is a PWA — no App Store needed. Works fully offline once installed.</p>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Option 1: Deploy to Vercel (Free, 2 minutes)
                </CardTitle>
                <CardDescription>The easiest way. Your app gets its own URL you can open on any iPhone.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <p># 1. Push your project to GitHub</p>
                  <p className="mb-2">cd ilonggolink && git init && git add . && git commit -m "init"</p>
                  <p># 2. Go to vercel.com and import your repo</p>
                  <p className="mb-2">vercel.com/import</p>
                  <p># 3. Deploy — it gives you a URL like ilonggolink.vercel.app</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-sm text-amber-800">
                  <p className="font-bold">Then on your iPhone:</p>
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Open the Vercel URL in Safari</li>
                    <li>Tap the <strong>Share</strong> button (box with arrow)</li>
                    <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
                    <li>Tap <strong>Add</strong> — the app icon appears on your home screen</li>
                    <li>Open it — it runs fullscreen like a real app</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Option 2: Run Locally (Test on this PC first)
                </CardTitle>
                <CardDescription>Use this to test before deploying.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <p className="mb-2">cd C:\Users\johnh\Desktop\ilonggolink</p>
                  <p className="mb-2">npm install</p>
                  <p className="mb-2">npm run dev</p>
                  <p># Then open http://localhost:9002 in your browser</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="font-bold">Fully Offline</h3>
                </div>
                <p className="text-xs text-muted-foreground">Once installed, the app works without any internet. All 600+ words and translations are stored on your phone.</p>
              </div>

              <div className="p-6 bg-card rounded-2xl border border-border shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <Database className="w-5 h-5" />
                  <h3 className="font-bold">Your Words Stay</h3>
                </div>
                <p className="text-xs text-muted-foreground">Every word you learn with your mrs is saved in your phone's storage. Even if you delete the app, you can export them.</p>
              </div>
            </div>

            <div className="p-6 bg-muted/20 rounded-2xl border border-dashed border-border">
              <h4 className="font-bold text-sm mb-4">What "Add to Home Screen" Does</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                  <span>Creates an app icon on your home screen</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                  <span>Opens fullscreen — no Safari address bar</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                  <span>Works in Airplane Mode once loaded</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                  <span>Uses your iPhone's mic for voice recognition</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-destructive/10 rounded-2xl border border-destructive/20 flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">Clear Local Data</p>
                <p className="text-xs text-muted-foreground">Wipe all learned words and corrections from this browser.</p>
              </div>
              <button
                onClick={() => {
                  if (confirm("Wipe all local data? This cannot be undone.")) {
                    clearAllLocalData();
                    window.location.reload();
                  }
                }}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-xs font-bold"
              >
                Reset App
              </button>
            </div>

            <div className="pt-10 flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
              <Cpu className="w-4 h-4" />
              Engine: Deep Structural v4.0 (600+ words, 150+ phrases, learning, word collector)
            </div>
          </div>
        );
      default:
        return <TextTranslator onTranslate={handleTranslationComplete} />;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <nav className="w-64 border-r bg-card p-4 hidden md:block">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20">
            <ArrowRightLeft className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-headline font-bold">IlonggoLink</h1>
        </div>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewMode)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeView === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {menuItems.find((i) => i.id === activeView)?.label} • Offline Mode
              </h2>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 w-full overflow-y-auto">
          {renderActiveView()}
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t flex justify-around py-2 z-50">
          {[menuItems[0], menuItems[1], menuItems[2], menuItems[4], menuItems[5]].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewMode)}
              className={`flex flex-col items-center gap-1 px-3 py-1 min-w-0 ${
                activeView === item.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] truncate">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
