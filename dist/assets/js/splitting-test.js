/* global gsap, ScrollTrigger, SplitText */

gsap.registerPlugin(SplitText, ScrollTrigger);

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

            // 상태값 정리 (재초기화 할 거면 여기서)
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

                    // 최신 self 저장 (onEnter에서 최신 lines 사용)
                    el._lineSelf = self;

                    // ✅ 이미 재생된 뒤에 재계산되면 다시 숨기지 말기
                    if (el._played) {
                        gsap.set(el, { opacity: 1 });
                        gsap.set(self.lines, { yPercent: 0, opacity: 1 });
                        return;
                    }

                    // ✅ 플래시 방지: 자식(라인) 먼저 숨김 세팅 → 그 다음 부모를 보이게
                    gsap.set(self.lines, { yPercent: 100, opacity: 0 });
                    gsap.set(el, { opacity: 1 });

                    // ✅ 트리거는 최초 1회만 생성
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
                                // 여기서 set으로 0을 다시 주면 깜빡임이 생길 수 있으니,
                                // onSplit에서 이미 준비된 상태를 믿고 바로 to만!
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

                    // ✅ 플래시 방지: chars 먼저 숨김 세팅 → 그 다음 부모 오픈
                    gsap.set(self.chars, { y: 50, opacity: 0, rotationX: -90 });
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
                                    y: 0,
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
          
                // 이미 한번 실행된 요소면 그대로 보여주고 종료(once:true일 때 유용)
                if (el._played) {
                  gsap.set(el, { opacity: 1 });
                  gsap.set(self.words, { yPercent: 0, opacity: 1 });
                  return;
                }
          
                // ✅ 플래시 방지: words 먼저 숨김 세팅 → 그 다음 부모 오픈
                gsap.set(self.words, { yPercent: 100, opacity: 0 });
                gsap.set(el, { opacity: 1 });
          
                if (!el._wordTriggerMade) {
                  el._wordTriggerMade = true;
          
                  el._splitTrigger = ScrollTrigger.create({
                    trigger: el,
                    start: "top 80%",
                    end: "bottom 20%",
                    once: true,      // ✅ 필요하면 false로 변경
                    markers: true,   // 필요 없으면 false
          
                    onEnter: () => {
                      el._played = true;
          
                      const words = el._wordSelf?.words || self.words;
          
                      gsap.killTweensOf(words);
                      gsap.to(words, {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.06,
                        ease: "expo.out",
                      });
                    },
          
                    // ✅ once:false로 돌릴 때만 사용하고 싶으면 아래 3개 켜면 됨
                    // onEnterBack: () => { ...play... },
                    // onLeave: () => { ...reset... },
                    // onLeaveBack: () => { ...reset... },
                  });
                }
              },
            });
          
            el._splitText = split;
          };
          

        document.querySelectorAll(".split.word").forEach(initWords);
        document.querySelectorAll(".split.line").forEach(initLines);
        document.querySelectorAll(".split.char").forEach(initChars);

        // refresh는 마지막 1회
        ScrollTrigger.refresh();
    });
};
