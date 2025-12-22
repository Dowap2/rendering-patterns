export function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function todayYMD() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

// allDay면 start/end를 yyyy-mm-dd로
// time 일정이면 ISO 형태(로컬 기준)로 만들어줌
export function toEventDateTime(date: string, time: string, allDay: boolean) {
  if (allDay) return date; // FullCalendar는 yyyy-mm-dd 지원
  // 로컬 타임존 기준 ISO 생성
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const dt = new Date(y, m - 1, d, hh, mm, 0, 0);
  return dt.toISOString();
}
