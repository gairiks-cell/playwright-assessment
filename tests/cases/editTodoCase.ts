import { Page, expect } from "@playwright/test";
import { TodoPage } from "../pom/TodoPage";

export async function editTodoCase(page: Page) {
  const todo = new TodoPage(page);
  await todo.goto();
  await todo.deleteAllTodos();

  await todo.addTodo("Buy milk");
  await todo.editTodo("Buy milk", "Buy milk and eggs");

  const items = await todo.getTodoItems();
  expect(items).toContain("Buy milk and eggs");

  console.log("✅ Edit TODO case completed");
}
