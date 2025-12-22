import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Diary</h1>
      <p className="mt-3 text-gray-600">
        하루 한 줄이라도 기록하는 가장 작은 습관.
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href="/calendar"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          캘린더 보기
        </Link>
        <Link href="/write" className="rounded-lg border px-4 py-2">
          오늘 일기 쓰기
        </Link>
      </div>

      <div className="mt-10 rounded-xl border p-5">
        <h2 className="font-medium">기능</h2>
        <ul className="mt-2 list-disc pl-5 text-gray-700">
          <li>캘린더에서 날짜별 기록 여부 확인</li>
          <li>일기 작성/수정</li>
          <li>저장: 로컬(localStorage) 기반 MVP</li>
        </ul>
      </div>
    </main>
  );
}
