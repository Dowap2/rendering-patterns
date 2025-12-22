"use client";

import type { ScheduleDraft } from "./types";
import * as styles from "./ScheduleForm.css";

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
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className={styles.field}>
        <div className={styles.label}>제목</div>
        <input
          className={styles.input}
          value={draft.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="제목"
        />
      </div>

      <div className={styles.field}>
        <div className={styles.label}>메모</div>
        <textarea
          className={styles.textarea}
          value={draft.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder="메모(선택)"
        />
      </div>

      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={draft.allDay}
          onChange={(e) => onChange({ allDay: e.target.checked })}
        />
        <span className={styles.label}>하루 종일</span>
      </label>

      <div className={styles.field}>
        <div className={styles.label}>시작</div>
        <div className={styles.row}>
          <input
            className={styles.input}
            type="date"
            value={draft.startDate}
            onChange={(e) => onChange({ startDate: e.target.value })}
          />
          {!draft.allDay && (
            <input
              className={styles.input}
              type="time"
              value={draft.startTime}
              onChange={(e) => onChange({ startTime: e.target.value })}
            />
          )}
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.label}>종료</div>
        <div className={styles.row}>
          <input
            className={styles.input}
            type="date"
            value={draft.endDate}
            onChange={(e) => onChange({ endDate: e.target.value })}
          />
          {!draft.allDay && (
            <input
              className={styles.input}
              type="time"
              value={draft.endTime}
              onChange={(e) => onChange({ endTime: e.target.value })}
            />
          )}
        </div>
        <div className={styles.helper}>
          * 종료는 시작 이후로 설정하는 걸 추천해요.
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.button} onClick={onCancel}>
          취소
        </button>
        <button type="submit" className={styles.primaryButton}>
          저장
        </button>
      </div>
    </form>
  );
}
