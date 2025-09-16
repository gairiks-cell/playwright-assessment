import env from "../test-data/env/test.json";

// Type for valid keys in your env JSON
type EnvKey = keyof typeof env;

export function TestData(key: EnvKey) {
  if (env[key]) return env[key];
  throw new Error(`Key not found: ${key}`);
}
