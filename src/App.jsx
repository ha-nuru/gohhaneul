import { useEffect, useState, useRef } from "react";
import Loading from "./components/common/Loading.jsx";
import HomeMain from "./components/sections/HomeMain.jsx";
import About from "./components/sections/About.jsx";
import Works from "./components/sections/Works.jsx";
import BottomLinks from "./components/sections/BottomLinks.jsx";
import NavScroll from "./components/layout/NavScroll.jsx";

const LOADING_TIME = 2000; // ms

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showNavScroll, setShowNavScroll] = useState(false);
  const hasInitializedRef = useRef(false);

  // 1) 로딩 종료 타이밍 관리 (load + timeout cleanup)
  useEffect(() => {
    let timeoutId = null;

    const handleLoad = () => {
      timeoutId = window.setTimeout(() => {
        setIsLoading(false);
      }, LOADING_TIME);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // 2) main 섹션 진입 감지 (IntersectionObserver)
  useEffect(() => {
    const mainElement = document.getElementById("main");
    if (!mainElement) return;

    // rootMargin을 px로 계산해 % 해석 이슈 가능성 줄이기
    const margin = Math.round(window.innerHeight * -0.125); // -12.5%

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNavScroll(entry.isIntersecting);
      },
      {
        rootMargin: `${margin}px 0px ${margin}px 0px`,
        threshold: 0,
      }
    );

    observer.observe(mainElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 3) 레거시/외부 스크립트 init (portfolioInit, splittingTest) + cleanup 확실히
  useEffect(() => {
    // 같은 마운트 내 중복 실행 방지
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    let cleanupPortfolio = null;

    // DOM 렌더 + layout 계산 이후 실행
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (typeof window.portfolioInit === "function") {
          // portfolioInit이 반환하는 cleanup을 받아둠
          cleanupPortfolio = window.portfolioInit();
        }

        if (typeof window.splittingTest === "function") {
          window.splittingTest();
        }
      });
    });

    return () => {
      // ✅ 리스너/ScrollTrigger/jQuery 애니메이션 등 정리
      cleanupPortfolio?.();
    };
  }, []);

  return (
    <>
      <Loading isVisible={isLoading} duration={LOADING_TIME} />
      <HomeMain />

      {/* NavScroll - main 진입 시 표시 */}
      {showNavScroll && <NavScroll />}

      <main id="main">
        <About />
        <Works />
      </main>

      <footer>
        <BottomLinks />
      </footer>
    </>
  );
}
