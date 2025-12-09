## ⚛ CSR(Client Side Rendering) 개념 정리

### 📌 예시 코드

**index.html**

<pre>
<div id="root"></div>
<script src="/bundle.js"></script>
</pre>

**main.jsx**

<pre>
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
</pre>

---

### 🧠 개념 요약

- 서버는 비어 있는 HTML 껍데기(index.html)만 내려준다.
- 브라우저가 JavaScript(bundle.js)를 다운로드해서 실행 → 페이지 렌더링.
- 하나의 HTML에서 화면을 교체하는 SPA(Single Page Application) 방식.

---

### ✅ 장점

| 항목             | 설명                                          |
| ---------------- | --------------------------------------------- |
| 빠른 페이지 전환 | 첫 렌더 이후에는 새로고침 없이 JS로 화면 전환 |
| 개발 구조 단순   | API 연동과 라우팅 구조가 직관적               |
| 상태 관리 유리   | 클라이언트 상태를 유지하기 쉬움               |

---

### ❌ 단점

| 항목           | 설명                                       |
| -------------- | ------------------------------------------ |
| SEO 불리       | HTML에 콘텐츠가 없어 검색 엔진 크롤링 취약 |
| 초기 로딩 지연 | JS 다운로드 + 실행을 기다려야 첫 화면 표시 |

---

### 🔍 한 줄 요약

CSR은 UX·페이지 전환 속도·개발 생산성에 강점이 있지만  
SEO·초기 로딩 속도가 중요한 서비스에는 약점이 있다.
