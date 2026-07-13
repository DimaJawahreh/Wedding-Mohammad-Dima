/* ============================================
   Wedding Invitation — ديما ❤️ محمد
   Particles · Music · Countdown · Reveals
   ============================================ */

(function () {
  "use strict";

  /* ---- Wedding date: 15 September, current year (or next if passed) ---- */
  function getWeddingDate() {
    const now = new Date();
    let year = now.getFullYear();
    // 15/09 at 20:00 local time
    let target = new Date(year, 8, 15, 20, 0, 0);
    if (now > target) {
      target = new Date(year + 1, 8, 15, 20, 0, 0);
    }
    return target;
  }

  const WEDDING_DATE = getWeddingDate();

  /* ---- Reveal animations ---- */
  function initReveals() {
    const els = document.querySelectorAll(".reveal");

    els.forEach((el) => {
      const delay = el.getAttribute("data-delay");
      if (delay) el.style.setProperty("--delay", delay);
    });

    // Hero entrance immediately
    const heroReveals = document.querySelectorAll(".hero .reveal");
    requestAnimationFrame(() => {
      heroReveals.forEach((el) => el.classList.add("visible"));
    });

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => {
      if (!el.closest(".hero")) observer.observe(el);
    });
  }

  /* ---- Countdown ---- */
  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function updateCountdown() {
    const now = Date.now();
    let diff = WEDDING_DATE.getTime() - now;

    if (diff <= 0) {
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      return;
    }

    const days = Math.floor(diff / 86400000);
    diff %= 86400000;
    const hours = Math.floor(diff / 3600000);
    diff %= 3600000;
    const minutes = Math.floor(diff / 60000);
    diff %= 60000;
    const seconds = Math.floor(diff / 1000);

    document.getElementById("days").textContent = pad(days);
    document.getElementById("hours").textContent = pad(hours);
    document.getElementById("minutes").textContent = pad(minutes);
    document.getElementById("seconds").textContent = pad(seconds);
  }

  function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ---- Background music ---- */
  function initMusic() {
    const btn = document.getElementById("music-btn");
    const audio = document.getElementById("bg-music");
    if (!btn || !audio) return;

    let unlocked = false;

    function toggle() {
      if (audio.paused) {
        const playPromise = audio.play();
        if (playPromise && typeof playPromise.then === "function") {
          playPromise
            .then(() => {
              unlocked = true;
              btn.classList.add("playing");
              btn.setAttribute("aria-label", "إيقاف الموسيقى");
            })
            .catch(() => {
              /* Autoplay blocked — user must tap again */
            });
        }
      } else {
        audio.pause();
        btn.classList.remove("playing");
        btn.setAttribute("aria-label", "تشغيل الموسيقى");
      }
    }

    btn.addEventListener("click", toggle);

    // Soft unlock on first user gesture (does not auto-start music)
    const unlock = () => {
      if (unlocked) return;
      audio.load();
    };
    document.addEventListener("touchstart", unlock, { once: true, passive: true });
    document.addEventListener("click", unlock, { once: true });
  }

  /* ---- Golden particles ---- */
  function initParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      canvas.style.display = "none";
      return;
    }

    let width = 0;
    let height = 0;
    let particles = [];
    let rafId = 0;
    let last = 0;

    const GOLD = [
      "rgba(212, 175, 55, 0.85)",
      "rgba(232, 201, 106, 0.7)",
      "rgba(184, 148, 42, 0.65)",
      "rgba(255, 245, 220, 0.9)",
    ];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
    }

    function spawn() {
      const count = width < 640 ? 28 : 48;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(true));
      }
    }

    function createParticle(randomY) {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + 10,
        r: Math.random() * 2.2 + 0.6,
        speed: Math.random() * 0.45 + 0.15,
        drift: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.5 + 0.25,
        color: GOLD[(Math.random() * GOLD.length) | 0],
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
      };
    }

    function draw(ts) {
      if (!last) last = ts;
      const dt = Math.min((ts - last) / 16.67, 2);
      last = ts;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speed * dt;
        p.x += p.drift * dt;
        p.twinkle += p.twinkleSpeed * dt;

        if (p.y < -12 || p.x < -20 || p.x > width + 20) {
          particles[i] = createParticle(false);
          continue;
        }

        const a = p.alpha * (0.65 + 0.35 * Math.sin(p.twinkle));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, a + ")");
        ctx.fill();

        // Soft glow for larger particles
        if (p.r > 1.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace(/[\d.]+\)$/, a * 0.2 + ")");
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    rafId = requestAnimationFrame(draw);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        last = 0;
      } else {
        rafId = requestAnimationFrame(draw);
      }
    });
  }

  /* ---- Smooth scroll for in-page links ---- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* ---- Boot ---- */
  document.addEventListener("DOMContentLoaded", () => {
    initReveals();
    initCountdown();
    initMusic();
    initParticles();
    initSmoothScroll();
  });
})();
