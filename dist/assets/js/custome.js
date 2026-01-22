/* index6 legacy (React-safe single bundle) */
/* global $, Swiper, gsap, ScrollTrigger */

/* -------------------------------
   로딩 (1회)
-------------------------------- */
$(window).on("load.index6", function () {
    setTimeout(function () {
      $(".loading").fadeOut();
      $(".load_imogi").fadeOut();
    }, 300);
  });
  
  /* =========================================================
     AboutGh 전용: Swiper
     - React에서 AboutGh mount 후 호출 권장
  ========================================================= */
  window.legacyIndex6Init = function () {
    // ✅ 이 변수는 initSwipers/resize 모두에서 공유되어야 함
    let aboutSwiper = null;
  
    function destroyAboutSwiper() {
      const swiperElement = document.querySelector(".about_swiper_wrap");
  
      try {
        if (aboutSwiper && aboutSwiper.destroy) {
          aboutSwiper.destroy(true, true);
        }
      } catch (e) {}
  
      aboutSwiper = null;
  
      try {
        if (swiperElement && swiperElement.swiper) {
          swiperElement.swiper.destroy(true, true);
          swiperElement.swiper = null;
        }
      } catch (e) {}
    }
  
    function initSwipers() {
      const winW = $(window).width();
      const isMobile = winW <= 780;
  
      const swiperElement = document.querySelector(".about_swiper_wrap");
      if (!swiperElement) return;
  
      // ✅ 기존 인스턴스 제거
      destroyAboutSwiper();
  
      // ✅ 새로 생성
      aboutSwiper = new Swiper(".about_swiper_wrap", {
        watchOverflow: true,
        spaceBetween: isMobile ? 20 : 30,
        centeredSlides: true,
        slidesPerView: isMobile ? 1 : "auto",
        loop: isMobile,
  
        autoplay: isMobile
          ? { delay: 2500, disableOnInteraction: false }
          : false,
  
        pagination: isMobile
          ? { el: ".swiper-pagination", clickable: true }
          : false,
  
        simulateTouch: true,
        allowTouchMove: true,
        grabCursor: true,
        touchEventsTarget: "wrapper",
  
        touchRatio: 1,
        resistance: true,
        resistanceRatio: 0.85,
  
        // ⭐ React 버튼 클릭 살리기
        preventClicks: false,
        preventClicksPropagation: false,
      });
  
      setTimeout(function () {
        if (!aboutSwiper) return;
  
        if (isMobile) {
          aboutSwiper?.autoplay?.start();
          $(".swiper-pagination").show();
        } else {
          aboutSwiper?.autoplay?.stop();
          $(".swiper-pagination").hide();
          aboutSwiper.update();
        }
      }, 50);
    }
  
    // ✅ 중복 resize 방지: 네임스페이스 사용
    $(window).off("resize.aboutSwiper");
    initSwipers();
  
    let lastWidth = $(window).width();
    let resizeTimer;
  
    $(window).on("resize.aboutSwiper", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        const currentWidth = $(window).width();
        const wasMobile = lastWidth <= 780;
        const isMobile = currentWidth <= 780;
  
        if (wasMobile !== isMobile) initSwipers();
        else aboutSwiper?.update();
  
        lastWidth = currentWidth;
      }, 250);
    });
  
    // ✅ hover 효과(중복 방지)
    $(".eg_link_profi a")
      .off(".aboutHover")
      .on("mouseenter.aboutHover", function () {
        $(this)
          .parents(".link_profi_w")
          .siblings(".link_profi")
          .find(".marquee-nav")
          .addClass("react_mov");
      })
      .on("mouseleave.aboutHover", function () {
        $(this)
          .parents(".link_profi_w")
          .siblings(".link_profi")
          .find(".marquee-nav")
          .removeClass("react_mov");
      });
  
    // ✅ cleanup도 제공하면 React에서 깔끔하게 정리 가능
    window.legacyIndex6Destroy = function () {
      $(window).off("resize.aboutSwiper");
      $(".eg_link_profi a").off(".aboutHover");
      destroyAboutSwiper();
    };
  };
  
  /* =========================================================
     전역: marquee / gsap / scroll nav 등
     - App mount 후 1회 호출 권장
  ========================================================= */
  window.index6Init = function () {
    let currentClassIndex = 0;
    const classes = ["boo", "hey", "dude", "classes", "and", "junk"];
    let currentClass = "";
    const $target = $(".yo");
  
    // marqueeify
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
  
    // about marquee
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
  
    // profile-links hover (중복 방지)
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
  
    // GSAP
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
  
      const scrW = $(window).width();
      const triggerElem = scrW >= 860 ? ".img_cont_box" : "#sub_cent";
  
      if ($(".img_cont_txt span").length) {
        gsap.to(".img_cont_txt span", {
          scrollTrigger: {
            trigger: triggerElem,
            start: "top 50%",
            toggleClass: { targets: ".img_cont_txt span", className: "visible" },
            once: true,
          },
        });
      }
  
      gsap.utils.toArray(".work-item").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "linear",
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          }
        );
      });
    }
  
    // skill hover
    $(".skillM_t a")
      .off(".index6")
      .on("mouseenter.index6", function () {
        $(this).siblings().show();
      })
      .on("mouseleave.index6", function () {
        $(this).siblings().hide();
      });
  
    // About nav scroll (중복 방지)
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
  
    $(window).trigger("scroll");
  
    // ✅ cleanup 제공
    window.index6Destroy = function () {
      $(window).off(".index6");
      $(document).off(".index6");
      $(".profile-links a").off(".index6");
      $(".skillM_t a").off(".index6");
    };
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
  
        $(window).on("resize.index6Marqueeify", getSizes);
      });
    };
  })(jQuery);
  