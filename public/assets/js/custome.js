/* global $, gsap, ScrollTrigger */

/* =========================================================
   index6Init : React 렌더 이후 useEffect에서 1회 호출
 ========================================================= */

window.index6Init = function () {
    /* -------------------------------
       marqueeify (emoji)
    -------------------------------- */
    let currentClassIndex = 0;
    const classes = ["boo", "hey", "dude", "classes", "and", "junk"];
    let currentClass = "";
    const $target = $(".yo");

    if ($(".marquee").length) {
        $(".marquee").marqueeify({
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
       rollingmarquee
    -------------------------------- */
    if ($(".about-marquee").length) {
        $(".about-marquee").marquee({
            duration: 21000,
            gap: 0,
            delayBeforeStart: 0,
            direction: "left",
            duplicated: true,
            startVisible: true,
            pauseOnHover: true,
        });
    }
    if ($(".marquee-nav").length) {
        $(".marquee-nav").marquee({
            duration: 1e4, // 속도
            gap: 10, // 간격
            delayBeforeStart: 0, // 시작 delay값
            direction: 'left', // 방향
            duplicated: true, // 선택 영역 복제
            pauseOnHover: false, // hover시 일시중지 여부
            startVisible: true,
        });
    }

    /* -------------------------------
       GSAP ScrollTrigger
    -------------------------------- */
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        // works
        gsap.utils.toArray(".work-item").forEach((item) => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                once: true,
                // markers: true,
              },
            });
          
            tl.fromTo(
              item,
              { y: 80 },
              { y: 0, duration: 0.5, ease: "sine.out" }
            ).fromTo(
              item,
              { opacity: 0 },
              { opacity: 1, duration: 0.5, ease: "none" },
              "-=0.15" // 살짝 겹치게(원하면 0으로 두면 완전 분리)
            );
          });
    }

    /* -------------------------------
       About nav scroll 
    -------------------------------- */
    $(window)
        .off("scroll.index6")
        .on("scroll.index6", function () {
            const $about = $("#About_gh");
            const $nav = $(".nav_scroll");
            if (!$about.length || !$nav.length) return;

            const navTop = $about.offset().top;
            const offset = $(window).height() / 8;
            const scrollPos = $(window).scrollTop() + offset;

            if (scrollPos >= navTop) {
                $nav.addClass("scroll-nav-bg");
                $nav.find(".nav_W, .nav_W a").show();
            } else {
                $nav.removeClass("scroll-nav-bg");
                $nav.find(".nav_W, .nav_W a").hide();
            }
        });

    // 초기 상태 계산 
    $(window).trigger("scroll");
};

/* =========================================================
   marqueeify plugin
 ========================================================= */
(function ($) {
    $.fn.marqueeify = function (options) {
        const settings = $.extend(
            {
                horizontal: true,
                vertical: true,
                speed: 60,
                container: $(this).parent(),
                bumpEdge: function () { },
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

            $(window).on("resize.index6", getSizes);
        });
    };
})(jQuery);
