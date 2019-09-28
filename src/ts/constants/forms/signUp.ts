// types
import { FormSettingsType } from 'types/forms';
import { EMAIL_INPUT_SETTINGS, PASSWORD_INPUT_SETTINGS } from 'constants/forms';
// components
import Input from 'components/shared/Input';

const commonSettings = {
  component: Input,
  isRequired: true,
  shouldErrorsBeVisible: false,
  handleValidationErrorsCallback: () => {},
};

export const SIGN_UP_FORM_SETTINGS: FormSettingsType = [
  {
    ...commonSettings,
    ...EMAIL_INPUT_SETTINGS,
    id: 'email',
    name: 'email',
    label: 'E-mail',
  },
  {
    ...commonSettings,
    ...PASSWORD_INPUT_SETTINGS,
    id: 'password',
    name: 'password',
    label: 'Password',
  },
  {
    ...commonSettings,
    ...PASSWORD_INPUT_SETTINGS,
    id: 'confirmPassword',
    name: 'confirm-password',
    label: 'Confirm Password',
  },
];
