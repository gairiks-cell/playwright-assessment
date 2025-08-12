import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/ToDoPage';
import { TestData } from '../utils/functions/data';
import path from 'path';

test.describe('TODO App - Test Suite', () => {
  let todo: TodoPage;
  const baseTodoText = TestData('todoText');
  const today = new Date().toISOString().split('T')[0];

  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.goto();
    await todo.deleteAllTodos();
  });

  test.afterEach(async ({ page }) => {
    const testInfo = test.info();
    const fileName = path.basename(testInfo.file || 'default').replace('.ts', '');
    const screenshotPath = `screenshots/${today}/failed_${fileName}/${testInfo.title.replace(/\s+/g, '_')}.png`;

    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ path: screenshotPath, fullPage: true });
    }

    console.log(`Test completed: ${testInfo.title} — Status: ${testInfo.status}`);
  });

  test.afterAll(async () => {
    // Optional: Clean up logic, DB reset, etc.
    console.log('✅ All tests completed in TODO suite.');
  });

  /**
   * Verify a todo item can be added successfully
   */
  test('should add a new TODO item', async ({ page }) => {
    await todo.addTodo(baseTodoText);
    const items = await todo.getTodoItems();
    expect(items).toContain(baseTodoText);

    // Optional: always capture screenshot
    const testInfo = test.info();
    const fileName = path.basename(testInfo.file || 'default').replace('.ts', '');
    const screenshotPath = `screenshots/${today}/${fileName}/${testInfo.title.replace(/\s+/g, '_')}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
  });

  /**
   * Check duplicate todos are accepted
   */
  test('should allow duplicate todos', async () => {
    await todo.addTodo(baseTodoText);
    await todo.addTodo(baseTodoText);
    const items = await todo.getTodoItems();
    const duplicateCount = items.filter(i => i === baseTodoText).length;
    expect(duplicateCount).toBeGreaterThan(1);
  });

  /**
   * Ensure empty todos are not added
   */
  test('should not allow adding empty todo item', async () => {
    await todo.addTodo('');
    const items = await todo.getTodoItems();
    expect(items.length).toBe(0);
  });

  /**
   * Validate support for long todo text entries
   */
  test('should allow todo longer than 200 characters', async () => {
    const longText = baseTodoText.repeat(20);
    await todo.addTodo(longText);
    const items = await todo.getTodoItems();
    const found = items.some(i => i.startsWith(baseTodoText) && i.length >= 200);
    expect(found).toBe(true);
  });
  
  /**
   * Test deletion of a todo item
   */
  test('should delete a todo item', async () => {
    const deleteText = TestData('deleteText') || 'Delete Me';
    await todo.addTodo(deleteText);
    await todo.deleteTodo(deleteText);
    const items = await todo.getTodoItems();
    expect(items).not.toContain(deleteText);
  });

  /**
   * Test marking a todo as complete
   */
  test('should mark a todo item as completed', async () => {
    const completeText = TestData('completeText') || 'Complete Me';
    await todo.addTodo(completeText);
    await todo.completeFirstTodo();
    await todo.goToCompleted();
    const completedItems = await todo.getTodoItems();
    expect(completedItems).toContain(completeText);
  });

  /**
   * Verify item count updates correctly after completion
   */
  test('should update item count when completing todos', async () => {
    await todo.addTodo(TestData('task1'));
    await todo.addTodo(TestData('task2'));

    let count = await todo.getItemCountText();
    expect(count).toContain('2');

    await todo.completeFirstTodo();

    count = await todo.getItemCountText();
    expect(count).toContain('1');
  });

  /**
   * Ensure multiple todos can be added and deleted
   */
  test('should add 3 todos and delete all', async () => {
    await todo.addTodo(TestData('task1'));
    await todo.addTodo(TestData('task2'));
    await todo.addTodo(TestData('task3'));

    const beforeDeleteItems = await todo.getTodoItems();
    expect(beforeDeleteItems.length).toBe(3);

    await todo.deleteAllTodos();

    const afterDeleteItems = await todo.getTodoItems();
    expect(afterDeleteItems.length).toBe(0);

    const countText = await todo.getItemCountText();
    expect(countText).toContain('0');
  });

  /**
   * Verify that the page loads quickly and displays main UI
   */
  test('should load the TODO app and input within 5 seconds', async ({ page }) => {
    const start = Date.now();
    await todo.goto();
    await expect(todo.inputBox).toBeVisible();

    const loadTime = (Date.now() - start) / 1000;
    expect(loadTime).toBeLessThanOrEqual(5);

    await expect(page).toHaveURL(TestData('URL'));

    const title = await page.title();
    expect(title).not.toBe('');

    const items = await todo.getTodoItems();
    expect(items.length).toBe(0);
  });
});
