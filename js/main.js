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

  var collections = [];

  function collectionHashId() {
    return decodeURIComponent((location.hash || "").replace(/^#/, ""));
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* One image per media box: either an <img> or an inline placeholder svg, never both. */
  function mediaFor(src, cls) {
    var media = el("div", "card-media" + (cls ? " " + cls : ""));
    if (src.svg) {
      media.innerHTML = src.svg;
    } else if (src.image) {
      var img = document.createElement("img");
      img.src = src.image;
      img.alt = src.imageAlt || src.title || "";
      img.width = src.width || 1024;
      img.height = src.height || 1024;
      img.loading = "lazy";
      media.appendChild(img);
    }
    return media;
  }

  function collectionCard(item, mediaClass) {
    var article = el("article", "card");
    article.id = item.id;
    var body = el("div", "card-body");
    body.appendChild(el("span", "tag " + (item.tagClass != null ? item.tagClass : "soon"), item.tag || "Coming soon"));
    body.appendChild(el("h3", null, item.title));
    var copy = el("p"); copy.innerHTML = item.description; body.appendChild(copy);
    var form = el("form", "notify");
    form.setAttribute("onsubmit", "return hiNotify(this)");
    var input = document.createElement("input");
    input.type = "email"; input.required = true; input.placeholder = "Notify me"; input.autocomplete = "email";
    var button = el("button", null, "Notify"); button.type = "submit";
    form.appendChild(input); form.appendChild(button);
    body.appendChild(form);
    body.appendChild(el("div", "ok", "You’re on the list (preview only — nothing sent yet)."));
    article.appendChild(mediaFor(item, mediaClass));
    article.appendChild(body);
    return article;
  }

  function mountCategory(cat, shopGrid, dialogs) {
    var items = cat.items || (cat.itemsVar && window[cat.itemsVar]) || [];
    if (!items.length) return;
    function byId(id) {
      for (var i = 0; i < items.length; i++) if (items[i].id === id) return items[i];
      return null;
    }

    var dialog = el("dialog", "tee-dialog");
    dialog.id = cat.listId + "-dialog";
    var bar = el("div", "tee-dialog-bar");
    var head = el("div");
    var h2 = el("h2", null, cat.listTitle || cat.title);
    h2.id = cat.listId;
    dialog.setAttribute("aria-labelledby", cat.listId);
    head.appendChild(h2);
    head.appendChild(el("p", null, cat.intro || "Leave an email on a product and we’ll nudge you when pre-orders open."));
    var closeBtn = el("button", "tee-close", "Close"); closeBtn.type = "button";
    bar.appendChild(head); bar.appendChild(closeBtn);
    var grid = el("div", "grid");
    items.forEach(function (item) { grid.appendChild(collectionCard(item, cat.mediaClass)); });
    dialog.appendChild(bar); dialog.appendChild(grid);
    dialogs.appendChild(dialog);

    var card = el("article", "card");
    card.id = cat.cardId;
    var link = el("a", "tee-open");
    link.href = "#" + cat.listId;
    var coverSrc = cat.cover || items[0];
    link.appendChild(mediaFor({ image: coverSrc.image, svg: coverSrc.svg, imageAlt: cat.title, width: coverSrc.width, height: coverSrc.height }, cat.mediaClass));
    var body = el("div", "card-body");
    body.appendChild(el("span", "tag", items.length + " " + (items.length === 1 ? cat.noun : cat.nounPlural)));
    body.appendChild(el("h3", null, cat.title));
    body.appendChild(el("p", null, cat.blurb));
    body.appendChild(el("span", "tee-view", cat.viewLabel || "View"));
    link.appendChild(body);
    card.appendChild(link);
    shopGrid.appendChild(card);

    var set = { dialog: dialog, collectionId: cat.listId, returnHash: cat.cardId, byId: byId, closingFromHash: false };
    dialog.addEventListener("close", function () {
      if (set.closingFromHash) return;
      var id = collectionHashId();
      if (id === set.collectionId || set.byId(id)) history.replaceState(null, "", "#" + set.returnHash);
    });
    dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
    closeBtn.addEventListener("click", function () { dialog.close(); });
    collections.push(set);
  }

  function syncCollections() {
    var id = collectionHashId();
    collections.forEach(function (set) {
      var open = id === set.collectionId || !!set.byId(id);
      if (open) {
        if (!set.dialog.open) set.dialog.showModal();
        var target = document.getElementById(id);
        if (target && set.byId(id)) target.scrollIntoView({ block: "start" });
        else set.dialog.scrollTop = 0;
      } else if (set.dialog.open) {
        set.closingFromHash = true;
        set.dialog.close();
        set.closingFromHash = false;
      }
    });
  }

  (function () {
    var shopGrid = document.getElementById("shop-grid");
    var dialogs = document.getElementById("category-dialogs");
    if (!shopGrid || !dialogs) return;
    (window.HI_CATALOG || []).forEach(function (cat) { mountCategory(cat, shopGrid, dialogs); });
    var id = collectionHashId();
    if (id) { var t = document.getElementById(id); if (t && !t.closest("dialog")) setTimeout(function () { t.scrollIntoView(); }, 0); }
  })();

  if (collections.length) {
    window.addEventListener("hashchange", syncCollections);
    syncCollections();
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
