import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/ToDoPage';

test('should not allow adding an empty todo item', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();
  await todo.deleteAllTodos();

  await todo.addTodo('');

  const items = await todo.getTodoItems();
  console.log(`❌ Empty todo add attempt, current items: ${items.length}`);

  expect(items.length).toBe(0);

  console.log('Test completed: Empty TODO validation');
});
