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
