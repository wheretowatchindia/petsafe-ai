# PetSafe AI 🐶🐱 | US Pet Food, Plant & Symptom Safety Scanner

**PetSafe AI** is an AI-assisted pet safety web application engineered specifically for the United States pet owner market. It empowers dog and cat parents to instantly verify whether foods, plants, household substances, or medications are safe or toxic for their companions, receive clinical educational symptom triage, and manage veterinary care reminders.

---

## 🌟 Key Features

### 1. AI Food, Plant & Substance Scanner
- **Multi-Modal Input:** Upload photos of ingredient labels/cans, use device camera on mobile, or type any food or plant name.
- **Species Discrimination:** Calculates distinct toxicity profiles for **Dogs 🐶** vs **Cats 🐱** (e.g., Lilies and Acetaminophen are fatal to cats; Grapes and Xylitol cause acute death in dogs).
- **Dosage & Weight Calculations:** Adjusts toxicity threshold warnings based on the pet's approximate weight in pounds (lbs).
- **Strict Clinical Categorization:**
  - `Generally Safe` ✅
  - `Use Caution` ⚠️
  - `Potentially Toxic` 🚨
  - `Unknown — Safety Not Verified` ❓ *(Unidentified items are NEVER assumed safe!)*
- **Complete Actionable Reports:** Outlines identified toxic compounds, symptoms of ingestion, immediate precautions, recommended next steps, and official veterinary citations.

### 2. Pet Symptom Assistant & Triage Engine
- **Multi-Symptom Selection:** Covers digestive, respiratory, neurological, urinary, and skin issues.
- **Immediate Red-Flag Triage:** Prominently flags life-threatening emergencies (difficulty breathing, active seizures, collapse, acute toxin ingestion, urethral blockage in male cats, bloated retching/GDV in dogs).
- **Educational Guidance:** Hydration skin turgor test, gum color guide, and questions to ask the vet.
- **Printable Vet Visit Summary:** Export or print notes to present to the veterinarian during an exam.

### 3. Pet Profiles Dashboard
- Manage multiple companion animals (dogs & cats).
- Track pet age, breed, weight in lbs, and known food allergies/sensitivities.
- 1-click active pet switcher that automatically syncs with the scanner and triage engine.

### 4. Care & Vaccine Reminders
- Schedule core vaccines (Rabies, DHPP, FVRCP, FeLV), monthly flea/tick chewables (NexGard, Simparica, Bravecto), and vet appointments.
- Working browser push notification permission integration.

### 5. Monetization & Pricing Architecture
- **Free Plan:** Free food database searches, up to 5 scans/day, basic symptom guide, tasteful partner sponsor banner placeholders.
- **Premium Plan ($3.99/mo):** Unlimited scans, multi-pet tracking, care reminders, ad-free experience, and printable vet reports.
- **Zero Accidental Charges:** Includes an interactive plan simulator ready for Stripe integration without charging without approval.

### 6. Emergency Helpline Fast-Access
- Direct, 1-tap dial buttons for 24/7/365 US emergency poison resources:
  - **ASPCA Animal Poison Control Center:** `(888) 426-4435`
  - **Pet Poison Helpline:** `(855) 764-7661`

---

## 🔒 Security & Privacy Standard
- **Zero Client-Side Secret Leakage:** The app does not expose private API keys in the browser.
- **Provider-Independent AI Layer:** Runs 100% offline using a scientifically verified database of 80+ substances (ASPCA, AVMA, Merck Veterinary Manual), with an optional pluggable cloud backend proxy for live vision models.
- **Data Deletion:** Includes a 1-click "Clear My Local Pet Data" button for CCPA & GDPR privacy compliance.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🌐 Free-Tier Deployment Instructions

### Deploy to Vercel (Recommended - 100% Free)
1. Push this project to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the repository. Vercel automatically detects Vite.
4. Click **Deploy**. The `vercel.json` file handles all client-side routing.

### Deploy to Netlify
1. Connect repository on [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The included `netlify.toml` automatically configures SPA fallback rules.

---

## ⚕️ Veterinary Medical Disclaimer
PetSafe AI is designed exclusively for educational information. It does NOT provide veterinary medical diagnoses. If you suspect your pet has ingested a toxic substance, contact an emergency veterinarian or animal poison control immediately.
