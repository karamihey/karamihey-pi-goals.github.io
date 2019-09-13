// libraries
import React from 'react';
// types
import { FormControlSettings } from 'types/forms';
// constants
import { SIGN_UP_FORM_SETTINGS } from 'constants/forms/signUp';
// hooks
import useForm from 'hooks/forms/useForm';

const SignUp = () => {
  const {
    values,
    errorsVisibility,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(SIGN_UP_FORM_SETTINGS);

  return (
    <div className="form-container">
      <div className="title">Sign Up</div>
      <form noValidate onSubmit={handleSubmit}>
        {(SIGN_UP_FORM_SETTINGS).map((elem: FormControlSettings) => {
          const FormControl = elem.component;

          return (
            <FormControl
              key={elem.id}
              handleBlurCallback={handleBlur}
              handleChangeCallback={handleChange}
              id={elem.id}
              initialValue={values[elem.id]}
              isRequired={elem.isRequired}
              label={elem.label}
              maxLength={elem.maxLength}
              minLength={elem.minLength}
              name={elem.name}
              shouldErrorsBeVisible={errorsVisibility[elem.id]}
              type={elem.type}
            />
          );
        })}
      </form>

      <button className="button" onClick={handleSubmit} type="submit">Sign Up</button>
    </div>
  );
};

export default SignUp;
