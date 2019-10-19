// constants
import { FIELDS_MAX_LENGTH, FIELDS_MIN_LENGTH } from 'constants/forms';
// utils
import { validateEmail, validatePassword, validatePasswordConfirm } from 'utils/validation';

export default {
  email: {
    isRequired: true,
    handleValidationCallback: validateEmail,
  },
  password: {
    isRequired: true,
    maxLength: FIELDS_MAX_LENGTH.password,
    minLength: FIELDS_MIN_LENGTH.password,
    handleValidationCallback: validatePassword,
  },
  confirmPassword: {
    isRequired: true,
    maxLength: FIELDS_MAX_LENGTH.password,
    minLength: FIELDS_MIN_LENGTH.password,
    handleValidationCallback: validatePasswordConfirm,
  },
};
