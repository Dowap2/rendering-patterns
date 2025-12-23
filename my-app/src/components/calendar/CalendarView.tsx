"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import type { DateSelectArg } from "@fullcalendar/core";
import type { CalendarEvent } from "@/features/calendar/types";
import * as s from "./CalendarView.css";

type Props = {
  events: CalendarEvent[];
  onDateClick: (info: DateClickArg) => void;
  onSelectRange: (info: DateSelectArg) => void;
};

export default function CalendarView({
  events,
  onDateClick,
  onSelectRange,
}: Props) {
  const diaryDateSet = new Set(
    events.filter((e) => e.type === "diary").map((e) => e.date)
  );

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable
      events={events}
      dateClick={onDateClick}
      select={onSelectRange}
      dayCellContent={(arg) => {
        const dateStr = arg.date.toISOString().slice(0, 10);
        const hasDiary = diaryDateSet.has(dateStr);

        return (
          <div className={s.dayCell}>
            <span>{arg.dayNumberText}</span>
            {hasDiary && <span className={s.diaryDot} />}
          </div>
        );
      }}
    />
  );
}
