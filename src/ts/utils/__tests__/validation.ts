// constants
import { VALIDATION_ERRORS } from 'constants/errors';
// utils
import {
  validateRequired, validateMinLength, validateMaxLength, validateEmail, validatePassword, validatePasswordConfirm,
  validateInput,
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

  it('should validate password confirm', () => {
    expect(validatePasswordConfirm('12345678', 'abc')).toEqual(VALIDATION_ERRORS.confirmPassword);
    expect(validatePasswordConfirm('test1A!', 'test1A!')).toEqual(false);
  });

  it('should validate form control', () => {
    expect(validateInput('', {})).toEqual('');

    expect(validateInput('', { isRequired: true })).toEqual(VALIDATION_ERRORS.required);
    expect(validateInput('aaa', { isRequired: true })).toEqual(false);

    expect(validateInput('123', { minLength: 4 })).toEqual(`${VALIDATION_ERRORS.minLength} 4 ${VALIDATION_ERRORS.charactersLong}`);
    expect(validateInput('', { minLength: 3 })).toEqual(`${VALIDATION_ERRORS.minLength} 3 ${VALIDATION_ERRORS.charactersLong}`);
    expect(validateInput('1234', { minLength: 4 })).toEqual(false);

    expect(validateInput('123456', { maxLength: 5 })).toEqual(`${VALIDATION_ERRORS.maxLength} 5 ${VALIDATION_ERRORS.charactersLong}`);
    expect(validateInput('', { maxLength: 3 })).toEqual(false);
    expect(validateInput('1234', { maxLength: 4 })).toEqual(false);

    expect(validateInput('', { handleValidationCallback: validatePassword })).toEqual(VALIDATION_ERRORS.password);
    expect(validateInput('test', { handleValidationCallback: validatePassword })).toEqual(VALIDATION_ERRORS.password);
    expect(validateInput('test!', { handleValidationCallback: validatePassword })).toEqual(VALIDATION_ERRORS.password);
    expect(validateInput('test1A', { handleValidationCallback: validatePassword })).toEqual(VALIDATION_ERRORS.password);
    expect(validateInput('test1A!', { handleValidationCallback: validatePassword })).toEqual(false);

    expect(validateInput('', { handleValidationCallback: validateEmail })).toEqual(VALIDATION_ERRORS.email);
    expect(validateInput('test', { handleValidationCallback: validateEmail })).toEqual(VALIDATION_ERRORS.email);
    expect(validateInput('test@', { handleValidationCallback: validateEmail })).toEqual(VALIDATION_ERRORS.email);
    expect(validateInput('test@test', { handleValidationCallback: validateEmail })).toEqual(VALIDATION_ERRORS.email);
    expect(validateInput('test@testcom', { handleValidationCallback: validateEmail })).toEqual(VALIDATION_ERRORS.email);
    expect(validateInput('test@test.com', { handleValidationCallback: validateEmail })).toEqual(false);
  });
});
