import type { DiaryEntry } from "./types";

const KEY = "diary_entries_v1";

function safeParse(json: string | null): DiaryEntry[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getAllEntries(): DiaryEntry[] {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(KEY));
}

export function getEntryByDate(date: string): DiaryEntry | null {
  const all = getAllEntries();
  console.log(all.find((e) => e.date === date));
  return all.find((e) => e.date === date) ?? null;
}

export function upsertEntry(
  input: Omit<DiaryEntry, "createdAt" | "updatedAt"> &
    Partial<Pick<DiaryEntry, "createdAt">>
) {
  const now = new Date().toISOString();
  const all = getAllEntries();

  const idx = all.findIndex((e) => e.date === input.date);
  if (idx >= 0) {
    const prev = all[idx];
    all[idx] = { ...prev, ...input, updatedAt: now };
  } else {
    all.unshift({
      ...input,
      createdAt: input.createdAt ?? now,
      updatedAt: now,
    });
  }

  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}

export function deleteEntryByDate(date: string) {
  const all = getAllEntries().filter((e) => e.date !== date);
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
}
