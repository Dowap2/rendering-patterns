"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  DateClickArg,
  DateSelectArg,
} from "@fullcalendar/interaction";
import type { CalendarEvent } from "@/features/calendar/types";

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
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      height="auto"
      events={events}
      editable={false}
      selectable={true}
      dateClick={onDateClick}
      select={onSelectRange}
      eventClassNames={(arg) => {
        const type = (arg.event.extendedProps as any).type;
        return type === "diary" ? ["event-diary"] : ["event-schedule"];
      }}
    />
  );
}
