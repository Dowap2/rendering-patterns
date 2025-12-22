"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  deleteEntryByDate,
  getEntryByDate,
  upsertEntry,
} from "@/features/diary/storage";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function todayYMD() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export default function DiaryEditor() {
  const router = useRouter();
  const sp = useSearchParams();

  const date = useMemo(() => sp.get("date") ?? todayYMD(), [sp]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existing = getEntryByDate(date);
    setTitle(existing?.title ?? "");
    setContent(existing?.content ?? "");
    setLoaded(true);
  }, [date]);

  const onSave = () => {
    if (!title.trim() && !content.trim()) return;

    upsertEntry({
      id: date,
      date,
      title: title.trim() || "(제목 없음)",
      content: content.trim(),
    });

    router.push("/calendar");
  };

  const onDelete = () => {
    deleteEntryByDate(date);
    router.push("/calendar");
  };

  if (!loaded) return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">일기 작성</h1>
          <p className="mt-1 text-gray-600">{date}</p>
        </div>

        <div className="flex gap-2">
          <button
            className="rounded-md border px-3 py-2"
            onClick={() => router.push("/calendar")}
          >
            취소
          </button>
          <button
            className="rounded-md bg-black px-3 py-2 text-white"
            onClick={onSave}
          >
            저장
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="w-full rounded-lg border px-3 py-3"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘의 기록을 남겨보세요."
          className="min-h-[280px] w-full resize-y rounded-lg border px-3 py-3"
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          className="rounded-md border px-3 py-2 text-red-600"
          onClick={onDelete}
        >
          삭제
        </button>

        <button
          className="rounded-md border px-3 py-2"
          onClick={() => router.push("/")}
        >
          랜딩으로
        </button>
      </div>
    </div>
  );
}
