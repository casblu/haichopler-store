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

  function collectionCard(item, mediaClass) {
    var article = document.createElement("article");
    article.className = "card";
    article.id = item.id;

    var media = document.createElement("div");
    media.className = mediaClass || "card-media";
    var photo = document.createElement("img");
    photo.src = item.image;
    photo.alt = item.imageAlt;
    photo.width = item.width || 1024;
    photo.height = item.height || 1024;
    photo.loading = "lazy";
    media.appendChild(photo);

    var body = document.createElement("div");
    body.className = "card-body";

    var tag = document.createElement("span");
    tag.className = "tag soon";
    tag.textContent = "Coming soon";

    var title = document.createElement("h3");
    title.textContent = item.title;

    var copy = document.createElement("p");
    copy.textContent = item.description;

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
    body.appendChild(form);
    body.appendChild(ok);
    article.appendChild(media);
    article.appendChild(body);
    return article;
  }

  function mountCollection(opts) {
    var items = opts.items || [];
    var dialog = document.getElementById(opts.dialogId);
    var grid = document.getElementById(opts.gridId);
    if (!dialog || !grid || !items.length) return;

    function byId(id) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === id) return items[i];
      }
      return null;
    }

    var card = document.createElement("article");
    card.className = "card";
    if (opts.cardId) card.id = opts.cardId;
    var link = document.createElement("a");
    link.className = "tee-open";
    link.href = "#" + opts.collectionId;

    var media = document.createElement("div");
    media.className = "card-media tee-cover" + (opts.coverClass ? " " + opts.coverClass : "");
    items.forEach(function (item) {
      var img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      img.width = item.width || 1024;
      img.height = item.height || 1024;
      media.appendChild(img);
    });

    var body = document.createElement("div");
    body.className = "card-body";
    var tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = items.length + " " + (items.length === 1 ? opts.noun : opts.nounPlural);
    var title = document.createElement("h3");
    title.textContent = opts.title;
    var copy = document.createElement("p");
    copy.textContent = opts.blurb;
    var view = document.createElement("span");
    view.className = "tee-view";
    view.textContent = opts.viewLabel;
    body.appendChild(tag);
    body.appendChild(title);
    body.appendChild(copy);
    body.appendChild(view);
    link.appendChild(media);
    link.appendChild(body);
    card.appendChild(link);

    if (opts.replaceId) {
      var slot = document.getElementById(opts.replaceId);
      if (slot) slot.replaceWith(card);
    } else if (opts.afterId) {
      var heading = document.getElementById(opts.afterId);
      if (heading) heading.insertAdjacentElement("afterend", card);
    }

    items.forEach(function (item) {
      grid.appendChild(collectionCard(item, opts.mediaClass));
    });

    var set = {
      dialog: dialog,
      collectionId: opts.collectionId,
      returnHash: opts.returnHash,
      byId: byId,
      closingFromHash: false
    };

    dialog.addEventListener("close", function () {
      if (set.closingFromHash) return;
      var id = collectionHashId();
      if (id === set.collectionId || set.byId(id)) {
        history.replaceState(null, "", "#" + set.returnHash);
      }
    });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
    var closeBtn = dialog.querySelector("[data-collection-close]");
    if (closeBtn) closeBtn.addEventListener("click", function () { dialog.close(); });

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

  mountCollection({
    items: window.HI_TEES || [],
    dialogId: "tee-dialog",
    gridId: "tee-grid",
    afterId: "t-shirts",
    collectionId: "hmong-leaders",
    returnHash: "t-shirts",
    title: "Hmong Leaders & Heroes",
    blurb: "Black tees of Hmong leaders and heroes — portraits set in paj ntaub.",
    noun: "tee",
    nounPlural: "tees",
    viewLabel: "View tees"
  });

  mountCollection({
    items: window.HI_DECKS || [],
    dialogId: "deck-dialog",
    gridId: "deck-grid",
    replaceId: "skate",
    cardId: "skate",
    collectionId: "skateboards",
    returnHash: "skate",
    title: "Skateboards",
    blurb: "Decks wrapped in Hmong textile energy — rideable art with paj ntaub punch.",
    noun: "deck",
    nounPlural: "decks",
    viewLabel: "View decks",
    mediaClass: "card-media deck-shot",
    coverClass: "deck-cover"
  });

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
