// libraries
import React, { useState, useEffect } from 'react';
// types
import { InputComponentProps, InputComponentState, InputValueTypes } from 'types/forms/input';
// constants
import { USER_TYPING_DELAY } from 'constants/forms';
// utils
import { validateMaxLength, validateMinLength, validateRequired } from 'utils/validation';

const useInput = ({
  id, initialValue, isRequired, minLength, maxLength, handleValidationCallback,
  handleChangeCallback, handleBlurCallback,
}: InputComponentProps) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const [value, setValue] = useState<InputValueTypes | undefined>(initialValue);
  const [isValueChanged, setValueChangeStatus] = useState(false);
  const [isEditing, setEditingStatus] = useState(false);
  const [validation, setValidation] = useState<InputComponentState>({
    isValid: true,
    errorMessage: '',
  });

  const validate = (val: InputValueTypes) => {
    let formattedValue = (val && val.toString()) || '';
    formattedValue = formattedValue.trim();

    let validationResult: boolean | string = '';

    if (isRequired) {
      validationResult = validateRequired(formattedValue);
    }

    if (!validationResult && minLength) {
      validationResult = validateMinLength(formattedValue, minLength);
    }

    if (!validationResult && maxLength) {
      validationResult = validateMaxLength(formattedValue, maxLength);
    }

    if (!validationResult && handleValidationCallback && formattedValue) {
      validationResult = handleValidationCallback(formattedValue);
    }

    return validationResult;
  };

  const updateValidationStatus = (val: InputValueTypes) => {
    const validationResult = validate(val);

    setValidation({
      isValid: !validationResult,
      errorMessage: validationResult,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    const val = event.target.value;
    setValue(val);
    setValueChangeStatus(true);

    if (handleChangeCallback) {
      handleChangeCallback(id, val);
    }

    timeout = setTimeout(() => {
      updateValidationStatus(val);
    }, USER_TYPING_DELAY);
  };

  const handleFocus = () => {
    setEditingStatus(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setEditingStatus(false);
    updateValidationStatus(event.target.value);

    if (handleBlurCallback) {
      handleBlurCallback(id);
    }
  };

  useEffect(() => {
    if (isValueChanged || (initialValue && value && initialValue === value)) {
      return;
    }

    const val = initialValue || null;

    setValue(val);
    updateValidationStatus(val);
  }, [initialValue]);

  return {
    value,
    validation,
    isEditing,
    handleChange,
    handleFocus,
    handleBlur,
  };
};

export default useInput;
