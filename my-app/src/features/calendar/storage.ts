import { CalendarEvent } from "./types";

const KEY = "calendar_events_v1";

function load(): CalendarEvent[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function save(events: CalendarEvent[]) {
  localStorage.setItem(KEY, JSON.stringify(events));
}

export function getEvents(): CalendarEvent[] {
  return load();
}

export function addEvent(event: CalendarEvent) {
  const events = load();
  save([event, ...events]);
}

export function updateEvent(event: CalendarEvent) {
  const events = load().map((e) => (e.id === event.id ? event : e));
  save(events);
}

export function deleteEvent(id: string) {
  save(load().filter((e) => e.id !== id));
}
