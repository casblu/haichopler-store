/* Haichoppler private preview — scroll craft */
(function () {
  "use strict";

  function notify(form) {
    var ok = form.nextElementSibling;
    if (ok && ok.classList.contains("ok")) ok.classList.add("show");
    form.reset();
    return false;
  }
  window.hiNotify = notify;

  var tees = window.HI_TEES || [];
  var teeDialog = document.getElementById("tee-dialog");
  var teeGrid = document.getElementById("tee-grid");
  var teeHeading = document.getElementById("t-shirts");
  var teeClosingFromHash = false;

  function teeHashId() {
    return decodeURIComponent((location.hash || "").replace(/^#/, ""));
  }

  function teeById(id) {
    for (var i = 0; i < tees.length; i++) {
      if (tees[i].id === id) return tees[i];
    }
    return null;
  }

  function teeCard(tee) {
    var article = document.createElement("article");
    article.className = "card";
    article.id = tee.id;

    var media = document.createElement("div");
    media.className = "card-media";
    var photo = document.createElement("img");
    photo.src = tee.image;
    photo.alt = tee.imageAlt;
    photo.width = 1024;
    photo.height = 1024;
    photo.loading = "lazy";
    media.appendChild(photo);

    var body = document.createElement("div");
    body.className = "card-body";

    var tag = document.createElement("span");
    tag.className = "tag soon";
    tag.textContent = "Coming soon";

    var title = document.createElement("h3");
    title.textContent = tee.title;

    var copy = document.createElement("p");
    copy.textContent = tee.description;

    var art = document.createElement("img");
    art.className = "card-art";
    art.src = tee.art;
    art.alt = tee.artAlt;
    art.width = 1024;
    art.height = 1024;
    art.loading = "lazy";

    var form = document.createElement("form");
    form.className = "notify";
    form.setAttribute("onsubmit", "return hiNotify(this)");
    var input = document.createElement("input");
    input.type = "email";
    input.required = true;
    input.placeholder = "Notify me";
    input.autocomplete = "email";
    var button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Notify";
    form.appendChild(input);
    form.appendChild(button);

    var ok = document.createElement("div");
    ok.className = "ok";
    ok.textContent = "You’re on the list (preview only — nothing sent yet).";

    body.appendChild(tag);
    body.appendChild(title);
    body.appendChild(copy);
    body.appendChild(art);
    body.appendChild(form);
    body.appendChild(ok);
    article.appendChild(media);
    article.appendChild(body);
    return article;
  }

  function renderTeeShop() {
    if (!teeHeading || !teeGrid || !tees.length) return;

    var card = document.createElement("article");
    card.className = "card";
    var link = document.createElement("a");
    link.className = "tee-open";
    link.href = "#hmong-leaders";

    var media = document.createElement("div");
    media.className = "card-media tee-cover";
    tees.forEach(function (tee) {
      var img = document.createElement("img");
      img.src = tee.image;
      img.alt = tee.title;
      img.width = 1024;
      img.height = 1024;
      media.appendChild(img);
    });

    var body = document.createElement("div");
    body.className = "card-body";
    var tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = tees.length === 1 ? "1 tee" : tees.length + " tees";
    var title = document.createElement("h3");
    title.textContent = "Hmong Leaders & Heroes";
    var copy = document.createElement("p");
    copy.textContent = "Black tees of Hmong leaders and heroes — portraits set in paj ntaub.";
    var view = document.createElement("span");
    view.className = "tee-view";
    view.textContent = "View tees";
    body.appendChild(tag);
    body.appendChild(title);
    body.appendChild(copy);
    body.appendChild(view);
    link.appendChild(media);
    link.appendChild(body);
    card.appendChild(link);
    teeHeading.insertAdjacentElement("afterend", card);

    tees.forEach(function (tee) {
      teeGrid.appendChild(teeCard(tee));
    });
  }

  function syncTeeHash() {
    if (!teeDialog) return;
    var id = teeHashId();
    var open = id === "hmong-leaders" || !!teeById(id);
    if (open) {
      if (!teeDialog.open) teeDialog.showModal();
      var target = document.getElementById(id);
      if (target && teeById(id)) {
        target.scrollIntoView({ block: "start" });
      } else {
        teeDialog.scrollTop = 0;
      }
    } else if (teeDialog.open) {
      teeClosingFromHash = true;
      teeDialog.close();
      teeClosingFromHash = false;
    }
  }

  renderTeeShop();
  if (teeDialog) {
    teeDialog.addEventListener("close", function () {
      if (teeClosingFromHash) return;
      var id = teeHashId();
      if (id === "hmong-leaders" || teeById(id)) {
        history.replaceState(null, "", "#t-shirts");
      }
    });
    teeDialog.addEventListener("click", function (event) {
      if (event.target === teeDialog) teeDialog.close();
    });
    var closeBtn = teeDialog.querySelector("[data-tee-close]");
    if (closeBtn) closeBtn.addEventListener("click", function () { teeDialog.close(); });
    window.addEventListener("hashchange", syncTeeHash);
    syncTeeHash();
  }

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
  gsap.utils.toArray(".shop > .grid > .card").forEach(function (card, i) {
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
