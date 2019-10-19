// types
import { FormControlProps } from 'types/forms';

type InputTypes = 'text' | 'email' | 'password';
export type InputValueTypes = string | undefined;

export interface InputComponentProps extends FormControlProps {
  initialValue?: InputValueTypes;
  type?: InputTypes;
}
