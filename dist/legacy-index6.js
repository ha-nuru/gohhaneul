// /* index6.html legacy script (React 호환 정리본) */
// /* global $, Swiper */

// /* 로딩 */
// $(window).on("load", function () {
//     setTimeout(function () {
//       $(".loading").fadeOut();
//       $(".load_imogi").fadeOut();
//     }, 300);
//   });
  
//   /* React에서 명시적으로 호출 */
//   window.legacyIndex6Init = function () {
//     var aboutSwiper = null;
  
//     function initSwipers() {
//       var win_w = $(window).width();
//       var isMobile = win_w <= 780;
  
//       var swiperElement = document.querySelector(".about_swiper_wrap");
//       if (!swiperElement) return;
  
//       /* 기존 Swiper 완전 제거 */
//       if (aboutSwiper && aboutSwiper.destroy) {
//         try {
//           aboutSwiper.destroy(true, true);
//         } catch (e) {}
//         aboutSwiper = null;
//       }
  
//       if (swiperElement.swiper) {
//         try {
//           swiperElement.swiper.destroy(true, true);
//         } catch (e) {}
//         swiperElement.swiper = null;
//       }
  
//       /* ✅ Swiper 설정 (React 클릭 안전) */
//       aboutSwiper = new Swiper(".about_swiper_wrap", {
//         watchOverflow: true,
//         spaceBetween: isMobile ? 20 : 30,
//         centeredSlides: true,
//         slidesPerView: isMobile ? 1 : "auto",
//         loop: isMobile,
  
//         autoplay: isMobile
//           ? { delay: 2500, disableOnInteraction: false }
//           : false,
  
//         pagination: isMobile
//           ? { el: ".swiper-pagination", clickable: true }
//           : false,
  
//         simulateTouch: true,
//         allowTouchMove: true,
//         grabCursor: true,
//         touchEventsTarget: "wrapper",
  
//         touchRatio: 1,
//         resistance: true,
//         resistanceRatio: 0.85,
  
//         /* ⭐ 핵심: React onClick 살리기 */
//         preventClicks: false,
//         preventClicksPropagation: false,
//       });
  
//       /* PC / Mobile 후처리 */
//       setTimeout(function () {
//         if (isMobile) {
//           aboutSwiper?.autoplay?.start();
//           $(".swiper-pagination").show();
//         } else {
//           aboutSwiper?.autoplay?.stop();
//           $(".swiper-pagination").hide();
//           aboutSwiper.update();
//         }
//       }, 50);
//     }
  
//     /* 최초 실행 */
//     initSwipers();
  
//     /* 리사이즈 대응 */
//     var resizeTimer;
//     var lastWidth = $(window).width();
  
//     $(window).on("resize", function () {
//       clearTimeout(resizeTimer);
//       resizeTimer = setTimeout(function () {
//         var currentWidth = $(window).width();
//         var wasMobile = lastWidth <= 780;
//         var isMobile = currentWidth <= 780;
  
//         if (wasMobile !== isMobile) {
//           initSwipers();
//         } else {
//           aboutSwiper?.update();
//         }
  
//         lastWidth = currentWidth;
//       }, 250);
//     });
  
//     /* hover 효과 (React와 무관 → 유지) */
//     $(".eg_link_profi a")
//       .on("mouseenter", function () {
//         $(this)
//           .parents(".link_profi_w")
//           .siblings(".link_profi")
//           .find(".marquee-nav")
//           .addClass("react_mov");
//       })
//       .on("mouseleave", function () {
//         $(this)
//           .parents(".link_profi_w")
//           .siblings(".link_profi")
//           .find(".marquee-nav")
//           .removeClass("react_mov");
//       });
  
//     /* ❌ React와 충돌 → 제거 */
//     /*
//     $(".about_tri1").on("click", function () {
//       $(".about_slide_modal_wrap1").toggleClass("open");
//       return false;
//     });
//     $(".about_tri2").on("click", function () {
//       $(".about_slide_modal_wrap2").toggleClass("open");
//       return false;
//     });
//     */
//   };
  