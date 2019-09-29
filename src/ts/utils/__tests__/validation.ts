// constants
import { VALIDATION_ERRORS } from 'constants/errors';
// utils
import {
  validateRequired, validateMinLength, validateMaxLength, validateEmail, validatePassword,
} from 'utils/validation';

describe('validation methods', () => {
  it('should validate required', () => {
    expect(validateRequired('12345678')).toEqual(false);
    expect(validateRequired('')).toEqual(VALIDATION_ERRORS.required);
  });

  it('should validate min length', () => {
    expect(validateMinLength('abcdef', 3)).toEqual(false);
    expect(validateMinLength('', 3)).toEqual(`${VALIDATION_ERRORS.minLength} 3 ${VALIDATION_ERRORS.charactersLong}`);
    expect(validateMinLength('abc', 5)).toEqual(`${VALIDATION_ERRORS.minLength} 5 ${VALIDATION_ERRORS.charactersLong}`);
  });

  it('should validate max length', () => {
    expect(validateMaxLength('abc', 6)).toEqual(false);
    expect(validateMaxLength('abcde', 5)).toEqual(false);
    expect(validateMaxLength('abcd', 3)).toEqual(`${VALIDATION_ERRORS.maxLength} 3 ${VALIDATION_ERRORS.charactersLong}`);
  });

  it('should validate email', () => {
    expect(validateEmail('test')).toEqual(VALIDATION_ERRORS.email);
    expect(validateEmail('test.@test')).toEqual(VALIDATION_ERRORS.email);
    expect(validateEmail('test.test@test')).toEqual(VALIDATION_ERRORS.email);
    expect(validateEmail('.test@test')).toEqual(VALIDATION_ERRORS.email);
    expect(validateEmail('.test@test.com')).toEqual(VALIDATION_ERRORS.email);
    expect(validateEmail('test.test@test.com')).toEqual(false);
  });

  it('should validate password', () => {
    expect(validatePassword('')).toEqual(VALIDATION_ERRORS.password);
    expect(validatePassword('test')).toEqual(VALIDATION_ERRORS.password);
    expect(validatePassword('test!')).toEqual(VALIDATION_ERRORS.password);
    expect(validatePassword('testA!')).toEqual(VALIDATION_ERRORS.password);
    expect(validatePassword('test1')).toEqual(VALIDATION_ERRORS.password);
    expect(validatePassword('test1A')).toEqual(VALIDATION_ERRORS.password);
    expect(validatePassword('test1A!')).toEqual(false);
  });
});
