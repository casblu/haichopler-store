/* Hi-Choppla private preview — scroll craft */
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

  // Shop section resets nav to light
  ScrollTrigger.create({
    trigger: ".shop",
    start: "top 50%",
    onEnter: function () { setNavTheme(""); },
    onEnterBack: function () { setNavTheme(""); },
  });

  // Pinned word scrub — stacked words crossfade
  var wordEls = gsap.utils.toArray(".story-word");
  var pin = document.querySelector(".story-pin");
  if (wordEls.length && pin) {
    gsap.set(wordEls, { opacity: 0, scale: 0.85 });
    gsap.set(wordEls[0], { opacity: 1, scale: 1 });

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".story-scrub",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.65,
        pin: pin,
        anticipatePin: 1,
      },
    });

    wordEls.forEach(function (el, i) {
      if (i === 0) {
        tl.fromTo(el, { scale: 0.8, opacity: 0.2 }, { scale: 1, opacity: 1, duration: 1, ease: "none" }, 0);
        return;
      }
      var prev = wordEls[i - 1];
      tl.to(prev, { opacity: 0, scale: 1.15, duration: 0.5, ease: "none" });
      tl.fromTo(el, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.55, ease: "none" }, "<0.15");
    });

    tl.to(wordEls[wordEls.length - 1], { opacity: 0.25, scale: 1.2, duration: 0.55, ease: "none" });
  }

  // Growing mask / bubble reveal
  var blob = document.querySelector(".mask-blob");
  var maskCopy = document.querySelector(".mask-copy");
  if (blob) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".mask-section",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          pin: ".mask-sticky",
          anticipatePin: 1,
        },
      })
      .fromTo(blob, { scale: 0.35 }, { scale: 18, ease: "none", duration: 1 })
      .to(maskCopy, { opacity: 1, duration: 0.25, ease: "none" }, 0.55)
      .to({}, { duration: 0.25 });
  }

  gsap.utils.toArray(".card").forEach(function (card, i) {
    gsap.from(card, {
      y: 36,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      delay: (i % 3) * 0.06,
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });
  });
})();
