/*==========

Theme Name: Foodify - Food HTML5 Template
Theme Version: 1.0

==========*/

/*==========
----- JS INDEX -----
1. Smooth Scroll
2. Scroll to Top
3. Scroll to Section
==========*/

// Smooth Scroll (Improved)
(function () {
  const scroller = {
    target: document.querySelector("#js-scroll-content"),
    ease: 0.08, // <= scroll speed
    endY: 0,
    y: 0,
    resizeRequest: 1,
    scrollRequest: 0,
  };

  let requestId = null;

  // Set initial state
  TweenLite.set(scroller.target, { rotation: 0.001, force3D: true });

  // Initialize event listeners on load
  window.addEventListener("load", onLoad);

  function onLoad() {
    updateScroller();
    window.focus();
    window.addEventListener("resize", onResize);
    document.addEventListener("scroll", onScroll);
  }

  // Update the scroller on every scroll or resize event
  function updateScroller() {
    const resized = scroller.resizeRequest > 0;

    // If resized, recalculate height and body height
    if (resized) {
      const height = scroller.target.clientHeight;
      document.body.style.height = `${height}px`;
      scroller.resizeRequest = 0;
    }

    const scrollY =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    scroller.endY = scrollY;
    scroller.y += (scrollY - scroller.y) * scroller.ease;

    // Stop if the scrolling distance is small enough
    if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
      scroller.y = scrollY;
      scroller.scrollRequest = 0;
    }

    // Apply the scrolling effect
    TweenLite.set(scroller.target, { y: -scroller.y });

    // Only continue requesting animation frames if there was a scroll or resize request
    requestId =
      scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
  }

  function onScroll() {
    scroller.scrollRequest++;
    if (!requestId) {
      requestId = requestAnimationFrame(updateScroller);
    }
  }

  function onResize() {
    scroller.resizeRequest++;
    if (!requestId) {
      requestId = requestAnimationFrame(updateScroller);
    }
  }

  // Trigger scroll and resize when clicking on filter
  jQuery(".filters").on("click", function () {
    setTimeout(function () {
      onScroll();
      onResize();
    }, 1000);
  });

  // Bind onResize and onScroll when clicking on filters
  document.querySelector(".filters li").addEventListener("click", onResize);
  document.querySelector(".filters li").addEventListener("click", onScroll);
})();

// Scroll to Top (Improved with GSAP)
(function () {
  const scrollToTopBtn = document.querySelector(".scrolltop");

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      gsap.to(window, {
        scrollTo: 0,
        duration: 1, // Adjust duration for smoothness
        ease: "power2.out", // Add ease for smooth scrolling effect
      });
    });
  }
})();

// Scroll to Section (Optimized)
(function () {
  const nav = $(".foody-nav-menu, .banner-btn");
  const navHeight = nav.outerHeight();

  nav.find("a").on("click", function (event) {
    event.preventDefault(); // Prevent default link behavior

    const targetId = $(this).attr("href");
    const targetOffset = $(targetId).offset().top - navHeight;

    $("html, body").animate({ scrollTop: targetOffset }, 500);
  });
})();
