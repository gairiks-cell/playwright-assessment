import { Page, expect } from "@playwright/test";
import { TodoPage } from "../pom/TodoPage";

export async function initialLoadCase(page: Page) {
  const todo = new TodoPage(page);
  const start = Date.now();
  await todo.goto();

  await expect(todo.inputBox).toBeVisible();

  const loadTime = (Date.now() - start) / 1000;
  console.log(`Page load time: ${loadTime.toFixed(3)}s`);
  expect(loadTime).toBeLessThanOrEqual(10);

  const title = await page.title();
  expect(title).not.toBe("");

  const items = await todo.getTodoItems();
  expect(items.length).toBe(0);

  console.log("✅ Initial load case completed");
}
