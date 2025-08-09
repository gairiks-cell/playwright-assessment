import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/ToDoPage';

test('Verify item count updates when completing todos', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();
  await todo.deleteAllTodos();

  await todo.addTodo('Task 1');
  await todo.addTodo('Task 2');

  let count = await todo.getItemCountText();
  console.log(`📝 Item count before completing any task: ${count}`);
  expect(count).toContain('2');

  await todo.completeFirstTodo();

  count = await todo.getItemCountText();
  console.log(`✅ Item count after completing 1 task: ${count}`);
  expect(count).toContain('1');
});
