"use client";

import { useState } from "react";
import type { CalendarEvent } from "@/features/calendar/types";
import { useCalendarEvents } from "@/features/calendar/useCalendarEvents";
import { ScheduleDialog, ScheduleForm } from "./ScheduleDialog";
import type { ScheduleDraft } from "./ScheduleDialog/types";
import { uid, todayYMD, toEventDateTime } from "@/features/calendar/utils";
import CalendarView from "./CalendarView";

const emptyDraft = (): ScheduleDraft => ({
  title: "",
  content: "",
  allDay: true,
  startDate: todayYMD(),
  startTime: "09:00",
  endDate: todayYMD(),
  endTime: "10:00",
});

export default function DiaryFullCalendar() {
  const { events, createEvent } = useCalendarEvents();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ScheduleDraft>(emptyDraft());

  const openCreate = () => {
    setDraft(emptyDraft());
    setOpen(true);
  };

  const close = () => setOpen(false);

  const submit = () => {
    if (!draft.title.trim()) return;

    const start = toEventDateTime(
      draft.startDate,
      draft.startTime,
      draft.allDay
    );
    const end = toEventDateTime(draft.endDate, draft.endTime, draft.allDay);

    const event: CalendarEvent = {
      id: uid(),
      type: "schedule",
      title: draft.title.trim(),
      content: draft.content,
      allDay: draft.allDay,
      start,
      end,
    };

    createEvent(event);
    close();
  };

  return (
    <div>
      <button type="button" onClick={openCreate}>
        일정 추가
      </button>

      <CalendarView
        events={events}
        // 이제 캘린더 클릭은 "오픈"만 하고 싶다면 아래처럼
        onDateClick={() => openCreate()}
        onSelectRange={() => openCreate()}
      />

      <ScheduleDialog open={open} onOpenChange={setOpen} title="일정 등록">
        <ScheduleForm
          draft={draft}
          onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))}
          onCancel={close}
          onSubmit={submit}
        />
      </ScheduleDialog>
    </div>
  );
}
