"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, BookOpen, Search } from "lucide-react";
import { getGlossary, deleteFromGlossary, translateOffline, getHistory, saveHistory, COMMON_PHRASES } from "@/lib/offline-engine";

export function GlossaryManager() {
  const [glossary, setGlossary] = useState<{ ilonggo: string; english: string; learnedAt: number }[]>([]);
  const [newIlonggo, setNewIlonggo] = useState("");
  const [newEnglish, setNewEnglish] = useState("");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"glossary" | "phrases">("glossary");
  const [phraseCategory, setPhraseCategory] = useState<string>("all");

  React.useEffect(() => {
    setGlossary(getGlossary());
  }, []);

  const handleAdd = () => {
    if (!newIlonggo.trim() || !newEnglish.trim()) return;
    const entry = { ilonggo: newIlonggo.trim(), english: newEnglish.trim(), learnedAt: Date.now() };
    const updated = [...glossary, entry];
    setGlossary(updated);
    localStorage.setItem("ilonggolink_glossary", JSON.stringify(updated));
    setNewIlonggo("");
    setNewEnglish("");
  };

  const handleDelete = (ilonggo: string) => {
    deleteFromGlossary(ilonggo);
    setGlossary(getGlossary());
  };

  const handleTranslateFromGlossary = (ilonggo: string) => {
    const glossary = getGlossary();
    const result = translateOffline(ilonggo, "English", glossary);
    saveHistory(ilonggo, result);
  };

  const filtered = glossary.filter(
    (item) =>
      item.ilonggo.toLowerCase().includes(search.toLowerCase()) ||
      item.english.toLowerCase().includes(search.toLowerCase())
  );

  const CATEGORIES = [
    { key: "greeting", label: "Greetings" },
    { key: "food", label: "Food & Drink" },
    { key: "money", label: "Shopping" },
    { key: "transport", label: "Transport" },
    { key: "emergency", label: "Emergency" },
    { key: "medical", label: "Medical" },
    { key: "social", label: "Social" },
    { key: "family", label: "Family" },
    { key: "directions", label: "Directions" },
    { key: "basic", label: "Basics" },
    { key: "time", label: "Time" },
    { key: "question", label: "Questions" },
  ];

  const phrases = phraseCategory === "all"
    ? COMMON_PHRASES
    : COMMON_PHRASES.filter((p: any) => p.category === phraseCategory);

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex gap-2">
        <Button
          variant={activeTab === "glossary" ? "default" : "outline"}
          onClick={() => setActiveTab("glossary")}
          className="flex-1"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          My Glossary ({glossary.length})
        </Button>
        <Button
          variant={activeTab === "phrases" ? "default" : "outline"}
          onClick={() => setActiveTab("phrases")}
          className="flex-1"
        >
          Common Phrases
        </Button>
      </div>

      {activeTab === "glossary" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Word</CardTitle>
              <CardDescription>Words you add here will be used in translations automatically.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Textarea
                  placeholder="Ilonggo word or phrase"
                  value={newIlonggo}
                  onChange={(e) => setNewIlonggo(e.target.value)}
                  className="min-h-[48px]"
                />
                <Textarea
                  placeholder="English meaning"
                  value={newEnglish}
                  onChange={(e) => setNewEnglish(e.target.value)}
                  className="min-h-[48px]"
                />
              </div>
              <Button onClick={handleAdd} disabled={!newIlonggo.trim() || !newEnglish.trim()}>
                <Plus className="w-4 h-4 mr-2" />
                Add to Glossary
              </Button>
            </CardContent>
          </Card>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search glossary..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background text-sm"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No words learned yet</p>
              <p className="text-sm mt-1">Add words above or use the Learning tab to fix translations.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((item) => (
                <div
                  key={item.ilonggo}
                  className="p-4 rounded-xl border bg-card flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold">{item.ilonggo}</p>
                    <p className="text-sm text-primary">{item.english}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleTranslateFromGlossary(item.ilonggo)}>
                      Test
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.ilonggo)}>
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "phrases" && (
        <>
          <Select value={phraseCategory} onValueChange={setPhraseCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Phrases</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.key} value={cat.key}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="space-y-2">
            {phrases.map((phrase: any, i: number) => (
              <div key={i} className="p-4 rounded-xl border bg-card">
                <p className="font-semibold text-lg">{phrase.ilonggo}</p>
                <p className="text-primary mt-1">{phrase.english}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
