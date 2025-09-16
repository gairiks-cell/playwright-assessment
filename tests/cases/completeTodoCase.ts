import { Page, expect } from "@playwright/test";
import { TodoPage } from "../pom/TodoPage";

export async function completeTodoCase(page: Page) {
  const todo = new TodoPage(page);
  await todo.goto();
  await todo.deleteAllTodos();

  await todo.addTodo("Complete Me");
  await todo.completeFirstTodo();
  await todo.goToCompleted();

  const completedItems = await todo.getTodoItems();
  expect(completedItems).toContain("Complete Me");
  console.log("✅ Complete TODO case completed");
}
