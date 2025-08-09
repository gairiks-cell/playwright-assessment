import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/ToDoPage';
import { TestData } from '../utils/functions/data';

test('TODO app loads within 10 seconds and initial state is correct', async ({ page }) => {
  const todo = new TodoPage(page);

  const start = Date.now();
  await todo.goto();

  await expect(todo.inputBox).toBeVisible();

  const loadTime = (Date.now() - start) / 1000;
  console.log(`Page load time: ${loadTime.toFixed(3)} seconds`);

  expect(loadTime).toBeLessThanOrEqual(10);

  await expect(page).toHaveURL(TestData('URL'));

  const title = await page.title();
  expect(title).not.toBe('');

  const items = await todo.getTodoItems();
  expect(items.length).toBe(0);
});
