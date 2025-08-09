import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/ToDoPage';
import { TestData } from '../utils/functions/data';

test('should add a new TODO item', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();
  await todo.deleteAllTodos();

  await todo.addTodo(TestData('todoText'));

  const items = await todo.getTodoItems();
  expect(items).toContain(TestData('todoText'));

  console.log('Test completed: Add TODO item');
  await page.screenshot({ path: 'screenshots/add-todo.png', fullPage: true });
});