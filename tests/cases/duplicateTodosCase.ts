import { Page, expect } from "@playwright/test";
import { TodoPage } from "../pom/TodoPage";

export async function duplicateTodosCase(page: Page) {
  const todo = new TodoPage(page);
  await todo.goto();
  await todo.deleteAllTodos();

  const text = "Duplicate Me";
  await todo.addTodo(text);
  await todo.addTodo(text);

  const items = await todo.getTodoItems();
  const duplicateCount = items.filter((item) => item === text).length;

  console.log(`Duplicate count: ${duplicateCount}`);
  expect(duplicateCount).toBeGreaterThan(1);

  console.log("✅ Duplicate TODO case completed");
}
