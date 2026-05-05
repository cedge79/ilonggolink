"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Plus, Users, Sparkles, Trash2, Volume2, Check } from "lucide-react";
import { addWordToGlossary, getGlossary, deleteFromGlossary } from "@/lib/offline-engine";

type CollectedWord = {
  ilonggo: string;
  english: string;
  learnedAt: number;
  verified: boolean;
};

export function WordCollector() {
  const [ilonggoInput, setIlonggoInput] = useState("");
  const [englishInput, setEnglishInput] = useState("");
  const [glossary, setGlossary] = useState<CollectedWord[]>([]);
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

    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleDelete = (ilonggo: string) => {
    deleteFromGlossary(ilonggo);
    setGlossary(getGlossary());
  };

  const speakWord = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fil-PH";
    window.speechSynthesis.speak(utterance);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && ilonggoInput.trim() && englishInput.trim()) {
      handleAdd();
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-3">
            <div className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full">
              <Users className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-bold text-primary-foreground">Learn Together</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Word Collector</CardTitle>
          <CardDescription>
            Sit with your mrs. She says a word in Ilonggo, you type it here. The app remembers it forever.
          </CardDescription>
        </CardHeader>
      </Card>

      {sessionCount > 0 && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="w-4 h-4 text-amber-500" />
          You've learned <strong className="text-primary">{sessionCount}</strong> words this session &bull; <strong className="text-primary">{glossary.length}</strong> total
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wide text-primary">
                  She says this (Ilonggo)
                </label>
                <Textarea
                  placeholder="e.g. mahumot"
                  value={ilonggoInput}
                  onChange={(e) => setIlonggoInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[56px] text-lg"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wide text-accent">
                  It means this (English)
                </label>
                <Textarea
                  placeholder="e.g. fragrant / smells good"
                  value={englishInput}
                  onChange={(e) => setEnglishInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[56px] text-lg border-accent/30"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Press Enter to save quickly
              </p>
              <Button
                onClick={handleAdd}
                disabled={!ilonggoInput.trim() || !englishInput.trim()}
                size="lg"
                className="rounded-full px-8"
              >
                <Plus className="w-4 h-4 mr-2" />
                Save Word
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {justAdded && (
        <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-green-50 text-green-700 text-sm animate-in zoom-in-95">
          <Check className="w-4 h-4" />
          Saved! That word will now be used in translations.
        </div>
      )}

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Words You've Learned</h3>
        {glossary.length > 0 && (
          <span className="text-sm text-muted-foreground">{glossary.length} words</span>
        )}
      </div>

      {glossary.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Users className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="font-medium text-lg">No words learned yet</p>
          <p className="text-sm mt-2 max-w-xs mx-auto">
            Grab your mrs and start adding words. Every word you save makes the translator smarter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {glossary
            .sort((a, b) => b.learnedAt - a.learnedAt)
            .map((item) => (
              <div
                key={item.ilonggo}
                className="p-4 rounded-xl border bg-card flex items-center justify-between group hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <p className="font-semibold text-lg">{item.ilonggo}</p>
                  <p className="text-sm text-primary">{item.english}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => speakWord(item.ilonggo)}>
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(item.ilonggo)}>
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
