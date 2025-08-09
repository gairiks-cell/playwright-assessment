import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/ToDoPage';

test('should mark a todo item as completed', async ({ page }) => {
  const todo = new TodoPage(page);

  await todo.goto();
  await todo.deleteAllTodos();

  await todo.addTodo('Complete Me');
  await todo.completeFirstTodo();
  await todo.goToCompleted();

  const completedItems = await todo.getTodoItems();
  expect(completedItems).toContain('Complete Me');

  console.log('Test completed: Mark TODO as completed');
});
