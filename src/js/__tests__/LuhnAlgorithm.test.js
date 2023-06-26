import LuhnAlgorithm from '../LuhnAlgorithm';

test('the check digit must be equal to the calculated digit', () => {
  const luhnAlgorithm = new LuhnAlgorithm();
  const value = '4945616821746255';
  const expected = Number(value[value.length - 1]);
  const result = luhnAlgorithm.calcCheckNum(value);
  expect(result).toBe(expected);
});
