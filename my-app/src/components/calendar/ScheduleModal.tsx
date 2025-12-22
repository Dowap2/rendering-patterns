"use client";

import type { CalendarEvent } from "@/features/calendar/types";

type Props = {
  open: boolean;
  draft: Partial<CalendarEvent>;
  onChange: (patch: Partial<CalendarEvent>) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function ScheduleModal({
  open,
  draft,
  onChange,
  onClose,
  onSave,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5">
        <h2 className="text-lg font-semibold">일정 등록</h2>

        <div className="mt-4 space-y-3">
          <input
            className="w-full rounded-md border px-3 py-2"
            placeholder="제목"
            value={draft.title ?? ""}
            onChange={(e) => onChange({ title: e.target.value })}
          />

          <textarea
            className="w-full min-h-[100px] rounded-md border px-3 py-2"
            placeholder="메모(선택)"
            value={draft.content ?? ""}
            onChange={(e) => onChange({ content: e.target.value })}
          />

          <div className="text-sm text-gray-600">
            시작: <span className="font-medium">{draft.start}</span>
            {draft.end ? (
              <>
                <br />
                종료: <span className="font-medium">{draft.end}</span>
              </>
            ) : null}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={draft.allDay ?? false}
              onChange={(e) => onChange({ allDay: e.target.checked })}
            />
            하루 종일
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button className="rounded-md border px-3 py-2" onClick={onClose}>
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
    </div>
  );
}
