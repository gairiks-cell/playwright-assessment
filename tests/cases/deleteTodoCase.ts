import { Page, expect } from "@playwright/test";
import { TodoPage } from "../pom/TodoPage";

export async function deleteTodoCase(page: Page) {
  const todo = new TodoPage(page);
  await todo.goto();
  await todo.deleteAllTodos();

  await todo.addTodo("Delete Me");
  await todo.deleteTodo("Delete Me");

  const items = await todo.getTodoItems();
  expect(items).not.toContain("Delete Me");

  console.log("✅ Delete TODO case completed");
}
