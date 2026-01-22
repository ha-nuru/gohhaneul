import { useEffect, useState } from "react";
import Loading from "./components/common/Loading.jsx";
import HomeHero from "./components/sections/HomeHero.jsx";
import AboutGh from "./components/sections/AboutGh.jsx";
import Works from "./components/sections/Works.jsx";
import Skills from "./components/sections/Skills.jsx";
import BottomLinks from "./components/sections/BottomLinks.jsx";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로딩 화면 제거
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    // React 18 StrictMode 대응 (1회만 실행)
    if (window.__INDEX6_INIT__) return;
    window.__INDEX6_INIT__ = true;

    // DOM 렌더 + layout 계산 이후 실행
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (typeof window.index6Init === "function") {
          window.index6Init();
        }
      });
    });

    // cleanup (필요 시)
    return () => {
      // 전역 이벤트 정리하고 싶으면 여기에
      // $(window).off(".index6");
      // $(document).off(".index6");
    };
  }, []);

  return (
    <>
      <Loading isVisible={isLoading} />
      <HomeHero />
      <AboutGh />
      <Works />
      <Skills />
      <BottomLinks />
    </>
  );
}
