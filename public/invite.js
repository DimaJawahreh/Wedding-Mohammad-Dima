(function () {
  var TARGET = Date.parse("2026-10-10T20:00:00+03:00");
  var scrolling = false;
  var stopScroll = false;
  var raf = 0;
  var start = 0;
  var armedAt = 0;
  var touchY = 0;
  var fontsLoaded = false;

  function guests() {
    var query = /[?&](?:guests|n)=([123])/.exec(location.search);
    if (query) return query[1];
    var part = location.pathname.replace(/\/+$/, "").split("/").pop();
    return part === "1" || part === "2" || part === "3" ? part : "1";
  }

  function pad(n) {
    return (n < 10 ? "0" : "") + Math.max(0, n);
  }

  function tickCountdown() {
    var diff = Math.max(0, TARGET - Date.now());
    var days = document.getElementById("count-days");
    var hours = document.getElementById("count-hours");
    var mins = document.getElementById("count-mins");
    var secs = document.getElementById("count-secs");
    if (days) days.textContent = pad(Math.floor(diff / 86400000));
    if (hours) hours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    if (mins) mins.textContent = pad(Math.floor((diff % 3600000) / 60000));
    if (secs) secs.textContent = pad(Math.floor((diff % 60000) / 1000));
  }

  function downloadIcs() {
    var ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "DTSTART:20261010T170000Z",
      "DTEND:20261010T203000Z",
      "SUMMARY:Wedding of Mohammad & Dima",
      "LOCATION:Sheraton Amman Hotel\\, Amman, Jordan",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    var blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "mohammad-dima-wedding.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  function loadPrettyFonts() {
    if (fontsLoaded) return;
    fontsLoaded = true;
    var style = document.createElement("style");
    style.textContent =
      '@font-face{font-family:"Aref Ruqaa";font-style:normal;font-weight:400;font-display:swap;src:url("/fonts/aref-ruqaa-400.woff2") format("woff2")}' +
      '@font-face{font-family:"Great Vibes";font-style:normal;font-weight:400;font-display:swap;src:url("/fonts/great-vibes.woff2") format("woff2")}';
    document.head.appendChild(style);
  }

  function playMusic() {
    var audio = document.getElementById("music");
    var btn = document.getElementById("music-btn");
    if (!audio) return;
    if (audio.getAttribute("src") !== "/assets/music/wedding.mp4") {
      audio.src = "/assets/music/wedding.mp4";
    }
    var play = audio.play();
    if (play && play.then) {
      play.then(function () {
        if (btn) btn.classList.add("is-playing");
      }).catch(function () {});
    }
  }

  function toggleMusic() {
    var audio = document.getElementById("music");
    var btn = document.getElementById("music-btn");
    if (!audio || !btn) return;
    if (audio.paused || audio.getAttribute("src") !== "/assets/music/wedding.mp4") {
      playMusic();
    } else {
      audio.pause();
      btn.classList.remove("is-playing");
    }
  }

  function distance() {
    var root = document.scrollingElement || document.documentElement;
    var view = window.innerHeight || root.clientHeight;
    return Math.max(0, root.scrollHeight - view, document.body.scrollHeight - view);
  }

  function setTop(y) {
    var root = document.scrollingElement || document.documentElement;
    root.scrollTop = y;
    document.documentElement.scrollTop = y;
    document.body.scrollTop = y;
  }

  function haltScroll() {
    stopScroll = true;
    scrolling = false;
    document.documentElement.classList.remove("is-auto-scrolling");
    if (raf) cancelAnimationFrame(raf);
  }

  function autoScroll() {
    if (stopScroll) return;
    var max = distance();
    if (max < 80) return;
    document.documentElement.classList.add("is-auto-scrolling");
    scrolling = true;
    armedAt = Date.now() + 800;
    var duration = Math.min(62000, Math.max(38000, max * 8));
    function step(now) {
      if (!scrolling || stopScroll) return;
      if (!start) start = now;
      var t = Math.min(1, (now - start) / duration);
      setTop(distance() * t);
      if (t < 1) raf = requestAnimationFrame(step);
      else document.documentElement.classList.remove("is-auto-scrolling");
    }
    raf = requestAnimationFrame(step);
  }

  function onOpened() {
    loadPrettyFonts();
    playMusic();
    var floral = document.getElementById("floral-bg");
    if (floral) floral.classList.add("is-on");
    window.setTimeout(autoScroll, 1600);
  }

  var note = document.getElementById("guest-note");
  if (note) note.textContent = "عدد الحضور لهذه البطاقة: " + guests();
  tickCountdown();
  window.setInterval(tickCountdown, 1000);

  var toggle = document.getElementById("opened");
  if (toggle) {
    toggle.addEventListener("change", function () {
      if (toggle.checked) onOpened();
    });
  }

  var musicBtn = document.getElementById("music-btn");
  if (musicBtn) musicBtn.onclick = toggleMusic;

  var icsBtn = document.getElementById("ics-btn");
  if (icsBtn) icsBtn.onclick = downloadIcs;

  var giftBtn = document.getElementById("gift-btn");
  if (giftBtn) {
    giftBtn.onclick = function () {
      haltScroll();
      document.getElementById("wish-modal").hidden = false;
    };
  }
  var wishClose = document.getElementById("wish-close");
  if (wishClose) {
    wishClose.onclick = function () {
      document.getElementById("wish-modal").hidden = true;
    };
  }
  var wishModal = document.getElementById("wish-modal");
  if (wishModal) {
    wishModal.onclick = function (event) {
      if (event.target === wishModal) wishModal.hidden = true;
    };
  }

  window.addEventListener("touchstart", function (event) {
    touchY = event.touches[0] ? event.touches[0].clientY : 0;
  }, { passive: true });
  window.addEventListener("touchmove", function (event) {
    if (!scrolling || Date.now() < armedAt) return;
    var y = event.touches[0] ? event.touches[0].clientY : touchY;
    if (Math.abs(y - touchY) > 12) haltScroll();
  }, { passive: true });
  window.addEventListener("wheel", function (event) {
    if (!scrolling || Date.now() < armedAt) return;
    if (Math.abs(event.deltaY) > 2) haltScroll();
  }, { passive: true });
})();
