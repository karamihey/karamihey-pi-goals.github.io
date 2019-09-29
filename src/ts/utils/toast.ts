// libraries
import { toast, Flip } from 'react-toastify';
// types
import { ToastParams, ToastOptions } from 'types/toast';
// constants
import { TOAST_DEFAULT_OPTIONS } from 'constants/toast';

const addToast = ({ text, type }: ToastParams) => {
  const options: ToastOptions = {
    ...TOAST_DEFAULT_OPTIONS,
    transition: Flip,
    type,
  };

  return toast(text, options);
};

export const addSuccessToast = (text: string) => {
  addToast({
    text,
    type: 'success',
  });
};

export const addWarningToast = (text: string) => {
  addToast({
    text,
    type: 'warning',
  });
};

export const addInfoToast = (text: string) => {
  addToast({
    text,
    type: 'info',
  });
};

export const addErrorToast = (text: string) => {
  addToast({
    text,
    type: 'error',
  });
};
