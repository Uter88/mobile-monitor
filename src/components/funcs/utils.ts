export const parseDistance = (d: number) => (d / 1000).toFixed();

export const getRange = (start: number, stop: number) => {
  const result = [] as number[];

  while (start < stop) {
    result.push(start);
    start++;
  }
  return result;
};
