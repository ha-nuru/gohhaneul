//index7
$(function () {
  /*nav - mouseover emoji*/
  $(".haneul_emoji").mouseover(function () {
    $(this).parent().siblings(".emoji_over").css("display", "block");
  });
  $(".haneul_emoji").mouseleave(function () {
    $(this).parent().siblings(".emoji_over").css("display", "none");
  });
  //site_index mousemove img
  $(document).mousemove(function (e) {
    $(".nav_site_index .pattern").offset({
      left: e.pageX + 70,
      top: e.pageY + 70,
    });
  });

  /*script contact sec nav*/
  $(window).scroll(function () {
    var wHeight = $(window).height() / 6;
    var scrolls = $(window).scrollTop() + wHeight;
    var startchange = $(".post_s").offset().top;
    var scroll_do = $(".post_s .nav_scroll");
    var scroll_contact = $(".nav_contact");
    var scroll_do_in = $(".post_s .nav_W");
    var startchange2 = $("#contact_p").offset().top;
    if (scrolls >= startchange) {
      scroll_do.addClass("scroll_on");
      scroll_do.addClass("sec6_nav_bg");
      scroll_do_in.show();
      $(".post_s .nav_W a").show();
    } else {
      scroll_do.removeClass("sec6_nav_bg");
      scroll_do.removeClass("scroll_on");
      scroll_do_in.hide();
    }
    if (scrolls >= startchange2) {
      scroll_do.removeClass("scroll_on");
      scroll_contact.addClass("navCont_scroll");
      scroll_contact.show();
      $(".contactN").show();
    } else if (startchange <= startchange2) {
      scroll_contact.removeClass("navCont_scroll");
      scroll_contact.hide();
      $(".contactN").hide();
    } else {
      scroll_do.removeClass("scroll_on");
    }
    // highttop show
    var hight_s = $("#post_scrap").offset().top;
    // var scroll = $(window).scrollTop();
    if (scrolls >= hight_s) {
      $(".heighttop").addClass("up");
    } else {
      $(".heighttop").removeClass("up");
    }
    /*site index x_button */
    if ($(document).scrollTop() + 100 > hight_s) {
      $(".X_click").css("display", "none");
    } else {
      $(".X_click").css("display", "block");
    }
  });

  /*portfolio site modal*/
  $(".site_tri1").on("click", function () {
    $(".site_modal_wrap1").toggleClass("open");
    return false;
  });
  $(".site_tri2").on("click", function () {
    $(".site_modal_wrap2").toggleClass("open");
    return false;
  });
  $(".site_tri3").on("click", function () {
    $(".site_modal_wrap3").toggleClass("open");
    return false;
  });
  $(".site_tri4").on("click", function () {
    $(".site_modal_wrap4").toggleClass("open");
    return false;
  });
  $(".site_tri5").on("click", function () {
    $(".site_modal_wrap5").toggleClass("open");
    return false;
  });
  $(".site_tri6").on("click", function () {
    $(".site_modal_wrap6").toggleClass("open");
    return false;
  });
});
