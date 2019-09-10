// libraries
import React, { useState } from 'react';
// types
import { InputComponentProps, InputComponentState, InputValueTypes } from 'types/forms/input';
// utils
import { validateRequired, validateMinLength, validateMaxLength } from 'utils/validation';

const Input = ({
  id, label, name, initialValue, handleChangeCallback, handleValidationCallback, type, isRequired,
  minLength, maxLength,
}: InputComponentProps) => {
  const [validation, setValidation] = useState<InputComponentState>({
    isValid: true,
    errorMessage: '',
  });

  const [value, setValues] = useState(initialValue);

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

  const handleBlur = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    const validationResult = validate(val);

    setValidation({
      isValid: !validationResult,
      errorMessage: validationResult,
    });

    if (handleValidationCallback) {
      handleValidationCallback(val);
    }
  };

  const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value);

    if (handleChangeCallback) {
      handleChangeCallback(event.target.value);
    }
  };

  let labelMessage = label;

  if (!validation.isValid) {
    labelMessage = `${label} ${validation.errorMessage}.`;
  }

  return (
    <div className="form-control">
      <label
        className="form-control-label"
        htmlFor={id}
      >
        {labelMessage}
      </label>

      <input
        className="form-field"
        id={id}
        name={name}
        onBlur={handleBlur()}
        onChange={handleChange()}
        type={type || 'text'}
        value={value}
      />
    </div>
  );
};

export default Input;
