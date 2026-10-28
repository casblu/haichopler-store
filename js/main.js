/* Haichopler private preview — scroll craft */
(function () {
  "use strict";

  function notify(form) {
    var ok = form.nextElementSibling;
    if (ok && ok.classList.contains("ok")) ok.classList.add("show");
    form.reset();
    return false;
  }
  window.hiNotify = notify;

  var nav = document.querySelector(".nav");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setNavTheme(theme) {
    if (!nav) return;
    if (theme) nav.setAttribute("data-theme", theme);
    else nav.removeAttribute("data-theme");
  }

  function onScrollNav() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  if (reduce || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    var copy = document.querySelector(".mask-copy");
    if (copy) copy.style.opacity = "1";
    var stack = document.querySelectorAll(".story-word");
    if (stack.length) {
      stack.forEach(function (el, i) {
        el.style.opacity = i === 0 ? "1" : "0";
      });
    }
    var expand = document.querySelector(".mask-expand");
    if (expand) expand.style.transform = "scale(1)";
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  var panels = gsap.utils.toArray(".story-panel");
  panels.forEach(function (panel) {
    var theme = panel.getAttribute("data-nav") || "";
    ScrollTrigger.create({
      trigger: panel,
      start: "top 55%",
      end: "bottom 45%",
      onEnter: function () { setNavTheme(theme); },
      onEnterBack: function () { setNavTheme(theme); },
    });
  });

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "bottom 40%",
    onEnter: function () { setNavTheme(""); },
    onEnterBack: function () { setNavTheme(""); },
  });

  ScrollTrigger.create({
    trigger: ".story-scrub",
    start: "top 50%",
    end: "bottom 50%",
    onEnter: function () { setNavTheme("ink"); },
    onEnterBack: function () { setNavTheme("ink"); },
  });

  ScrollTrigger.create({
    trigger: ".shop",
    start: "top 50%",
    onEnter: function () { setNavTheme(""); },
    onEnterBack: function () { setNavTheme(""); },
  });

  ScrollTrigger.create({
    trigger: ".about",
    start: "top 55%",
    onEnter: function () { setNavTheme("green"); },
    onEnterBack: function () { setNavTheme("green"); },
  });

  // Pinned word scrub — clearer crossfade + scale
  var wordEls = gsap.utils.toArray(".story-word");
  var pin = document.querySelector(".story-pin");
  if (wordEls.length && pin) {
    gsap.set(wordEls, { opacity: 0, scale: 0.78, y: 28 });
    gsap.set(wordEls[0], { opacity: 1, scale: 1, y: 0 });

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".story-scrub",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.55,
        pin: pin,
        anticipatePin: 1,
      },
    });

    wordEls.forEach(function (el, i) {
      if (i === 0) {
        tl.fromTo(
          el,
          { scale: 0.72, opacity: 0.15, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 1, ease: "none" },
          0
        );
        return;
      }
      var prev = wordEls[i - 1];
      tl.to(prev, { opacity: 0, scale: 1.18, y: -36, duration: 0.55, ease: "none" });
      tl.fromTo(
        el,
        { opacity: 0, scale: 0.72, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "none" },
        "<0.12"
      );
    });

    tl.to(wordEls[wordEls.length - 1], {
      opacity: 0.2,
      scale: 1.22,
      y: -20,
      duration: 0.55,
      ease: "none",
    });
  }

  // Growing mask — large vector surface, force3D:false keeps SVG sharp (no blurry GPU texture)
  var expand = document.querySelector(".mask-expand");
  var maskCopy = document.querySelector(".mask-copy");
  var maskMark = document.querySelector(".mask-mark");
  if (expand) {
    gsap.set(expand, { scale: 0.065, force3D: false });
    var maskTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".mask-section",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        pin: ".mask-sticky",
        anticipatePin: 1,
      },
    });
    maskTl.to(expand, {
      scale: 1.05,
      ease: "none",
      duration: 1,
      force3D: false,
    });
    if (maskMark) {
      // Mark rides with expand but stays vector-sharp; slight opacity hold then soft fade into copy
      maskTl.to(maskMark, { opacity: 0, duration: 0.2, ease: "none" }, 0.62);
    }
    if (maskCopy) {
      maskTl.to(maskCopy, { opacity: 1, duration: 0.22, ease: "none" }, 0.58);
    }
    maskTl.to({}, { duration: 0.2 });
  }

  // Subtle card fade-ins
  gsap.utils.toArray(".card").forEach(function (card, i) {
    gsap.from(card, {
      y: 40,
      opacity: 0,
      duration: 0.75,
      ease: "power2.out",
      delay: (i % 3) * 0.07,
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });

  // Soft panel content rise
  gsap.utils.toArray(".story-panel > div").forEach(function (block) {
    gsap.from(block, {
      y: 48,
      opacity: 0.15,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: block.parentElement,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  });
})();
