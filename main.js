
$(document).ready(function ($) {
  "use strict";

  /** ✅ Prevent Auto Scrolling to Sections **/
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual"; // Stop browser from restoring scroll position
  }
  window.scrollTo(0, 0); // Force scroll to top on load

  /** ✅ Swiper Slider for Booking Table **/
  var book_table = new Swiper(".book-table-img-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3500, // Slightly slower autoplay
      disableOnInteraction: false,
    },
    speed: 1500, // Reduced speed for smoother transitions
    effect: "coverflow",
    coverflowEffect: {
      rotate: 2, // Decreased rotation for less dramatic effect
      stretch: 1,
      depth: 80, // Decreased depth for less emphasis on coverflow
      modifier: 3, // Reduced modifier for a subtler effect
      slideShadows: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  /** ✅ Swiper Slider for Team **/
  var team_slider = new Swiper(".team-slider", {
    slidesPerView: 3,
    spaceBetween: 20, // Reduced space between slides
    loop: true,
    autoplay: {
      delay: 3500, // Slightly slower autoplay
      disableOnInteraction: false,
    },
    speed: 1500, // Reduced speed for smoother transitions
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1.2 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 2 }, // Reduced slides on medium screens
      1200: { slidesPerView: 3 },
    },
  });

  /** ✅ Fix Menu Filtering Behavior **/
  jQuery(".filters").on("click", function () {
    jQuery("#menu-dish").removeClass("bydefault_show");
  });

  $(function () {
    var filterList = {
      init: function () {
        $("#menu-dish").mixItUp({
          selectors: {
            target: ".dish-box-wp",
            filter: ".filter",
          },
          animation: {
            effects: "fade",
            easing: "ease-in-out", // Smooth easing for the animation
          },
          load: {
            filter: ".all, .breakfast, .lunch, .dinner",
          },
        });
      },
    };
    filterList.init();
  });

  /** ✅ Mobile Menu Toggle **/
  jQuery(".menu-toggle").click(function () {
    jQuery(".main-navigation").toggleClass("toggled");
  });

  jQuery(".header-menu ul li a").click(function () {
    jQuery(".main-navigation").removeClass("toggled");
  });

  /** ✅ Parallax Effect **/
  var scene = $(".js-parallax-scene").get(0);
  if (scene) {
    var parallaxInstance = new Parallax(scene);
  }
});

/** ✅ Force Reset Scroll on Page Load **/
jQuery(window).on("load", function () {
  window.scrollTo(0, 0); // Ensure page starts at the top
  $("body").removeClass("body-fixed");

  /** ✅ Activating Tab Filter Animation **/
  let targets = document.querySelectorAll(".filter");
  let activeTab = 0;
  let old = 0;
  let animation;

  if (targets.length > 0) {
    gsap.set(".filter-active", {
      x: targets[0].offsetLeft,
      width: targets[0].offsetWidth,
    });

    function moveBar() {
      if (this.index !== activeTab) {
        if (animation && animation.isActive()) {
          animation.progress(1);
        }
        animation = gsap.timeline({ defaults: { duration: 0.3 } }); // Reduced duration for faster tab animation
        old = activeTab;
        activeTab = this.index;
        animation.to(".filter-active", {
          x: targets[activeTab].offsetLeft,
          width: targets[activeTab].offsetWidth,
        });
        animation.to(targets[old], { color: "#0d0d25" }, 0);
        animation.to(targets[activeTab], { color: "#fff" }, 0);
      }
    }

    for (let i = 0; i < targets.length; i++) {
      targets[i].index = i;
      targets[i].addEventListener("click", moveBar);
    }
  }
});

let scrollTimeout;

window.addEventListener("scroll", function () {
  if (scrollTimeout) {
    cancelAnimationFrame(scrollTimeout);
  }

  scrollTimeout = requestAnimationFrame(function () {
    // Your scroll-related code here
  });
});
