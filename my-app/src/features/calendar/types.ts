export type CalendarEventType = "diary" | "schedule";

export type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end?: string;
  type: CalendarEventType;
  content?: string;
  allDay?: boolean;
};

export type DiaryEvent = {
  id: string;
  title: string;
  type: CalendarEventType;
  date: string;
};
