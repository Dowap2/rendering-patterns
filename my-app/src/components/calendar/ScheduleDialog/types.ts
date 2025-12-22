export type ScheduleDraft = {
  title: string;
  content: string;
  allDay: boolean;

  startDate: string; // yyyy-mm-dd
  startTime: string; // HH:mm
  endDate: string; // yyyy-mm-dd
  endTime: string; // HH:mm
};
