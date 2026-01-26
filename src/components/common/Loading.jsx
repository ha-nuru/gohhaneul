import { useState, useEffect, useRef } from "react";

export default function Loading({ isVisible = true, duration = 1500 }) {
    const [progress, setProgress] = useState(0);
    const startRef = useRef(0);
    const rafIdRef = useRef(null);
  
    useEffect(() => {
        
      // 기존 애니메이션 정리 (중복 실행 방지)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      if (!isVisible) {
        setProgress(0);
        return;
      }
  
      startRef.current = performance.now();
      setProgress(0);
  
      // requestAnimationFrame으로 부드러운 애니메이션 구현
      const updateProgress = () => {
        const elapsed = performance.now() - startRef.current;
        const next = Math.min(100, (elapsed / duration) * 100);
        setProgress(next);
  
        if (next < 100) {
          // 아직 진행 중이면 다음 프레임 요청
          rafIdRef.current = requestAnimationFrame(updateProgress);
        } else {
          // 완료되면 100%로 설정하고 종료
          setProgress(100);
          rafIdRef.current = null;
        }
      };
  
      // 첫 프레임 요청
      rafIdRef.current = requestAnimationFrame(updateProgress);
  
      return () => {
        // cleanup: requestAnimationFrame 취소
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        // cleanup: 스크롤 복원
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
      };
    }, [isVisible, duration]);
    
    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;
      
        if (!isVisible) return;
      
        // 기존 값 백업
        const prevHtmlOverflow = html.style.overflow;
        const prevBodyOverflow = body.style.overflow;
      
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
      
        return () => {
          html.style.overflow = prevHtmlOverflow;
          body.style.overflow = prevBodyOverflow;
        };
      }, [isVisible]);

    if (!isVisible) return null;

    return (
      <div className="loading">
        <div
          className="load-emoji"
          style={{
            animation: `slideEmoji ${duration}ms ease-in-out forwards`,
          }}
        />
        <div className="load-text">Loading... {progress.toFixed(1)}%</div>
        <div className="load-bar">
          <div 
            className="gauge" 
            style={{ 
              width: `${progress}%`,
              '--progress-width': `${progress}%`
            }} 
          />
        </div>
      </div>
    );
  
}
