# دعوة زفاف ديما ومحمد

موقع دعوة زفاف عربي فاخر — صفحة واحدة، متجاوب بالكامل، جاهز للنشر على **Vercel** مجاناً.

## الملفات

```
wedding-invitation/
├── index.html      # الصفحة الرئيسية + Open Graph
├── style.css       # التصميم والرسوم المتحركة
├── script.js       # العد التنازلي، الموسيقى، الجزيئات الذهبية
├── vercel.json     # إعدادات النشر
├── README.md
└── assets/
    ├── cover.jpg     # صورة الغلاف (Open Graph + الخلفية)
    ├── music.mp3     # موسيقى الخلفية (أضف ملفك هنا)
    ├── gallery1.jpg
    ├── gallery2.jpg
    └── gallery3.jpg
```

## التشغيل محلياً

افتح المجلد ثم شغّل خادماً بسيطاً:

```bash
npx serve .
```

أو افتح `index.html` مباشرة في المتصفح (الموسيقى قد تحتاج خادماً محلياً بسبب قيود المتصفح).

---

## أين تستبدل المحتوى؟

### 1) صورة الغلاف (WhatsApp / Facebook / Telegram)

- الملف: `assets/cover.jpg`
- استبدلها بصورة أفقية مفضّلة **1200×630** بكسل أو أكبر.
- بعد النشر، حدّث روابط Open Graph في `index.html`:

```html
<meta property="og:image" content="https://YOUR-PROJECT.vercel.app/assets/cover.jpg" />
<meta property="og:url" content="https://YOUR-PROJECT.vercel.app/" />
<meta name="twitter:image" content="https://YOUR-PROJECT.vercel.app/assets/cover.jpg" />
```

استبدل `YOUR-PROJECT.vercel.app` برابط موقعك الحقيقي بعد النشر.

### 2) موسيقى الخلفية

- ضع ملفك في: `assets/music.mp3`
- الزر العائم ♪ يشغّل/يوقف الموسيقى (يتطلب ضغطة من الزائر بسبب سياسات المتصفح).

### 3) رابط خرائط Google

- في `index.html` ابحث عن الزر:

```html
<a ... href="https://maps.google.com/?q=Sheraton+Hotel" id="maps-link" ...>
```

- استبدل قيمة `href` برابط موقع الحفل من Google Maps (مشاركة → نسخ الرابط).

### 4) صور المعرض

- استبدل: `assets/gallery1.jpg` و `gallery2.jpg` و `gallery3.jpg`

### 5) التاريخ في العد التنازلي

- التاريخ مضبوط على **15 سبتمبر الساعة 8:00 مساءً** في `script.js` (دالة `getWeddingDate`).

---

## النشر المجاني على Vercel (موصى به)

### الخطوة 1 — إنشاء حساب

1. ادخل إلى [https://vercel.com](https://vercel.com)
2. سجّل بحساب GitHub أو البريد الإلكتروني (مجاني).

### الخطوة 2 — إنشاء مستودع على GitHub

1. ادخل إلى [https://github.com](https://github.com) وأنشئ حساباً إن لم يكن لديك.
2. New repository → اختر اسماً مثل `wedding-dima-mohammad`.
3. اتركه Public → Create repository.

### الخطوة 3 — رفع الملفات

**الطريقة الأسهل (من الموقع):**

1. افتح المستودع → **Add file** → **Upload files**.
2. اسحب محتويات مجلد `wedding-invitation` (كل الملفات بما فيها `assets`).
3. Commit changes.

**أو عبر Git:**

```bash
cd wedding-invitation
git init
git add .
git commit -m "Wedding invitation for Dima & Mohammad"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### الخطوة 4 — ربط المشروع بـ Vercel

1. في [vercel.com/new](https://vercel.com/new) اختر **Import** للمستودع.
2. Framework Preset: **Other** (ملفات ثابتة).
3. Root Directory: اتركه كما هو إن رفعت الملفات في جذر المستودع.
4. اضغط **Deploy**.

### الخطوة 5 — انتظار اكتمال النشر

خلال أقل من دقيقة يظهر رابط مثل:

`https://wedding-dima-mohammad.vercel.app`

### الخطوة 6 — مشاركة الرابط

1. حدّث روابط `og:image` و `og:url` و `twitter:image` في `index.html` بالرابط الحقيقي.
2. ادفع التعديل مرة أخرى (Push / Redeploy).
3. شارك الرابط عبر واتساب — ستظهر صورة الغلاف والعنوان والوصف تلقائياً.

> ملاحظة: إن لم تتحدث معاينة واتساب فوراً، استخدم [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) لمسح الكاش.

---

## Open Graph

الموقع يتضمن:

| الوسم | القيمة |
|--------|--------|
| `og:title` | دعوة زفاف ديما ومحمد |
| `og:description` | نتشرف بدعوتكم لحضور حفل زفاف ديما ومحمد... |
| `og:image` | `/assets/cover.jpg` (رابط مطلق بعد النشر) |
| `og:url` | رابط الموقع |
| `twitter:card` | `summary_large_image` |
| `twitter:image` | نفس صورة الغلاف |

---

## الميزات

- تصميم فاخر رومانسي (أبيض / ذهبي `#D4AF37` / بيج)
- خط Cairo
- قسم بطل بملء الشاشة
- جزيئات ذهبية متحركة
- رسوم دخول أنيقة
- موسيقى خلفية مع زر عائم
- عد تنازلي حتى يوم الزفاف
- بطاقات التاريخ والوقت والمكان
- زر خرائط Google
- معرض صور
- متوافق مع الجوال أولاً
- جاهز لـ Vercel Pages

---

صُنع بحب لديما ومحمد ❤️
