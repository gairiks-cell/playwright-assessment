import locators from "../test-data/locators/locator.json";

// Define a type for the keys of the locator JSON
type LocatorKey = keyof typeof locators;

export function TestData(key: LocatorKey) {
  if (locators[key]) return locators[key];
  throw new Error(`Key not found: ${key}`);
}
