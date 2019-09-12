// libraries
import React from 'react';
// hooks
import useInput from 'hooks/forms/useInput';
// types
import { InputComponentProps } from 'types/forms/input';

const Input = (props: InputComponentProps) => {
  const {
    id, label, name, type, shouldErrorsBeVisible,
  } = props;

  const {
    value, validation, handleChange, handleBlur,
  } = useInput(props);

  let labelMessage = label;

  if (shouldErrorsBeVisible && !validation.isValid) {
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
