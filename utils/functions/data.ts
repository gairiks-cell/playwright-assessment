import data from "../data/data.json";

const Data = (key: string): any => {
  return data[key];
};

export const TestData = Data;