import { Page, expect } from "@playwright/test";
import { TodoPage } from "../pom/TodoPage";

export async function addAndDeleteAllTodosCase(page: Page) {
  const todo = new TodoPage(page);
  await todo.goto();
  await todo.deleteAllTodos();

  await todo.addTodo("Task 1");
  await todo.addTodo("Task 2");
  await todo.addTodo("Task 3");

  const beforeDeleteItems = await todo.getTodoItems();
  console.log(`Items before deletion: ${beforeDeleteItems.length}`);

  await todo.deleteAllTodos();

  const afterDeleteItems = await todo.getTodoItems();
  console.log(`Items after deletion: ${afterDeleteItems.length}`);

  expect(afterDeleteItems.length).toBe(0);
  console.log("✅ Add and delete all TODOs case completed");
}
