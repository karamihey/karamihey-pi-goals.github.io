const emailRegExp = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
const passwordRegExp = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*[A-Z])(?=.*[.!@#$%^&*()_+=-]).+$/;

export const validateRequired = (value: string) => {
  if (value && value.length !== 0) {
    return false;
  }

  return 'should not be blank';
};

export const validateMinLength = (value: string, minLength: number) => {
  if (value && value.length >= minLength) {
    return false;
  }

  return `must be at least ${minLength} characters long`;
};

export const validateMaxLength = (value: string, maxLength: number) => {
  if (value && value.length <= maxLength) {
    return false;
  }

  return `must be no more than ${maxLength} characters long`;
};

export const validateEmail = (email: string) => {
  if (emailRegExp.test(email)) {
    return false;
  }

  return 'is invalid';
};

export const validatePassword = (password: string) => {
  if (passwordRegExp.test(password)) {
    return false;
  }

  return 'must contain digits, lowercase letters, uppercase letters and a special character(s)';
};
