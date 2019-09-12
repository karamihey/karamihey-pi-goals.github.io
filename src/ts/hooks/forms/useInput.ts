// libraries
import React, { useState, useEffect } from 'react';
// types
import { InputComponentProps, InputComponentState, InputValueTypes } from 'types/forms/input';
// utils
import { validateMaxLength, validateMinLength, validateRequired } from 'utils/validation';

const useInput = ({
  id, initialValue, isRequired, minLength, maxLength, handleValidationCallback,
  handleChangeCallback, handleBlurCallback,
}: InputComponentProps) => {
  const [value, setValues] = useState<InputValueTypes | undefined>(initialValue);
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

  const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setValues(val);
    updateValidationStatus(val);

    if (handleChangeCallback) {
      handleChangeCallback(id, event.target.value);
    }
  };

  const handleBlur = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    updateValidationStatus(event.target.value);

    if (handleBlurCallback) {
      handleBlurCallback(id);
    }
  };

  useEffect(() => {
    if (initialValue && value && initialValue === value) {
      return;
    }

    console.error(initialValue, value, initialValue === value);
    const val = initialValue || null;

    updateValidationStatus(val);
  }, [initialValue]); // Only re-run the effect if count changes

  return {
    value,
    validation,
    handleChange,
    handleBlur,
  };
};

export default useInput;
