"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getAllEntries } from "@/features/diary/storage";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function toYMD(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export default function DiaryCalendar() {
  const [cursor, setCursor] = useState(() => new Date()); // 현재 달
  const [tick, setTick] = useState(0); // 저장 후 새로고침용 (MVP)

  const { year, month } = useMemo(
    () => ({ year: cursor.getFullYear(), month: cursor.getMonth() }),
    [cursor]
  );

  const entriesSet = useMemo(() => {
    // localStorage 기반이라 client에서만 안전
    const set = new Set(getAllEntries().map((e) => e.date));
    return set;
  }, [tick]);

  const days = useMemo(() => {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const startDay = first.getDay(); // 0~6
    const totalDays = last.getDate();

    const cells: Array<{ date: string | null; label: string }> = [];

    for (let i = 0; i < startDay; i++) cells.push({ date: null, label: "" });

    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(year, month, d);
      cells.push({ date: toYMD(date), label: String(d) });
    }
    return cells;
  }, [year, month]);

  const title = `${year}.${pad2(month + 1)}`;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">캘린더</h1>

        <div className="flex gap-2">
          <button
            className="rounded-md border px-3 py-1"
            onClick={() => setCursor(new Date(year, month - 1, 1))}
          >
            이전
          </button>
          <button
            className="rounded-md border px-3 py-1"
            onClick={() => setCursor(new Date(year, month + 1, 1))}
          >
            다음
          </button>
        </div>
      </div>

      <div className="mt-2 text-gray-600">{title}</div>

      <div className="mt-6 grid grid-cols-7 gap-2 text-sm">
        {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
          <div key={d} className="py-2 text-center font-medium text-gray-600">
            {d}
          </div>
        ))}

        {days.map((cell, idx) => {
          if (!cell.date)
            return (
              <div key={idx} className="h-16 rounded-lg border bg-gray-50" />
            );

          const hasEntry = entriesSet.has(cell.date);
          return (
            <Link
              key={cell.date}
              href={`/write?date=${cell.date}`}
              className={`h-16 rounded-lg border p-2 hover:bg-gray-50 ${
                hasEntry ? "border-black" : "border-gray-200"
              }`}
              onClick={() => setTick((t) => t + 1)}
            >
              <div className="flex items-start justify-between">
                <span className="font-medium">{cell.label}</span>
                {hasEntry ? (
                  <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">
                    기록
                  </span>
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/write"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          오늘 일기 쓰기
        </Link>
        <Link href="/" className="rounded-lg border px-4 py-2">
          랜딩으로
        </Link>
      </div>
    </div>
  );
}
