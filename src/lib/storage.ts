export interface FieldNote {
  id: string;
  moduleId: string;
  slideId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseProgress {
  completedTopics: string[]; // "M01-01", "M01-02", etc.
  completedOutcomes: number[]; // 1 to 20
  bookmarks: string[]; // "M01-01"
  lastVisited: {
    moduleId: string;
    slideId: number;
  };
}

const PROGRESS_KEY = "nodejs_course_progress_v1";
const NOTES_KEY = "nodejs_course_field_notes_v1";

export function getStoredProgress(): CourseProgress {
  if (typeof window === "undefined") {
    return {
      completedTopics: [],
      completedOutcomes: [],
      bookmarks: [],
      lastVisited: { moduleId: "M01", slideId: 1 },
    };
  }

  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    if (!data) {
      return {
        completedTopics: [],
        completedOutcomes: [],
        bookmarks: [],
        lastVisited: { moduleId: "M01", slideId: 1 },
      };
    }
    return JSON.parse(data);
  } catch {
    return {
      completedTopics: [],
      completedOutcomes: [],
      bookmarks: [],
      lastVisited: { moduleId: "M01", slideId: 1 },
    };
  }
}

export function saveProgress(progress: CourseProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error("Failed to save progress", err);
  }
}

export function getStoredNotes(): FieldNote[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveNote(moduleId: string, slideId: number, content: string): FieldNote[] {
  if (typeof window === "undefined") return [];
  const notes = getStoredNotes();
  const existingIndex = notes.findIndex(
    (n) => n.moduleId === moduleId && n.slideId === slideId
  );

  const now = new Date().toISOString();

  if (existingIndex >= 0) {
    if (!content.trim()) {
      // Remove empty note
      notes.splice(existingIndex, 1);
    } else {
      notes[existingIndex].content = content;
      notes[existingIndex].updatedAt = now;
    }
  } else if (content.trim()) {
    notes.push({
      id: `${moduleId}-${slideId}-${Date.now()}`,
      moduleId,
      slideId,
      content,
      createdAt: now,
      updatedAt: now,
    });
  }

  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error("Failed to save note", err);
  }

  return notes;
}
