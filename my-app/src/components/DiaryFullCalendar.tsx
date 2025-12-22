"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { getEvents } from "@/features/calendar/storage";
import type { CalendarEvent } from "@/features/calendar/types";
import { useRouter } from "next/navigation";

export default function DiaryFullCalendar() {
  const router = useRouter();
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">캘린더</h1>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        events={events}
        dateClick={(info) => {
          router.push(`/write?date=${info.dateStr}`);
        }}
        eventClick={(info) => {
          const id = info.event.id;
          router.push(`/event/${id}`);
        }}
        eventClassNames={(arg) => {
          const type = (arg.event.extendedProps as any).type;
          return type === "diary" ? ["event-diary"] : ["event-schedule"];
        }}
      />
    </div>
  );
}
