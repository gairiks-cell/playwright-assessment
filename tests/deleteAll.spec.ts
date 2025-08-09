import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/ToDoPage';

test('should add 3 todos and delete them all', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();
  await todo.deleteAllTodos();

  await todo.addTodo('Task 1');
  await todo.addTodo('Task 2');
  await todo.addTodo('Task 3');

  const beforeDeleteItems = await todo.getTodoItems();
  console.log(`Total items before deletion: ${beforeDeleteItems.length}`);

  await todo.deleteAllTodos();

  const afterDeleteItems = await todo.getTodoItems();
  console.log(`Total items after deletion: ${afterDeleteItems.length}`);

  const deletedCount = beforeDeleteItems.length - afterDeleteItems.length;
  console.log(`✅ Deleted ${deletedCount} todo item(s).`);

  expect(afterDeleteItems.length).toBe(0);

  const countText = await todo.getItemCountText();
  expect(countText).toContain('0');

  console.log('Test completed: Add 3 todos and delete all');
});
