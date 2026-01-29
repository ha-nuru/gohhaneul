/* global $, gsap, ScrollTrigger, SplitText */

/* =========================================================
   portfolioInit : React 렌더 이후 useEffect에서 1회 호출
   ✅ 개선: cleanup 반환(리스너/ScrollTrigger/jQuery 애니메이션 정리)
 ========================================================= */

 window.portfolioInit = function () {
    // ✅ 이미 초기화된 상태면, 기존 cleanup 먼저 실행(중복 방지)
    if (typeof window.__PORTFOLIO_CLEANUP__ === "function") {
      window.__PORTFOLIO_CLEANUP__();
      window.__PORTFOLIO_CLEANUP__ = null;
    }

    /* -------------------------------
       marqueeify (emoji)
    -------------------------------- */
    let currentClassIndex = 0;
    const classes = ["boo", "hey", "dude", "classes", "and", "junk"];
    let currentClass = "";
    const $target = $(".yo");
    const $marquee = $(".marquee");

    if ($marquee.length) {
      $marquee.marqueeify({
        speed: 350,
        bumpEdge: function () {
          const nextClass = classes[currentClassIndex++];
          if (currentClassIndex >= classes.length) currentClassIndex = 0;

          if (currentClass) $target.removeClass(currentClass);
          $target.addClass(nextClass);
          currentClass = nextClass;
        },
      });
    }

    /* -------------------------------
       rollingmarquee (jQuery.marquee)
    -------------------------------- */
    const $aboutMarquee = $(".about-marquee");
    const $marqueeNav = $(".marquee-nav");
  
    if ($aboutMarquee.length) {
      $aboutMarquee.marquee({
        duration: 21000,
        gap: 0,
        delayBeforeStart: 0,
        direction: "left",
        duplicated: true,
        startVisible: true,
        pauseOnHover: true,
      });
    }
  
    if ($marqueeNav.length) {
      $marqueeNav.marquee({
        duration: 10000,
        gap: 10,
        delayBeforeStart: 0,
        direction: "left",
        duplicated: true,
        pauseOnHover: false,
        startVisible: true,
      });
    }

    /* -------------------------------
       GSAP ScrollTrigger
    -------------------------------- */
    let workGridTrigger = null;
    const animatedItems = new Set();
  
    const initWorkItemTriggers = () => {
      // 기존 ScrollTrigger 제거
      if (workGridTrigger) {
        workGridTrigger.kill();
        workGridTrigger = null;
      }
  
      // 모든 work-item 초기화
      const workItems = typeof gsap !== "undefined" ? gsap.utils.toArray(".work-item") : [];
      workItems.forEach((item) => {
        if (typeof gsap !== "undefined") {
          gsap.killTweensOf(item);
          gsap.set(item, { y: 80, opacity: 0, immediateRender: true });
        }
      });
  
      animatedItems.clear();
  
      const workGrid = document.querySelector(".work-grid");
      if (!workGrid || workItems.length === 0) return;
  
      const checkAndAnimateItems = () => {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.9;
  
        workItems.forEach((item) => {
          if (animatedItems.has(item)) return;
  
          const rect = item.getBoundingClientRect();
          if (rect.top <= triggerPoint) {
            if (typeof gsap === "undefined") return;
  
            const tl = gsap.timeline({
              onComplete: () => {
                animatedItems.add(item);
              },
            });
  
            const currentY = gsap.getProperty(item, "y") || 0;
            if (currentY === 0) {
              gsap.set(item, { y: 80, opacity: 0, immediateRender: true });
            }
  
            tl.fromTo(
              item,
              { opacity: 0 },
              { opacity: 1, duration: 0.8, ease: "sine.inOut", immediateRender: false }
            ).fromTo(
              item,
              { y: 150 },
              { y: 0, duration: 0.2, ease: "elastic.out(1, 0.3)", immediateRender: false },
              "<"
            );
  
            // 시작 즉시 추가(중복 방지)
            animatedItems.add(item);
          }
        });
      };
  
      // work-grid 트리거 생성
      workGridTrigger = ScrollTrigger.create({
        trigger: workGrid,
        start: "top 90%",
        end: "bottom 10%",
        onEnter: checkAndAnimateItems,
        onEnterBack: checkAndAnimateItems,
        onUpdate: checkAndAnimateItems,
      });
  
      // 초기 체크 (DOM/레이아웃 확정 대기)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          checkAndAnimateItems();
        });
      });
  
      // 전역 접근(필요시)
      window.workGridTrigger = workGridTrigger;
    };
  
    const hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
    if (hasGsap) {
      gsap.registerPlugin(ScrollTrigger);
  
      initWorkItemTriggers();
      ScrollTrigger.refresh();
    }
  
    /* -------------------------------
       resize / orientationchange
    -------------------------------- */
    let resizeTimer = null;
    let lastWidth = window.innerWidth;
  
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const currentWidth = window.innerWidth;
        const isSignificantChange = Math.abs(currentWidth - lastWidth) > 200;
  
        if (hasGsap) {
          if (isSignificantChange) {
            initWorkItemTriggers();
            lastWidth = currentWidth;
          }
          ScrollTrigger.refresh();
        }
      }, 250);
    };
  
    const handleOrientation = () => {
      setTimeout(() => {
        if (hasGsap) {
          initWorkItemTriggers();
          ScrollTrigger.refresh();
        }
      }, 300);
    };
  
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleOrientation, { passive: true });
  
    // 초기 상태 계산
    $(window).trigger("scroll");
  
    /* =========================================================
       ✅ cleanup 반환: React useEffect return에서 호출됨
    ========================================================= */
    const cleanup = () => {
      // 1) rAF/타이머 정리
      if (resizeTimer) {
        clearTimeout(resizeTimer);
        resizeTimer = null;
      }
  
      // 2) window 이벤트 제거
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientation);
  
      // 3) GSAP/ScrollTrigger 정리
      if (hasGsap) {
        try {
          if (workGridTrigger) {
            workGridTrigger.kill();
            workGridTrigger = null;
          }
          // 해당 페이지에서 만든 Trigger만 정리하는 게 가장 좋지만,
          // 여기서는 안전하게 전체 kill(페이지 단일 사용 기준)
          ScrollTrigger.getAll().forEach((t) => t.kill());
          ScrollTrigger.refresh(true);
  
          // 남은 tween 정리(선택 영역)
          const workItems = gsap.utils.toArray(".work-item");
          workItems.forEach((item) => gsap.killTweensOf(item));
  
          animatedItems.clear();
        } catch (e) {
          // no-op
        }
      }
  
      // 4) marqueeify 정리(우리 플러그인은 destroy 지원하도록 아래에서 추가)
      if ($marquee.length && typeof $marquee.marqueeify === "function") {
        try {
          $marquee.marqueeify("destroy");
        } catch (e) {
          // fallback: 강제 stop
          $marquee.stop(true, true);
          $(window).off("resize.portfolio");
        }
      }
  
      // 5) jQuery.marquee 정리(플러그인별 destroy 이름이 다를 수 있어 try/catch)
      const tryDestroyMarquee = ($el) => {
        if (!$el || !$el.length) return;
        try {
          // 어떤 플러그인은 destroy 지원
          $el.marquee("destroy");
        } catch (e1) {
          try {
            // pause 지원하는 경우
            $el.marquee("pause");
          } catch (e2) {
            // 마지막 fallback: 애니메이션 멈춤
            $el.stop(true, true);
          }
        }
      };
  
      tryDestroyMarquee($aboutMarquee);
      tryDestroyMarquee($marqueeNav);
  
      // 6) bumpEdge로 붙인 클래스 원복(선택)
      if (currentClass) $target.removeClass(currentClass);
  
      // 전역 참조 정리
      window.workGridTrigger = null;
    };
  
    window.__PORTFOLIO_CLEANUP__ = cleanup;
    return cleanup;
  };
  
  /* =========================================================
     marqueeify plugin
     ✅ 개선: destroy 지원 (React cleanup에서 호출 가능)
   ========================================================= */
  (function ($) {
    $.fn.marqueeify = function (optionsOrMethod) {
      // ✅ destroy 모드
      if (optionsOrMethod === "destroy") {
        return this.each(function () {
          const $el = $(this);
          const data = $el.data("marqueeify");
          // 애니메이션 중단
          $el.stop(true, true);
          // resize 핸들러 제거
          if (data && data.onResize) {
            $(window).off("resize.portfolio", data.onResize);
          } else {
            $(window).off("resize.portfolio");
          }
          $el.removeData("marqueeify");
        });
      }
  
      const options = optionsOrMethod || {};
      const settings = $.extend(
        {
          horizontal: true,
          vertical: true,
          speed: 60,
          container: $(this).parent(),
          bumpEdge: function () {},
        },
        options
      );
  
      return this.each(function () {
        let containerW, containerH, elW, elH;
        const $el = $(this);
  
        function getSizes() {
          containerW = settings.container.outerWidth();
          containerH = settings.container.outerHeight();
          elW = $el.outerWidth();
          elH = $el.outerHeight();
        }
  
        function getDuration(dist) {
          const base = (dist / settings.speed) * 1000;
          return !isFinite(base) || base <= 0 ? 50 : base;
        }
  
        const move = {
          right() {
            if (!containerW || !elW) return;
            $el.animate(
              { left: containerW - elW },
              {
                duration: getDuration(containerW),
                queue: false,
                easing: "linear",
                complete() {
                  settings.bumpEdge();
                  move.left();
                },
              }
            );
          },
          left() {
            if (!containerW || !elW) return;
            $el.animate(
              { left: 0 },
              {
                duration: getDuration(containerW),
                queue: false,
                easing: "linear",
                complete() {
                  settings.bumpEdge();
                  move.right();
                },
              }
            );
          },
          down() {
            if (!containerH || !elH) return;
            $el.animate(
              { top: containerH - elH },
              {
                duration: getDuration(containerH),
                queue: false,
                easing: "linear",
                complete() {
                  settings.bumpEdge();
                  move.up();
                },
              }
            );
          },
          up() {
            if (!containerH || !elH) return;
            $el.animate(
              { top: 0 },
              {
                duration: getDuration(containerH),
                queue: false,
                easing: "linear",
                complete() {
                  settings.bumpEdge();
                  move.down();
                },
              }
            );
          },
        };
  
        getSizes();
        if (settings.horizontal) move.right();
        if (settings.vertical) move.down();
  
        // ✅ 네임스페이스 + 핸들러 저장 → destroy에서 정확히 off 가능
        const onResize = () => getSizes();
        $(window).on("resize.portfolio", onResize);
        $el.data("marqueeify", { onResize });
      });
    };
  })(jQuery);

  /* =========================================================
     splittingTest : SplitText 애니메이션 초기화
   ========================================================= */
  if (typeof SplitText !== "undefined" && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(SplitText, ScrollTrigger);
  }

  window.splittingTest = function () {
    console.count("splittingTest called");

    document.fonts.ready.then(() => {
      const cleanup = (el) => {
        el._splitTrigger?.kill();
        el._splitTrigger = null;

        if (el._splitText) {
          el._splitText.revert();
          el._splitText = null;
        }

        el._played = false;

        el._lineSelf = null;
        el._lineTriggerMade = false;

        el._charSelf = null;
        el._charTriggerMade = false;
      };

      const initLines = (el) => {
        cleanup(el);

        const split = SplitText.create(el, {
          type: "words,lines",
          linesClass: "line",
          autoSplit: true,
          onSplit: (self) => {
            console.count("onSplit line");

            el._lineSelf = self;

            if (el._played) {
              gsap.set(el, { opacity: 1 });
              gsap.set(self.lines, { yPercent: 0, opacity: 1 });
              return;
            }

            gsap.set(self.lines, { yPercent: 100, opacity: 0 });
            gsap.set(el, { opacity: 1 });

            if (!el._lineTriggerMade) {
              el._lineTriggerMade = true;

              el._splitTrigger = ScrollTrigger.create({
                trigger: el,
                start: "top 80%",
                once: true,
                markers: false,
                onEnter: () => {
                  el._played = true;

                  const lines = el._lineSelf?.lines || self.lines;

                  gsap.killTweensOf(lines);
                  gsap.to(lines, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "expo.out",
                  });
                },
              });
            }
          },
        });

        el._splitText = split;
      };

      const initChars = (el) => {
        cleanup(el);

        const split = SplitText.create(el, {
          type: "chars",
          onSplit: (self) => {
            console.count("onSplit char");

            el._charSelf = self;

            if (el._played) {
              gsap.set(el, { opacity: 1 });
              gsap.set(self.chars, { y: 0, opacity: 1, rotationX: 0 });
              return;
            }

            gsap.set(self.chars, { yPercent: 100, opacity: 0, rotationX: -90 });
            gsap.set(el, { opacity: 1 });

            if (!el._charTriggerMade) {
              el._charTriggerMade = true;

              el._splitTrigger = ScrollTrigger.create({
                trigger: el,
                start: "top 80%",
                once: true,
                markers: false,
                onEnter: () => {
                  el._played = true;

                  const chars = el._charSelf?.chars || self.chars;

                  gsap.killTweensOf(chars);
                  gsap.to(chars, {
                    yPercent: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.8,
                    stagger: 0.02,
                    ease: "back.out(1.7)",
                  });
                },
              });
            }
          },
        });

        el._splitText = split;
      };

      const initWords = (el) => {
        cleanup(el);

        const split = SplitText.create(el, {
          type: "words",
          wordsClass: "word",
          onSplit: (self) => {
            console.count("onSplit word");

            el._wordSelf = self;

            if (el._played) {
              gsap.set(el, { opacity: 1 });
              gsap.set(self.words, { yPercent: 0, opacity: 1 });
              return;
            }

            gsap.set(self.words, { yPercent: 100, opacity: 0 });
            gsap.set(el, { opacity: 1 });

            if (!el._wordTriggerMade) {
              el._wordTriggerMade = true;

              el._splitTrigger = ScrollTrigger.create({
                trigger: el,
                start: "top 80%",
                end: "bottom 20%",
                once: true,
                markers: false,
                onEnter: () => {
                  el._played = true;

                  const words = el._wordSelf?.words || self.words;

                  gsap.killTweensOf(words);
                  gsap.to(words, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.06,
                    ease: "cubic-bezier(0.25, 1, 0.5, 1);",
                  });
                },
              });
            }
          },
        });

        el._splitText = split;
      };

      document.querySelectorAll(".split.word").forEach(initWords);
      document.querySelectorAll(".split.line").forEach(initLines);
      document.querySelectorAll(".split.char").forEach(initChars);

      ScrollTrigger.refresh();
    });
  };