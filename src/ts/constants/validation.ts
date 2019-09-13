export const VALIDATION_REGEXPS = {
  email: /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
  password: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*[A-Z])(?=.*[.!@#$%^&*()_+=-]).+$/,
};

export const VALIDATION_ERRORS = {
  required: 'should not be blank',
  minLength: 'must be at least',
  maxLength: 'must be no more than ',
  charactersLong: 'characters long',
  email: 'is invalid',
  password: 'must contain digits, lowercase letters, uppercase letters and a special character(s)',
};
