import Link from "next/link";
import * as s from "./Header.css";

export function Header() {
  return (
    <header className={s.header}>
      <div className={s.inner}>
        <Link href="/">
          <h1 className={s.title}>Diary</h1>
        </Link>

        <nav className={s.nav}>
          <Link href="/calendar" className={s.link}>
            캘린더
          </Link>
          <Link href="/write" className={s.link}>
            일기 쓰기
          </Link>
        </nav>
      </div>
    </header>
  );
}
