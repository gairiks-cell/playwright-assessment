import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/ToDoPage';

test('should delete a todo item', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();
  await todo.deleteAllTodos();

  await todo.addTodo('Delete Me');
  await todo.deleteTodo('Delete Me');

  const items = await todo.getTodoItems();
  expect(items).not.toContain('Delete Me');

  console.log('Test completed: Delete TODO item');
});
