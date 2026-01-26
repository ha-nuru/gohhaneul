import { useState, useEffect, useRef } from "react";

export default function NavScroll() {
  const [showTop, setShowTop] = useState(false);
  const rafIdRef = useRef(null);

  useEffect(() => {
    // throttle을 위한 requestAnimationFrame 사용
    const handleScroll = () => {
      // 기존 요청이 있으면 취소
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // requestAnimationFrame으로 스크롤 이벤트 최적화
      rafIdRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
        const windowHeight = window.innerHeight;

        const documentHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );

        const isAtBottom = scrollTop + windowHeight >= documentHeight - 50;
        const isNotAtTop = scrollTop > 10;
        const shouldShow = isNotAtTop || isAtBottom;

        setShowTop(shouldShow);
        rafIdRef.current = null;
      });
    };

    // 초기 상태 확인
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <nav className="scroll-nav-wrap">
      <div className="scroll-nav-inner">
        <a href="#about">about</a>
        <a href="#home" className={showTop ? "emoji-sm show-top" : "emoji-sm"}>
          goh ha-neul
        </a>
        <a href="#works">work</a>
      </div>
    </nav>
  );
}
