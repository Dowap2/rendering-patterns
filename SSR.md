SSR (Server Side Rendering)

개념
서버에서 HTML을 완성된 상태로 렌더링하여 클라이언트에 전달하는 방식.
브라우저는 완성된 화면을 즉시 보여주고, 이후 JS가 로드되어 상호작용이 활성화된다.

### 📌 예시 코드

```
// pages/index.tsx
export async function getServerSideProps() {
const res = await fetch("https://api.example.com/posts");
const posts = await res.json();

return { props: { posts } };
}

export default function Home({ posts }) {
return (
<main>
<h1>Blog Posts</h1>
{posts.map(p => (
<p key={p.id}>{p.title}</p>
))}
</main>
);
}
```

동작 흐름

1. Client → 서버에 페이지 요청
2. Server → API를 호출해 데이터를 가져온 뒤 HTML을 완성
3. Client → 완성된 HTML을 화면에 표시
4. 이후 JS가 실행되어 인터랙션 활성화

장점

- 첫 화면 로딩 빠름 (HTML 완성본을 받아서 바로 렌더링)
- HTML에 콘텐츠가 포함되어 있어 SEO에 유리
- JS 실행 전에 UI가 보이므로 JS 성능이 낮은 디바이스에서도 문제 없음

단점

- 모든 렌더링을 서버가 수행하므로 트래픽 증가 시 서버 부하 발생 가능
- API 호출 → SSR 렌더링 → HTML 전달까지 대기 시간이 존재할 수 있음
- 페이지 이동 시 새로 SSR 요청이 발생해 상태 유지/캐싱 전략 필요

한 줄 요약
SSR = 빠른 초기 화면 + SEO 최강 / 하지만 요청마다 서버 렌더링이 필요해 부하와 대기 시간이 증가함
