# Playwright Assessment - README

## 👁 Folder Structure

```
playwright-assessment/
├── tests/                  # All Playwright test cases
│   ├── regression/
│   ├── smoke/
│   └── pom/                # Page Object Model classes
├── playwright.config.ts    # Playwright configuration
├── package.json            # Node.js project dependencies & scripts
├── package-lock.json
├── .github/workflows/      # GitHub Actions workflows
│   └── playwright.yml
└── README.md               # This file
```

---

## 💡 Prerequisites

- Node.js v20 installed
- npm installed
- Your application (`my-app`) should be running locally at `http://localhost:3000`
- Git installed

---

## 🏠 Running Tests Locally

1. **Clone your repos**:

```bash
# App repository
git clone https://github.com/gairiks-cell/my-app.git
cd my-app
npm install
npm start
```

> The app should be running on `http://localhost:3000`

```bash
# Playwright assessment repository
git clone https://github.com/gairiks-cell/playwright-assessment.git
cd playwright-assessment
npm install
npx playwright install --with-deps
```

2. **Run all tests locally**:

```bash
npx playwright test
```

3. **Run a single test file**:

```bash
npx playwright test tests/regression/regressionTodo.spec.ts
```

4. **Open Playwright HTML report**:

```bash
npx playwright show-report
```

---

## 🚀 CI/CD Pipeline (GitHub Actions)

- Workflow file: `.github/workflows/playwright.yml`
- Triggered automatically on **push or pull request** to `main` branch.

**What happens in pipeline**:

1. Checkout both the Playwright repo and the app repo
2. Install dependencies for both app and tests
3. Start the app in background using `npm start` and `wait-on http://localhost:3000`
4. Run Playwright tests in **headless mode**
5. Generate HTML reports and save as GitHub artifacts

---

## 🗓 Git Workflow

### Pull changes

```bash
git pull origin main
```

### Add & commit changes

```bash
git add .
git commit -m "Describe your changes here"
```

### Push to main

```bash
git push origin main
```

> If your branch is behind remote, you may need to force push after resolving conflicts:

```bash
git pull origin main --rebase
# resolve conflicts
git push origin main --force
```

---

## 🔑 Key Notes

- Playwright config automatically sets **headless mode** in CI.
- Viewport is maximized and slowMo enabled for local debugging.
- **Videos, screenshots, and traces** are captured on failure only.
- Tests use **Page Object Model** under `tests/pom/`.
- Ensure app is running locally before running tests if not using deployed URL.
- Best practice: deploy app or put it in a GitHub repo for CI to run end-to-end.

---

## 📌 Quick Commands

| Action                      | Command                              |
| --------------------------- | ------------------------------------ |
| Install dependencies        | `npm install`                        |
| Install Playwright browsers | `npx playwright install --with-deps` |
| Run all tests               | `npx playwright test`                |
| Run a single test file      | `npx playwright test <file>`         |
| Open HTML report            | `npx playwright show-report`         |
| Run tests in debug mode     | `npx playwright test --headed`       |
