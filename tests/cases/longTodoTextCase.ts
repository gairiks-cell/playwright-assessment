import { Page, expect } from "@playwright/test";
import { TodoPage } from "../pom/TodoPage";
import { TestData } from "../helpers/dataHelper";

export async function longTodoTextCase(page: Page) {
  const todo = new TodoPage(page);
  const baseText = TestData("todoText");
  const longText = baseText.repeat(20);

  await todo.goto();
  await todo.deleteAllTodos();

  await todo.addTodo(longText);

  const items = await todo.getTodoItems();
  const match = items.some(
    (item) => item.startsWith(baseText) && item.length >= 200
  );

  console.log(`✅ Long todo added: ${match ? "Yes" : "No"}`);
  expect(match).toBe(true);

  console.log("Flow completed: Long TODO text");
}
