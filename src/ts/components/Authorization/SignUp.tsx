// libraries
import React, { useState, useEffect } from 'react';
// types
import { FormControlSettings } from 'types/forms';
// constants
import { VALIDATION_ERRORS } from 'constants/validation';
import { SIGN_UP_FORM_SETTINGS } from 'constants/forms/signUp';
// hooks
import useForm from 'hooks/forms/useForm';
// api
import { createUser } from 'api/user';
// types
import { NewUser } from 'types/user';

const SignUp = () => {
  const [isSubmitted, setSubmittedStatus] = useState(false);

  const {
    values,
    errorsVisibility,
    handleChange,
    handleBlur,
    handleValidationErrors,
    handleSubmit,
    isSubmitting,
  } = useForm(SIGN_UP_FORM_SETTINGS, isSubmitted);

  const signUpUser = () => {
    const { email, password } = values;

    const userData: NewUser = {
      email: (email && email.toString()) || '',
      password: (password && password.toString()) || '',
    };

    createUser(userData)
      .then(data => {
        console.error('data', data);
      })
      .catch(err => {
        console.error('err', err);
      })
      .finally(() => {
        setSubmittedStatus(true);
      });
  };

  useEffect(() => {
    if (!isSubmitting) {
      return;
    }

    signUpUser();
  }, [isSubmitting]);

  const validateConfirmPassword = () => {
    if (values.password === values.confirmPassword) {
      return false;
    }

    return VALIDATION_ERRORS.confirmPassword;
  };

  return (
    <div className="form-container">
      <div className="title">Sign Up</div>
      <form noValidate onSubmit={handleSubmit}>
        {(SIGN_UP_FORM_SETTINGS).map((field: FormControlSettings) => {
          const FormControl = field.component;

          let { handleValidationCallback } = field;

          if (field.id === 'confirmPassword') {
            handleValidationCallback = validateConfirmPassword;
          }

          return (
            <FormControl
              key={field.id}
              handleBlurCallback={handleBlur}
              handleChangeCallback={handleChange}
              handleValidationCallback={handleValidationCallback}
              handleValidationErrorsCallback={handleValidationErrors}
              id={field.id}
              initialValue={values[field.id]}
              isRequired={field.isRequired}
              label={field.label}
              maxLength={field.maxLength}
              minLength={field.minLength}
              name={field.name}
              shouldErrorsBeVisible={errorsVisibility[field.id]}
              type={field.type}
            />
          );
        })}
      </form>

      <button className="button" onClick={handleSubmit} type="submit">Sign Up</button>
    </div>
  );
};

export default SignUp;
