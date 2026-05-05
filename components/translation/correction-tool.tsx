"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Check, Save, MessageSquarePlus } from "lucide-react";
import { saveCorrection, getCorrections, addWordToGlossary, getGlossary, translateOffline } from "@/lib/offline-engine";

interface CorrectionToolProps {
  initialOriginal?: string;
  initialAiTranslation?: string;
}

export function CorrectionTool({ initialOriginal, initialAiTranslation }: CorrectionToolProps) {
  const [originalText, setOriginalText] = useState(initialOriginal || "");
  const [wrongTranslation, setWrongTranslation] = useState(initialAiTranslation || "");
  const [correctTranslation, setCorrectTranslation] = useState("");
  const [corrections, setCorrections] = useState<any[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setCorrections(getCorrections());
  }, []);

  useEffect(() => {
    if (initialOriginal) setOriginalText(initialOriginal);
    if (initialAiTranslation) setWrongTranslation(initialAiTranslation);
  }, [initialOriginal, initialAiTranslation]);

  const handleSubmit = () => {
    if (!originalText.trim() || !correctTranslation.trim()) return;

    saveCorrection(originalText.trim(), wrongTranslation, correctTranslation.trim());
    addWordToGlossary(originalText.trim(), correctTranslation.trim());

    setSaved(true);
    setCorrections(getCorrections());
    setOriginalText("");
    setWrongTranslation("");
    setCorrectTranslation("");

    setTimeout(() => setSaved(false), 3000);
  };

  const handleQuickCorrect = () => {
    if (!originalText.trim() || !correctTranslation.trim()) return;
    const glossary = getGlossary();
    const testResult = translateOffline(originalText, "English", glossary);
    setWrongTranslation(testResult);
    handleSubmit();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className={saved ? "border-green-300 bg-green-50" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquarePlus className="w-5 h-5" />
            Teach the App
          </CardTitle>
          <CardDescription>
            When you see a wrong translation, enter the correct meaning here. The app remembers it forever.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {saved && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-100 text-green-800 text-sm">
              <Check className="w-4 h-4" />
              Saved! This word will now be translated correctly.
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Ilonggo word or phrase</label>
            <Textarea
              placeholder="e.g. gwapo"
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">What the app said (wrong)</label>
            <Textarea
              placeholder="e.g. gwapo"
              value={wrongTranslation}
              onChange={(e) => setWrongTranslation(e.target.value)}
              className="text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Correct English meaning</label>
            <Textarea
              placeholder="e.g. handsome"
              value={correctTranslation}
              onChange={(e) => setCorrectTranslation(e.target.value)}
              className="border-primary/30"
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSubmit} disabled={!originalText.trim() || !correctTranslation.trim()}>
              <Save className="w-4 h-4 mr-2" />
              Save Correction
            </Button>
            <Button variant="outline" onClick={handleQuickCorrect} disabled={!originalText.trim() || !correctTranslation.trim()}>
              <Check className="w-4 h-4 mr-2" />
              Save & Test
            </Button>
          </div>
        </CardContent>
      </Card>

      {corrections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Corrections History</CardTitle>
            <CardDescription>{corrections.length} words learned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {corrections.slice(0, 20).map((c, i) => (
                <div key={i} className="p-3 rounded-lg border bg-card text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">{c.original}</span>
                    <span className="text-primary font-bold">{c.correctTranslation}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    was: {c.wrongTranslation}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
