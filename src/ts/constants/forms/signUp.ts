// types
import { FormSettingsType } from 'types/forms';
// components
import Input from 'components/shared/Input';

const commonSettings = {
  component: Input,
  isRequired: true,
  shouldErrorsBeVisible: false,
};

const emailSettings: { [key: string]: string | number } = {
  type: 'password',
  maxLength: 16,
  minLength: 8,
};

export const SIGN_UP_FORM_SETTINGS: FormSettingsType = [
  {
    ...commonSettings,
    id: 'email',
    name: 'email',
    label: 'E-mail',
    type: 'email',
  },
  {
    ...commonSettings,
    ...emailSettings,
    id: 'password',
    name: 'password',
    label: 'Password',
  },
  {
    ...commonSettings,
    ...emailSettings,
    id: 'repeat-password',
    name: 'repeat-password',
    label: 'Repeat Password',
  },
];
