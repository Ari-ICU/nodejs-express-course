"use client";

import React, { useState, useEffect } from "react";
import { X, Save, FileText, CheckCircle2, Trash2 } from "lucide-react";
import { getStoredNotes, saveNote, FieldNote } from "@/lib/storage";

interface FieldNotesProps {
  isOpen: boolean;
  onClose: () => void;
  currentModuleId: string;
  currentSlideNumber: number;
  topicTitle: string;
}

export const FieldNotes: React.FC<FieldNotesProps> = ({
  isOpen,
  onClose,
  currentModuleId,
  currentSlideNumber,
  topicTitle,
}) => {
  const [content, setContent] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [allNotes, setAllNotes] = useState<FieldNote[]>([]);

  useEffect(() => {
    if (isOpen) {
      const notes = getStoredNotes();
      setAllNotes(notes);
      const active = notes.find(
        (n) => n.moduleId === currentModuleId && n.slideId === currentSlideNumber
      );
      setContent(active ? active.content : "");
    }
  }, [isOpen, currentModuleId, currentSlideNumber]);

  const handleSave = () => {
    const updated = saveNote(currentModuleId, currentSlideNumber, content);
    setAllNotes(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleClear = () => {
    setContent("");
    const updated = saveNote(currentModuleId, currentSlideNumber, "");
    setAllNotes(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-md h-full bg-white border-l border-slate-200 flex flex-col shadow-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-950">Field Notes</h3>
              <p className="text-[11px] text-slate-500">
                {currentModuleId} · Slide {currentSlideNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Topic Indicator */}
        <div className="my-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-700 font-bold block mb-1">
            Active Slide Topic
          </span>
          <p className="font-semibold text-slate-900 line-clamp-1">{topicTitle}</p>
        </div>

        {/* Text Area */}
        <div className="flex-1 flex flex-col gap-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your study notes, personal reminders, or questions here. Automatically saved to localStorage..."
            className="w-full flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white resize-none leading-relaxed shadow-2xs"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-4">
          <button
            onClick={handleClear}
            disabled={!content.trim()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 cursor-pointer disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs cursor-pointer shadow-sm hover:shadow transition-all"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Notes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
