# Playwright Assessment (TypeScript)

This repository contains automated tests written in **Playwright** with **TypeScript**.

## 📦 Prerequisites
- Node.js (v16 or above recommended)
- npm (comes with Node.js)
- Git

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/gairiks-cell/playwright-assessment.git
cd playwright-assessment
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Install Playwright Browsers
```bash
npx playwright install
```

If Playwright is not installed yet:
```bash
npm install -D @playwright/test
npx playwright install
```

### 4️⃣ Run Tests
```bash
npx playwright test
```

### 5️⃣ View HTML Report
```bash
npx playwright show-report
```

This will open the HTML test report in your default browser.

---

## 📁 Project Structure
```
playwright-assessment/
│-- tests/                  # Test files
│-- pages/                  # Page Object Models for reusable UI interactions
│-- screenshots/            # Captured screenshots from test runs
│-- utils/                  # JSON data for data-driven testing & helper functions to use the data
│-- test-results/           # Stores Playwright's trace reports, videos, and screenshots
│-- playwright.config.ts    # Playwright configuration
│-- package.json            # Dependencies and scripts
└-- README.md               # Project instructions


## 🛠 Notes
- All tests are written in **TypeScript**.
- Reports are automatically generated after test runs.
- Make sure to run `npx playwright install` if browsers are not available.