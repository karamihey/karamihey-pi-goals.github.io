// types
import { FormSettingsType } from 'types/forms';
import { PASSWORD_INPUT_SETTINGS } from 'constants/forms';
// components
import Input from 'components/shared/Input';

const commonSettings = {
  component: Input,
  isRequired: true,
  shouldErrorsBeVisible: false,
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
    ...PASSWORD_INPUT_SETTINGS,
    id: 'password',
    name: 'password',
    label: 'Password',
  },
  {
    ...commonSettings,
    ...PASSWORD_INPUT_SETTINGS,
    id: 'repeat-password',
    name: 'repeat-password',
    label: 'Repeat Password',
  },
];
