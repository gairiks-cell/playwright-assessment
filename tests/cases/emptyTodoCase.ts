import { Page, expect } from "@playwright/test";
import { TodoPage } from "../pom/TodoPage";

export async function emptyTodoCase(page: Page) {
  const todo = new TodoPage(page);
  await todo.goto();
  await todo.deleteAllTodos();

  await todo.addTodo("");

  const items = await todo.getTodoItems();
  console.log(`Current items after empty add: ${items.length}`);

  expect(items.length).toBe(0);
  console.log("✅ Empty TODO validation case completed");
}
