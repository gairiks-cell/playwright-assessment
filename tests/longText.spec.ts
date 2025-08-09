import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/ToDoPage';
import { TestData } from '../utils/functions/data';

test('should allow a todo longer than 200 characters', async ({ page }) => {
  const todo = new TodoPage(page);
  const baseText = TestData('todoText');
  const longText = baseText.repeat(20);

  await todo.goto();
  await todo.deleteAllTodos();

  await todo.addTodo(longText);

  const items = await todo.getTodoItems();
  const match = items.some(item => item.startsWith(baseText) && item.length >= 200);

  console.log(`✅ Long todo added: ${match ? 'Yes' : 'No'}`);
  expect(match).toBe(true);

  console.log('Test completed: Long TODO text');
  await page.screenshot({ path: 'screenshots/long-text.png', fullPage: true });
});
