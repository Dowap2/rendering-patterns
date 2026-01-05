"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import type { DateSelectArg } from "@fullcalendar/core";
import type { CalendarEvent, DiaryEvent } from "@/features/calendar/types";
import * as s from "./CalendarView.css";

type Props = {
  events: CalendarEvent[];
  diarys: DiaryEvent[];
  onDateClick: (info: DateClickArg) => void;
  onSelectRange: (info: DateSelectArg) => void;
};

export default function CalendarView({
  events,
  diarys,
  onDateClick,
  onSelectRange,
}: Props) {
  const diaryDateSet = new Set(
    diarys.filter((e) => e.type === "diary").map((e) => e.date)
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
        const dateStr = arg.date.toLocaleDateString("en-CA");
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
