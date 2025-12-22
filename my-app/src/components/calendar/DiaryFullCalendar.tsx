"use client";

import { useEffect, useState } from "react";
import type { CalendarEvent } from "@/features/calendar/types";
import { addEvent, getEvents } from "@/features/calendar/storage";
import type { DateClickArg, DateSelectArg } from "@fullcalendar/interaction";

import CalendarView from "./CalendarView";
import ScheduleModal from "./ScheduleModal";
import { uid } from "./utils";

export default function DiaryFullCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Partial<CalendarEvent>>({});

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const openWithDraft = (next: Partial<CalendarEvent>) => {
    setDraft(next);
    setOpen(true);
  };

  const onDateClick = (info: DateClickArg) => {
    openWithDraft({
      type: "schedule",
      title: "",
      start: info.dateStr, // yyyy-mm-dd
      allDay: true,
    });
  };

  const onSelectRange = (info: DateSelectArg) => {
    openWithDraft({
      type: "schedule",
      title: "",
      start: info.startStr, // ISO
      end: info.endStr, // ISO
      allDay: info.allDay,
    });
  };

  const saveSchedule = () => {
    if (!draft.title?.trim() || !draft.start) return;

    const newEvent: CalendarEvent = {
      id: uid(),
      type: "schedule",
      title: draft.title.trim(),
      start: draft.start,
      end: draft.end,
      allDay: draft.allDay ?? false,
      content: draft.content ?? "",
    };

    addEvent(newEvent);
    setEvents((prev) => [newEvent, ...prev]);

    setOpen(false);
    setDraft({});
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">캘린더</h1>

        <button
          className="rounded-md bg-black px-3 py-2 text-white"
          onClick={() =>
            openWithDraft({
              type: "schedule",
              title: "",
              start: new Date().toISOString(),
              allDay: false,
            })
          }
        >
          일정 추가
        </button>
      </div>

      <CalendarView
        events={events}
        onDateClick={onDateClick}
        onSelectRange={onSelectRange}
      />

      <ScheduleModal
        open={open}
        draft={draft}
        onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))}
        onClose={() => {
          setOpen(false);
          setDraft({});
        }}
        onSave={saveSchedule}
      />
    </div>
  );
}
