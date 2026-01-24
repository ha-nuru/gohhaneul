import { useEffect, useState } from "react";
import Loading from "./components/common/Loading.jsx";
import HomeMain from "./components/sections/HomeMain.jsx";
import AboutGh from "./components/sections/AboutGh.jsx";
import Works from "./components/sections/Works.jsx";
import BottomLinks from "./components/sections/BottomLinks.jsx";
import NavScroll from "./components/layout/NavScroll.jsx";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [showNavScroll, setShowNavScroll] = useState(false);

    useEffect(() => {
        // 로딩 화면 제거
        const handleLoad = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    useEffect(() => {
        // main 섹션 진입 감지
        const handleScroll = () => {
            const mainElement = document.getElementById("main");
            if (!mainElement) return;

            const mainTop = mainElement.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const offset = windowHeight / 8;
            
            // main 섹션이 화면에 진입했는지 확인
            if (mainTop <= offset) {
                setShowNavScroll(true);
            } else {
                setShowNavScroll(false);
            }
        };

        // 초기 상태 확인
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
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
            <HomeMain />

            {/* NavScroll - main 진입 시 표시 */}
            {showNavScroll && <NavScroll />}

            {/* Main content */}
            <main id="main">
                <AboutGh />
                <Works />
            </main>
            <footer>
                <BottomLinks />
            </footer>
        </>
    );
}
