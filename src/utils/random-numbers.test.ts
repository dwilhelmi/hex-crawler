import { randomInRange, rollDice } from './random-numbers';

test("Random in range", () => {
  const randomSpy = jest.spyOn(global.Math, 'random');
  randomSpy.mockReturnValue(0.999);
  expect(randomInRange(1,1)).toBe(1);
  expect(randomInRange(1,2)).toBe(2);
  expect(randomInRange(1,200)).toBe(200);
  randomSpy.mockReturnValue(0);
  expect(randomInRange(1,1)).toBe(1);
  expect(randomInRange(1,2)).toBe(1);
  expect(randomInRange(1,200)).toBe(1);
  randomSpy.mockReturnValue(0.4999);
  expect(randomInRange(1,1)).toBe(1);
  expect(randomInRange(1,2)).toBe(1);
  expect(randomInRange(1,200)).toBe(100);
});

test("Roll dice", () => {
  const randomSpy = jest.spyOn(global.Math, 'random');
  randomSpy.mockReturnValue(0.999);
  expect(rollDice()).toBe(6);
  expect(rollDice({ sides: 20 })).toBe(20);
  expect(rollDice({ count: 2, sides: 20 })).toBe(40);
  expect(rollDice({ count: 2, sides: 20, extra: 4 })).toBe(44);
  expect(rollDice({ count: 2, sides: 20, extra: -4 })).toBe(36);

  randomSpy.mockReturnValue(0);
  expect(rollDice()).toBe(1);
});