"use client";

import type { ScheduleDraft } from "./types";

type Props = {
  draft: ScheduleDraft;
  onChange: (patch: Partial<ScheduleDraft>) => void;
  onCancel: () => void;
  onSubmit: () => void;
};

export default function ScheduleForm({
  draft,
  onChange,
  onCancel,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div>
        <label>
          제목
          <input
            value={draft.title}
            onChange={(e) => onChange({ title: e.target.value })}
          />
        </label>
      </div>

      <div>
        <label>
          메모
          <textarea
            value={draft.content}
            onChange={(e) => onChange({ content: e.target.value })}
          />
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={draft.allDay}
            onChange={(e) => onChange({ allDay: e.target.checked })}
          />
          하루 종일
        </label>
      </div>

      <div>
        <div>시작</div>
        <input
          type="date"
          value={draft.startDate}
          onChange={(e) => onChange({ startDate: e.target.value })}
        />
        {!draft.allDay && (
          <input
            type="time"
            value={draft.startTime}
            onChange={(e) => onChange({ startTime: e.target.value })}
          />
        )}
      </div>

      <div>
        <div>종료</div>
        <input
          type="date"
          value={draft.endDate}
          onChange={(e) => onChange({ endDate: e.target.value })}
        />
        {!draft.allDay && (
          <input
            type="time"
            value={draft.endTime}
            onChange={(e) => onChange({ endTime: e.target.value })}
          />
        )}
      </div>

      <div>
        <button type="button" onClick={onCancel}>
          취소
        </button>
        <button type="submit">저장</button>
      </div>
    </form>
  );
}
