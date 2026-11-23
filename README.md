# ForageGrid - Happy While You're Away

## Product Overview

ForageGrid is the smart 6-zone kibble console that turns lonely hours into sniffing, solving and calm. Designed for dogs left alone during work hours, it provides mental stimulation through scent work, portion-controlled dispensing, and daily game updates delivered via WiFi.

## Sections

### Hero

The landing hero with full‑width background and main value proposition.

### How It Works

 Illustrated breakdown of the 6‑zone foraging console and how each zone works.

### 7‑Day Scent Rotation

A horizontal scrolling carousel of 7 day‑specific scent thumbnails (Monday–Sunday). Below the scroller, an active‑day spotlight card displays rich, playful foraging copy for the selected day, including:

- **Scent title** – e.g., "Fresh Meadow Grass"
- **Nose‑work story/prompt** – a week‑1 fresh foraging description tailored to each day
- **Sound cue** – the auditory hint that plays for that day
- **Puzzle rule** – the activity the dog should perform
- **Difficulty label** – 1‑3 paw rating
- **Week 1 Fresh Foraging** badge

Users can navigate with **Previous/Next** buttons or click day **pills** (Mon–Sun) to switch the spotlight instantly. The 7 day thumbnails remain fully interactive and hover‑enlarged.

### Scent Wheel

A single‑active‑day spotlight card with a `aspect-[4/3]` image and the same rich per‑day copy structure (scent title, story, sound, puzzle rule, difficulty). Previous/Next buttons cycle through Monday→Sunday. This section complements the 7‑Day Scent Rotation by offering a wider, more focused view.

### Safety

Safety guidelines and material information for the ForageGrid console.

### Build Your Forage Grid

Customisation configurator for dog age, breed style, and plan selection.

### FAQ

Frequently asked questions about the ForageGrid system.

### CTA

Call‑to‑action section prompting users to get started.

## API Order Endpoint

**POST** `/api/order`

### Request Body

```json
{
  "orderNumber": "FG-XXXXXX",
  "totalAmount": 7999,
  "currency": "INR",
  "deliveryAddress": {
    "pin": "600001",
    "city": "Mumbai",
    "state": "Maharashtra"
  },
  "paymentMethod": "upi|gpay|phonepe|paytm|card|netbanking|emi|cod",
  "upiId": "optional@upi",
  "smsEnabled": true,
  "whatsappEnabled": true
}
```

### Response

```json
{
  "status": "success",
  "orderId": "FG-482913",
  "paymentStatus": "test-mode",
  "deliveryEstimate": "Thu, 27 Nov 2026",
  "smsSent": true,
  "whatsappSent": true
}
```

## Media Assets

- `/media/` - Product images and scent‑wheel day images:

  - `scent-mon-grass.png` – Monday
  - `scent-tue-pine.png` – Tuesday
  - `scent-wed-herb.png` – Wednesday
  - `scent-thu-apple.png` – Thursday
  - `scent-fri-peanut.png` – Friday
  - `scent-sat-chicken.png` – Saturday
  - `scent-sun-blueberry.png` – Sunday

- `/public/media/` - Served static assets

## Deployment

### Local Development

```bash
npm install
npm run dev
# App runs at http://localhost:3000
```

### Vercel Deployment

This project is automatically deployed to Vercel on every push to `main`. Manual deploy:

```bash
vercel --prod
```

The live site is at: `https://082it187-hwa-hackathon-eight.vercel.app`

### Notes

- Do not modify files in `.hwa/`, `init.py`, `submit.py`, or `opencode.json`
- The project uses Next.js 16.4.6 with App Router, Tailwind CSS v4, and Turbopack
- All prices are INR (Indian Rupee) with 18% GST included
- Mobile‑responsive design supports 375px, 768px, 1280px, and 1920px widths
- Uses `Intl.NumberFormat("en-IN", {style: "currency", currency: "INR"})` for all price displays
- Header anchor navigation uses `scrollToAnchor` from `components/lenis-provider.tsx` with 112px offset (`scroll-mt-28`)
- `html { scroll-padding-top: 7rem }` and `.lenis.lenis-smooth { scroll-behavior: auto !important }` in `app/globals.css` prevent header overlap
- Day "While You're Away" section has been removed entirely
- SevenDayScent now shows a horizontal scrolling carousel of 7 day images with a spotlight below featuring unique per‑day foraging copy
- ScentWheel renders a single active‑day spotlight card with `aspect-[4/3]` image and rich engaging copy
- Build passes with zero TypeScript errors and zero new ESLint errors