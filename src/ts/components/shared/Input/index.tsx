// libraries
import React from 'react';
// types
import { InputComponentProps } from 'types/forms/input';
// hooks
import useInput from 'hooks/forms/input';

const Input = (props: InputComponentProps) => {
  const {
    id, label, name, type, errorText,
  } = props;

  const {
    value, isFieldFilled, isEditing, handleChange, handleFocus, handleBlur,
  } = useInput(props);

  const labelClassName = `${(isEditing || isFieldFilled) ? 'is-shifted' : ''}`;

  return (
    <div className="form-control">
      <label
        className={`form-control-label ${labelClassName}`}
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

      {(errorText && (
        <div className="form-control-error">
          {errorText}
        </div>
      ))}
    </div>
  );
};

export default Input;
