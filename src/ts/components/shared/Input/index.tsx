// libraries
import React from 'react';
// types
import { InputComponentProps } from 'types/forms/input';
// hooks
import useInput from 'hooks/forms/useInput';

const Input = (props: InputComponentProps) => {
  const {
    id, label, name, type, shouldErrorsBeVisible,
  } = props;

  const {
    value, validation, isEditing, handleChange, handleFocus, handleBlur,
  } = useInput(props);

  const formattedValue = (value && value.toString()) || '';
  const isFieldFilled = formattedValue.trim().length;

  return (
    <div className="form-control">
      <label
        className={`form-control-label ${isEditing || isFieldFilled ? 'is-shifted' : ''}`}
        htmlFor={id}
      >
        {label}
      </label>

      <input
        className="form-field"
        id={id}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        type={type || 'text'}
        value={value || ''}
      />

      {(shouldErrorsBeVisible && !validation.isValid && (
        <div className="form-control-error">
          {`${label} ${validation.errorMessage}.`}
        </div>
      ))}
    </div>
  );
};

export default Input;
