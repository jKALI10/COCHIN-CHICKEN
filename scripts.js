// scripts.js

// 1. Lazy Load Images
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img.lazy");
  const lazyLoad = () => {
    lazyImages.forEach((img) => {
      if (img.getBoundingClientRect().top < window.innerHeight && !img.src) {
        img.src = img.getAttribute("data-src");
      }
    });
  };

  window.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  lazyLoad(); // Initial check for images in the viewport

  // 2. Debounce Scroll Events to reduce load
  const debounce = (func, delay) => {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(func, delay);
    };
  };

  window.addEventListener(
    "scroll",
    debounce(function () {
      console.log("Scroll event triggered!");
    }, 200)
  );
});
