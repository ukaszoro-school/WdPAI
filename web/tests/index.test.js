import { add, multiply } from '../src/index.js';

describe('MyLibrary', () => {
  test('add() adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  test('multiply() multiplies two numbers correctly', () => {
    expect(multiply(4, 5)).toBe(20);
    expect(multiply(-2, 3)).toBe(-6);
  });
});

