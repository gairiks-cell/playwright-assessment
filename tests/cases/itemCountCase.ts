import { Page, expect } from "@playwright/test";
import { TodoPage } from "../pom/TodoPage";

export async function itemCountCase(page: Page) {
  const todo = new TodoPage(page);
  await todo.goto();
  await todo.deleteAllTodos();

  await todo.addTodo("Task 1");
  await todo.addTodo("Task 2");

  let count = await todo.getItemCountText();
  console.log(`Item count before completing: ${count}`);
  expect(count).toBe("2");

  await todo.completeFirstTodo();

  count = await todo.getItemCountText();
  console.log(`Item count after completing 1: ${count}`);
  expect(count).toBe("1");

  console.log("✅ Item count validation case completed");
}
