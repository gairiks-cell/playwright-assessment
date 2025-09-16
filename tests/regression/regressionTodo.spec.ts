import { test, Page } from "@playwright/test";
import { initialLoadCase } from "../cases/initialLoadCase";
import { addTodoCase } from "../cases/addTodoCase";
import { editTodoCase } from "../cases/editTodoCase";
import { deleteTodoCase } from "../cases/deleteTodoCase";
import { addAndDeleteAllTodosCase } from "../cases/addAndDeleteAllTodosCase";
import { duplicateTodosCase } from "../cases/duplicateTodosCase";
import { emptyTodoCase } from "../cases/emptyTodoCase";
import { longTodoTextCase } from "../cases/longTodoTextCase";
import { completeTodoCase } from "../cases/completeTodoCase";
import { itemCountCase } from "../cases/itemCountCase";
import fs from "fs";
import path from "path";

function getScreenshotFolder(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const folderPath = path.join("screenshots", `${yyyy}-${mm}-${dd}`);
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
  return folderPath;
}

const isCI = process.env.CI === "true";
const screenshotFolder = isCI ? "test-results" : getScreenshotFolder();

test.describe("@regression Full TODO E2E suite", () => {
  test.beforeAll(() => console.log("🟢 Starting full TODO E2E suite"));
  test.afterAll(() => console.log("🔴 Finished full TODO E2E suite"));
  test.beforeEach(() => console.log("⚡ Preparing for next step..."));

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const safeTitle = testInfo.title.replace(/[\s/:]/g, "_");
      const screenshotPath = path.join(
        screenshotFolder,
        `${safeTitle}-failed.png`
      );
      try {
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`❌ Screenshot saved: ${screenshotPath}`);
      } catch {
        console.log("⚠️ Could not take screenshot (page not initialized?)");
      }
    }
  });

  test("Full TODO workflow", async ({ page }) => {
    const steps: { name: string; fn: (page: Page) => Promise<void> }[] = [
      { name: "Initial load", fn: initialLoadCase },
      { name: "Add TODO", fn: addTodoCase },
      { name: "Edit TODO", fn: editTodoCase },
      { name: "Delete TODO", fn: deleteTodoCase },
      { name: "Add multiple and delete all", fn: addAndDeleteAllTodosCase },
      { name: "Duplicate TODO validation", fn: duplicateTodosCase },
      { name: "Empty TODO validation", fn: emptyTodoCase },
      { name: "Long TODO text", fn: longTodoTextCase },
      { name: "Complete TODO", fn: completeTodoCase },
      { name: "Item count validation", fn: itemCountCase },
    ];

    for (const step of steps) {
      try {
        await test.step(step.name, async () => {
          await step.fn(page);
          console.log(`✅ ${step.name} completed`);
        });
      } catch (err) {
        console.error(`❌ Step "${step.name}" failed`, err);
        throw err;
      }
    }
  });
});
