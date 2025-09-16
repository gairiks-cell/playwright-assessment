import { defineConfig } from "@playwright/test";

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: { timeout: 5000 },

  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],

  use: {
    // baseURL: "http://localhost:3000",

    headless: isCI /*? true : false*/,
    viewport: null /*{ width: 1280, height: 720 }*/,
    ignoreHTTPSErrors: true,

    launchOptions: {
      args: isCI ? [] : ["--start-maximized"],
      slowMo: isCI ? 0 : 300,
    },

    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },

  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "firefox", use: { browserName: "firefox" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],

  retries: isCI ? 2 : 0,
});
