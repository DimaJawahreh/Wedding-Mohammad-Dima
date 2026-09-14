export const wedding = {
  couple: {
    groomEn: "Muhammad",
    brideEn: "Dima",
    groomAr: "محمد",
    brideAr: "ديما",
    displayEn: "Muhammad & Dima",
    displayAr: "محمد و ديما",
    displayArInvite: "محمد وديما",
    initials: "M & D",
  },
  date: {
    iso: "2026-10-10T20:00:00+03:00",
    endIso: "2026-10-10T22:30:00+03:00",
    weekdayEn: "Saturday",
    weekdayAr: "السبت",
    dateEn: "October 10, 2026",
    dateAr: "10 أكتوبر 2026",
    timeEn: "8:00 PM – 10:30 PM",
    timeStartEn: "8:00 PM",
    timeEndEn: "10:30 PM",
    timeAr: "8:00 مساءً – 10:30 مساءً",
    short: "10.10.2026",
    calendarMonthLabel: "October 2026",
    weddingDay: 10,
    weddingMonth: 9,
    weddingYear: 2026,
  },
  venue: {
    name: "Sheraton Amman Al Nabil Hotel",
    city: "Amman, Jordan",
    mapsSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=Sheraton+Amman+Al+Nabil+Hotel",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Sheraton+Amman+Al+Nabil+Hotel,+Amman,+Jordan&z=16&ie=UTF8&output=embed",
  },
  hosts: {
    first: "السيد سلطان أكرم سلطان",
    second: "السيد ناجح محمد جواهرة",
  },
  copy: {
    openingLine: "A new chapter begins…",
    afterOpenLine: "With love, we invite you to celebrate our beginning.",
    youreInvited: "You're invited",
    openInvitation: "Open Invitation",
    bismillah: "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ",
    quranVerse:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    invitation: {
      intro: "بكل الحب والسرور،",
      honors: "يتشرف",
      inviteLine1: "بدعوتكم لمشاركتهم فرحتهم",
      inviteLine2: "وحضور حفل زفاف",
      dayPrefix: "وذلك يوم السبت",
      timePrefix: "من الساعة",
      placeLabel: "المكان",
    },
    ceremonyTitle: "Ceremony",
    receptionTitle: "Reception",
    countdownTitle: "Counting Down",
    locationTitle: "Reception Venue",
    directions: "Get Directions",
    scheduleTitle: "Wedding Day Schedule",
    addToCalendar: "Add to Calendar",
    wishingWellTitle: "Wishing Well",
    wishingWellHint: "Tap to open",
    wishingWellMessage: "Your presence would mean the world to us.",
    wishingWellMessageAr: "حضوركم هو أغلى هدية",
    childrenNote:
      "حرصًا على أن تكون ليلتنا هادئة ومميزة، نتمنى أن تكون هذه المناسبة للكبار فقط، مع خالص محبتنا وتقديرنا.",
    closing: "Together",
    credit: "By Pride",
  },
  timeline: [
    { time: "8:00 PM", title: "Arrival & Welcome" },
    { time: "8:30 PM", title: "Wedding Celebration" },
    { time: "10:30 PM", title: "End of Celebration" },
  ],
  music: {
    src: "/assets/music/wedding.mp4",
    playLabel: "Play music",
    pauseLabel: "Pause music",
  },
  images: {
    couple: "/assets/images/couple.jpg",
    cover: "/assets/images/cover.jpg",
    inviteFloral: "/assets/images/invite-florals.png",
    floralBg: "/assets/images/floral-bg.png",
    gift: "/assets/images/gift-box.png",
  },
  meta: {
    title: "Muhammad & Dima — Wedding Invitation",
    description:
      "You are invited to celebrate the wedding of Muhammad & Dima. Saturday, October 10, 2026, 8:00 PM – 10:30 PM at Sheraton Amman Al Nabil Hotel, Amman.",
  },
} as const;

export type WeddingConfig = typeof wedding;
