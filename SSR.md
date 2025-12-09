## 🌐 SSR(Server Side Rendering) 개념 정리

### 📌 예시 코드

```tsx
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
      {posts.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </main>
  );
}
```

---

### 🧠 개념

- 서버에서 HTML을 **완성된 상태**로 렌더링해 클라이언트에 전달하는 방식.
- 브라우저는 **완성된 화면을 먼저 보여주고**, 이후 JS가 로드되면서 상호작용이 가능해진다.

---

### 🔁 동작 흐름

1. Client → 서버에 페이지 요청
2. Server → API 호출로 데이터 가져온 뒤 HTML 생성
3. Client → 완성된 HTML을 화면에 표시
4. 이후 JS 번들이 로딩되어 이벤트/상태 관리 등 인터랙션 활성화

---

### ✅ 장점

- 첫 화면 로딩이 빠르다.
- HTML에 콘텐츠가 포함되어 있어 SEO에 유리하다.
- JS가 느린 디바이스에서도 기본 UI는 명확하게 보인다.

---

### ❌ 단점

- 모든 렌더링을 서버가 수행하므로 트래픽이 많으면 서버 부하가 크다.
- API 요청 → SSR 렌더링 → HTML 전달까지 네트워크/연산 대기 시간이 있다.
- 페이지 이동 시마다 새 요청이 발생하므로 클라이언트 상태 관리·캐싱 전략이 필요하다.

---

### 🔍 한 줄 요약

SSR = **빠른 첫 화면 + SEO 강점** ⟷ **서버 부하·대기 시간·상태 관리 복잡도**를 감수해야 하는 방식.

```

```
