/* index6 legacy (React-safe refactor) */
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
     about marquee
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


  /* -------------------------------
     profile-links hover
  -------------------------------- */
  $(".profile-links a")
    .off(".index6")
    .on("mouseenter.index6", function () {
      $(".link_profi .marquee-nav, .link_profi .marquee-nav_l")
        .css("animation-play-state", "paused");
      $(".link_profi a").css("-webkit-text-fill-color", "#fb00db");
    })
    .on("mouseleave.index6", function () {
      $(".link_profi .marquee-nav, .link_profi .marquee-nav_l")
        .css("animation-play-state", "running");
      $(".link_profi a").css("-webkit-text-fill-color", "rgba(0,0,0,0)");
    });

  /* -------------------------------
     GSAP ScrollTrigger
  -------------------------------- */
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const scrW = $(window).width();
    const triggerElem = scrW >= 860 ? ".img_cont_box" : "#sub_cent";

    if ($(".img_cont_txt span").length) {
      gsap.to(".img_cont_txt span", {
        scrollTrigger: {
          trigger: triggerElem,
          start: "top 50%",
          toggleClass: {
            targets: ".img_cont_txt span",
            className: "visible",
          },
          once: true,
        },
      });
    }

    // works
    gsap.utils.toArray(".work-item").forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "linear",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
  }

  /* -------------------------------
     mouse move (중복 방지)
  -------------------------------- */
  $(document)
    .off("mousemove.index6")
    .on("mousemove.index6", function (e) {
      $(".see_ani").offset({
        left: e.pageX + 20,
        top: e.pageY - 300,
      });
    });

  /* -------------------------------
     skill hover
  -------------------------------- */
  $(".skillM_t a")
    .off(".index6")
    .on("mouseenter.index6", function () {
      $(this).siblings().show();
    })
    .on("mouseleave.index6", function () {
      $(this).siblings().hide();
    });

  /* -------------------------------
     About nav scroll (핵심 수정)
  -------------------------------- */
  $(window)
    .off("scroll.index6")
    .on("scroll.index6", function () {
      const $about = $("#About_gh");
      const $nav = $("#sub_bott .nav_scroll");
      if (!$about.length || !$nav.length) return;

      const navTop = $about.offset().top;
      const offset = $(window).height() / 8;
      const scrollPos = $(window).scrollTop() + offset;

      if (scrollPos >= navTop) {
        $nav.addClass("about_nav_bg");
        $("#sub_bott .nav_W, #sub_bott .nav_W a").show();
      } else {
        $nav.removeClass("about_nav_bg");
        $("#sub_bott .nav_W, #sub_bott .nav_W a").hide();
      }
    });

  // ⭐ 초기 상태 계산 (중요)
  $(window).trigger("scroll");
};

/* =========================================================
   marqueeify plugin (원본 유지, 로그 제거)
 ========================================================= */
(function ($) {
  $.fn.marqueeify = function (options) {
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

      $(window).on("resize.index6", getSizes);
    });
  };
})(jQuery);
