// libraries
import React, { useState, useEffect } from 'react';
// types
import { InputComponentProps, InputValueTypes } from 'types/forms/input';
// utils
import { convertToString } from 'utils/converters';

const useInput = ({
  id, initialValue, handleChangeCallback, handleValidation,
}: InputComponentProps) => {
  const [value, setValue] = useState<InputValueTypes>(initialValue);
  const [isValueChanged, setValueChangeStatus] = useState(false);
  const [isEditing, setEditingStatus] = useState(false);

  const isFieldFilled = () => {
    const formattedValue = convertToString(value);

    return formattedValue.trim().length;
  };

  const updateValidationStatus = () => {
    handleValidation(id);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setValue(val);
    setValueChangeStatus(true);

    if (handleChangeCallback) {
      handleChangeCallback(id, val);
    }
  };

  const handleFocus = () => {
    setEditingStatus(true);
  };

  const handleBlur = () => {
    setEditingStatus(false);
    updateValidationStatus();
  };

  useEffect(() => {
    if (isValueChanged || (initialValue && value && initialValue === value)) {
      return;
    }

    setValue(initialValue || '');
  }, [initialValue]);

  return {
    value,
    isFieldFilled: isFieldFilled(),
    isEditing,
    handleChange,
    handleFocus,
    handleBlur,
  };
};

export default useInput;
