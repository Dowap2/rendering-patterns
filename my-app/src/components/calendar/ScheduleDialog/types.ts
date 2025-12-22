export type ScheduleDraft = {
  title: string;
  content: string;
  allDay: boolean;

  // 모달에서 선택하는 값
  startDate: string; // yyyy-mm-dd
  startTime: string; // HH:mm (allDay면 무시 가능)

  endDate: string; // yyyy-mm-dd
  endTime: string; // HH:mm
};
