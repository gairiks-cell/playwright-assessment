import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/ToDoPage';
import { TestData } from '../utils/functions/data';

test('should allow duplicate todos', async ({ page }) => {
  const todo = new TodoPage(page);
  const text = TestData('todoText');

  await todo.goto();
  await todo.deleteAllTodos();

  await todo.addTodo(text);
  await todo.addTodo(text);

  const items = await todo.getTodoItems();
  const duplicateCount = items.filter(item => item === text).length;

  console.log(`Duplicate "${text}" count: ${duplicateCount}`);
  expect(duplicateCount).toBeGreaterThan(1);

  console.log('Test completed: Duplicate todos');
});
