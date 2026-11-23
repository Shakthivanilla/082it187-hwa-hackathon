# ForageGrid - Happy While You're Away

## Product Overview
ForageGrid is the smart 6-zone kibble console that turns lonely hours into sniffing, solving and calm. Designed for dogs left alone during work hours, it provides mental stimulation through scent work, portion-controlled dispensing, and daily game updates delivered via WiFi.

## Interactive Configurator
Build your custom ForageGrid with three decision points:

1. **Dog Age** - Puppy, Lifestyle (golden retriever), or Senior
2. **Breed Style** - Scent Hounds (#facc15), Working Brains (#60a5fa), Earth Dogs (#a16207), Power Chewers (#b45309) - each with distinct 3D console colors
3. **Plan** - 
   - **One-time Console**: ₹7,999 (GST inclusive)
   - **Monthly Refresh Pack**: ₹7,999 + ₹699/month = ₹8,698/month
   - **Yearly Refresh Pack**: ₹7,999 + ₹549/month billed annually = ₹6,588/year (Best value * Save ₹1,000) + No-cost EMI from ₹667/month

**INR prices are inclusive of 18% GST. Free delivery across India.**

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
- `/media/` - Product images and videos:
  - `foragegrid-hero.png` - Hero section background
  - `foragegrid-app.png` - App/console visualization
  - `empty-cart.png` - Empty cart state (sleeping dog)
  - `exploded-view.png` - How it works illustration
  - `foragegrid-*.png` - Scent wheel day images
  - `foragegrid-*.mp4` - Demo videos
  - `refresh-pack.png` - Refresh plan visualization
- `/public/media/` - Served static assets

## Deployment

### Local Development
```bash
npm install
npm run dev
# App runs at http://localhost:3000
```

### Vercel Deployment
This project is automatically deployed to Vercel on every push to `main`. 
Manual deploy:
```bash
vercel --prod
```
The live site is at: `https://082it187-hwa-hackathon-eight.vercel.app`

### Notes
- Do not modify files in `.hwa/`, `init.py`, `submit.py`, or `opencode.json`
- The project uses Next.js 16.4.6 with App Router, Tailwind CSS v4, and Turbopack
- All prices are INR (Indian Rupee) with 18% GST included
- Mobile-responsive design supports 375px, 768px, 1280px, and 1920px widths
- Uses `Intl.NumberFormat("en-IN", {style: "currency", currency: "INR"})` for all price displays