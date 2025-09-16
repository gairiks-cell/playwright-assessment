import { Page, Locator } from "@playwright/test";
import { TestData } from "../helpers/dataHelper"; // For locators & test data
import { TestData as EnvDataHelper } from "../helpers/envHelper";   // For environment URL

export class TodoPage {
  readonly page: Page;
  readonly inputBox: Locator;
  readonly todoItems: Locator;
  readonly toggleCheckboxes: Locator;
  readonly deleteButtons: Locator;
  readonly completedLink: Locator;
  readonly itemCount: Locator;
  readonly editInputBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputBox = page.locator(TestData("inputBox"));
    this.todoItems = page.locator(TestData("todoTitle"));
    this.toggleCheckboxes = page.locator(TestData("checkBox"));
    this.deleteButtons = page.locator(TestData("deleteButton"));
    this.completedLink = page.locator(TestData("completedLink"));
    this.itemCount = page.locator(TestData("itemCount"));
    this.editInputBox = page.locator(TestData("todoTitle"));
  }

  async goto() {
    await this.page.goto(EnvDataHelper("URL")); // Use envHelper for URL
    await this.page.evaluate(() => localStorage.clear()); // Optional reset
  }

  async addTodo(item: string) {
    await this.inputBox.fill(item);
    await this.inputBox.press("Enter");
  }

  async addDefaultTodo() {
    const defaultText = TestData("todoText");
    await this.addTodo(defaultText);
  }

  async completeFirstTodo() {
    await this.toggleCheckboxes.first().check();
  }

  async deleteTodo(itemText: string) {
    const todo = this.page.locator(TestData("todoTitle"), {
      hasText: itemText,
    });
    await todo.hover();
    await this.deleteButtons.first().click();
  }

  async getTodoItems(): Promise<string[]> {
    return await this.todoItems.allTextContents();
  }

  async goToCompleted() {
    await this.completedLink.click();
  }

  async getItemCountText(): Promise<string> {
    const activeTodoItems = this.page.locator(TestData("itemCount"));
    const totalItems = await activeTodoItems.count();
    return totalItems.toString();
  }

  async deleteAllTodos() {
    while ((await this.todoItems.count()) > 0) {
      await this.todoItems.nth(0).hover();
      await this.deleteButtons.nth(0).click();
    }
  }

  async editTodo(oldText: string, newText: string) {
    const todoLabel = this.page.locator(`text=${oldText}`);
    await todoLabel.click();

    const editInput = this.page.locator("input.edit");
    await editInput.clear();
    await editInput.fill(newText);
    await editInput.press("Enter");
  }
}
