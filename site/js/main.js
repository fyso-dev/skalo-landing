/* Skalo Landing — nav, scroll reveal, modal de contacto y envío de leads. */
(function () {
  "use strict";

  /* ── Nav: se solidifica al scrollear ─────────────────────────── */
  var nav = document.getElementById("nav");
  function onNavScroll() {
    nav.classList.toggle("sk-nav--solid", window.scrollY > 72);
  }
  window.addEventListener("scroll", onNavScroll, { passive: true });
  onNavScroll();

  /* ── Scroll reveal ───────────────────────────────────────────── */
  /* Base siempre visible; el JS "arma" el estado oculto y lo libera al
     entrar en viewport. Sin JS (o si algo falla) el contenido se ve igual. */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion && "IntersectionObserver" in window) {
    reveals.forEach(function (el) { el.classList.add("armed"); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("armed");
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });

    reveals.forEach(function (el) { io.observe(el); });

    // Red de seguridad: si algo en viewport sigue oculto, se muestra.
    setTimeout(function () {
      setInterval(function () {
        reveals.forEach(function (el) {
          if (!el.classList.contains("in")) return;
          var r = el.getBoundingClientRect();
          var inView = r.top < window.innerHeight && r.bottom > 0;
          if (inView && getComputedStyle(el).opacity === "0") {
            el.style.transition = "none"; el.style.opacity = "1"; el.style.transform = "none";
          }
        });
        reveals.forEach(function (el) {
          if (!el.classList.contains("armed")) return;
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
            el.classList.remove("armed"); el.classList.add("in");
          }
        });
      }, 600);
    }, 1500);
  }

  /* ── Modal de contacto ───────────────────────────────────────── */
  var modal = document.getElementById("contact-modal");
  var panel = modal.querySelector(".sk-modal__panel");
  var steps = Array.prototype.slice.call(modal.querySelectorAll("[data-step]"));
  var stepHead = modal.querySelector("[data-step-head]");
  var progress = document.getElementById("modal-progress");
  var chips = Array.prototype.slice.call(modal.querySelectorAll(".sk-chip"));
  var countEl = document.getElementById("interest-count");
  var form = document.getElementById("contact-form");
  var errorEl = document.getElementById("form-error");
  var submitBtn = document.getElementById("form-submit");

  function setStep(n) {
    steps.forEach(function (s) { s.hidden = s.getAttribute("data-step") !== String(n); });
    stepHead.style.display = n < 2 ? "" : "none";
    if (n < 2) progress.textContent = "// contacto · paso " + (n + 1) + " / 2";
    if (n === 1) {
      var first = form.querySelector("input[name=nombre]");
      if (first) setTimeout(function () { first.focus(); }, 60);
    }
  }

  function selectedInterests() {
    return chips.filter(function (c) { return c.classList.contains("sk-chip--on"); })
                .map(function (c) { return c.getAttribute("data-interest"); });
  }

  function updateCount() {
    var n = selectedInterests().length;
    countEl.textContent = n + " seleccionado" + (n === 1 ? "" : "s");
  }

  var triggerEl = null;

  function openModal() {
    setStep(0);
    errorEl.textContent = "";
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    var firstFocusable = panel.querySelector("button, input, [tabindex]");
    if (firstFocusable) firstFocusable.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (triggerEl && triggerEl.focus) triggerEl.focus();
    triggerEl = null;
  }

  document.addEventListener("click", function (e) {
    var open = e.target.closest("[data-open-contact]");
    if (open) { e.preventDefault(); triggerEl = open; openModal(); return; }
    var close = e.target.closest("[data-close-contact]");
    if (close) { e.preventDefault(); closeModal(); return; }
    var next = e.target.closest("[data-next-step]");
    if (next) { e.preventDefault(); setStep(1); return; }
    var prev = e.target.closest("[data-prev-step]");
    if (prev) { e.preventDefault(); setStep(0); return; }
  });

  modal.addEventListener("click", function (e) {
    if (!panel.contains(e.target)) closeModal();
  });

  window.addEventListener("keydown", function (e) {
    if (modal.hidden) return;
    if (e.key === "Escape") { closeModal(); return; }
    // Focus trap: Tab circula solo dentro del panel del modal.
    if (e.key === "Tab") {
      var focusables = Array.prototype.filter.call(
        panel.querySelectorAll("button, input, a[href], [tabindex]"),
        function (el) { return !el.disabled && el.offsetParent !== null && el.tabIndex !== -1; }
      );
      if (focusables.length === 0) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) {
        e.preventDefault(); first.focus();
      }
    }
  });

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var on = chip.classList.toggle("sk-chip--on");
      chip.setAttribute("aria-pressed", on ? "true" : "false");
      updateCount();
    });
  });
  updateCount();

  /* ── Envío del formulario → /api/lead ────────────────────────── */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorEl.textContent = "";

    var nombre = form.nombre.value.trim();
    var email = form.email.value.trim();
    var empresa = form.empresa.value.trim();

    if (!nombre) { errorEl.textContent = "Contanos tu nombre."; form.nombre.focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errorEl.textContent = "Ingresá un email válido."; form.email.focus(); return;
    }

    submitBtn.disabled = true;
    submitBtn.querySelector("span").textContent = "Enviando…";

    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nombre,
        email: email,
        empresa: empresa,
        intereses: selectedInterests(),
        website: form.website.value
      })
    })
      .then(function (res) {
        if (!res.ok) return res.json().catch(function () { return {}; }).then(function (body) {
          throw new Error(body && body.error ? body.error : "No pudimos enviar tus datos.");
        });
        return res.json();
      })
      .then(function () {
        form.reset();
        setStep(2);
      })
      .catch(function (err) {
        errorEl.textContent = (err && err.message ? err.message : "No pudimos enviar tus datos.") +
          " Escribinos a info@skalo.ai si el problema persiste.";
      })
      .then(function () {
        submitBtn.disabled = false;
        submitBtn.querySelector("span").textContent = "Enviar";
      });
  });
})();
