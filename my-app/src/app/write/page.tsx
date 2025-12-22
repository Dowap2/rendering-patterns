import { Suspense } from "react";
import DiaryEditor from "@/components/DiaryEditor";

export default function WritePage() {
  return (
    <Suspense fallback={null}>
      <DiaryEditor />
    </Suspense>
  );
}
