export type CalendarEventType = "diary" | "schedule";

export type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end?: string;
  type: CalendarEventType;
  content?: string;
};
