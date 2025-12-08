// index.html

<div id="root"></div>
<script src="/bundle.js"></script>

// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

개념
HTML은 비어 있는 껍데기만 서버에서 보내고
브라우저가 js를 다운로드해 실행하며 페이지를 렌더링
SPA 방식

첫 렌더 이후 페이지 전환이 빠름(첫 페이지는 ssr이 빠름)
프론트 개발 구조가 단순하고 API 연동이 편함
클라이언트 상태 유지가 쉬움

하지만

HTML에 콘텐츠가 없어 검색 엔진 노출(SEO) 불리함
초기 로딩 속도가 JS를 다운로드하고 실행해야해서 느릴 수 있음
