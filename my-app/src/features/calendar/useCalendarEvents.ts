"use client";

import { useEffect, useState, useCallback } from "react";
import type { CalendarEvent } from "./types";
import { addEvent, getEvents, updateEvent, deleteEvent } from "./storage";

export function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const createEvent = useCallback((event: CalendarEvent) => {
    addEvent(event);
    setEvents((prev) => [event, ...prev]);
  }, []);

  const editEvent = useCallback((event: CalendarEvent) => {
    updateEvent(event);
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
  }, []);

  const removeEvent = useCallback((id: string) => {
    deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return { events, createEvent, editEvent, removeEvent };
}
