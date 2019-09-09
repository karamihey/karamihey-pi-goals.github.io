// libraries
import React from 'react';
// types
import { IProps, IState } from 'components/shared/Input/types';

const Input = ({
  id, label, name, initialValue, handleChangeCallback, handleValidationCallback, type,
}: IProps) => {
  const [validation, setValidation] = React.useState<IState>({
    isValid: true,
    errorMessage: '',
  });

  const [value, setValues] = React.useState(initialValue);

  const handleBlur = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidation({
      isValid: true,
      errorMessage: '',
    });

    if (handleValidationCallback) {
      handleValidationCallback(event.target.value);
    }
  };

  const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value);

    if (handleChangeCallback) {
      handleChangeCallback(event.target.value);
    }
  };

  const labelMessage = (validation.isValid ? label : validation.errorMessage);

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
        value={value || labelMessage}
      />
    </div>
  );
};

export default Input;
