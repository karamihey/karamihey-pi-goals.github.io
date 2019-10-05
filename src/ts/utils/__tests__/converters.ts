// utils
import { convertToString } from 'utils/converters';

describe('converters methods', () => {
  it('should convert to string', () => {
    expect(convertToString(123)).toEqual('123');
    expect(convertToString(1.765)).toEqual('1.765');
    expect(convertToString([2, 5, 'abc', 10, 4])).toEqual('2,5,abc,10,4');
    expect(convertToString({ a: 1, b: 'xyz'})).toEqual('[object Object]');
    expect(convertToString('abc')).toEqual('abc');

    expect(convertToString(null)).toEqual('');
    expect(convertToString(undefined)).toEqual('');
    expect(convertToString(NaN)).toEqual('');
    expect(convertToString(false)).toEqual('');
    expect(convertToString(0)).toEqual('');
    expect(convertToString('')).toEqual('');
  });
});
