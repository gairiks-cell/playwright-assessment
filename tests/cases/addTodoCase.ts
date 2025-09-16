import { Page, expect } from "@playwright/test";
import { TodoPage } from "../pom/TodoPage";

export async function addTodoCase(page: Page) {
  const todo = new TodoPage(page);
  await todo.goto();
  await todo.deleteAllTodos();
  await todo.addTodo("Buy milk");

  const items = await todo.getTodoItems();
  expect(items).toContain("Buy milk");

  console.log("✅ Add TODO case completed");
}
