// libraries
import React, { useState, useEffect } from 'react';
// types
import { InputComponentProps, InputComponentState, InputValueTypes } from 'types/forms/input';
// utils
import { validateMaxLength, validateMinLength, validateRequired } from 'utils/validation';

const useInput = ({
  id, initialValue, isRequired, minLength, maxLength, handleValidationCallback,
  handleChangeCallback, handleBlurCallback, handleValidationErrorsCallback,
}: InputComponentProps) => {
  const [value, setValue] = useState<InputValueTypes>(initialValue);
  const [isValueChanged, setValueChangeStatus] = useState(false);
  const [isEditing, setEditingStatus] = useState(false);
  const [validation, setValidation] = useState<InputComponentState>({
    isValid: true,
    errorMessage: '',
  });

  const validate = () => {
    let formattedValue = (value && value.toString()) || '';
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

    handleValidationErrorsCallback(id, validationResult);

    return validationResult;
  };

  const updateValidationStatus = () => {
    const validationResult = validate();

    setValidation({
      isValid: !validationResult,
      errorMessage: validationResult,
    });

    handleValidationErrorsCallback(id, validationResult);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setValue(val);
    setValueChangeStatus(true);

    if (handleChangeCallback) {
      handleChangeCallback(id, val);
    }

    updateValidationStatus();
  };

  const handleFocus = () => {
    setEditingStatus(true);
  };

  const handleBlur = () => {
    setEditingStatus(false);
    updateValidationStatus();

    if (handleBlurCallback) {
      handleBlurCallback(id);
    }
  };

  useEffect(() => {
    if (isValueChanged || (initialValue && value && initialValue === value)) {
      return;
    }

    setValue(initialValue || null);
    updateValidationStatus();
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
