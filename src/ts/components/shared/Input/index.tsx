// libraries
import React, { useState } from 'react';
// types
import { InputComponentProps, InputComponentState } from 'types/forms/input';
// utils
import { validateInput } from 'utils/validation';

const Input = ({
  id, label, name, initialValue, handleChangeCallback, handleValidationCallback, type, isRequired,
  minLength, maxLength,
}: InputComponentProps) => {
  const [validation, setValidation] = useState<InputComponentState>({
    isValid: true,
    errorMessage: '',
  });

  const [value, setValues] = useState(initialValue);

  const handleBlur = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    const validationRules = {
      isRequired,
      minLength,
      maxLength,
      handleValidationCallback,
    };

    const validationResult = validateInput(val, validationRules);

    setValidation({
      isValid: !validationResult,
      errorMessage: validationResult,
    });
  };

  const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value);

    if (handleChangeCallback) {
      handleChangeCallback(id, event.target.value);
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
        value={value || ''}
      />
    </div>
  );
};

export default Input;
