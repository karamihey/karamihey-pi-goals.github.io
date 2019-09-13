// libraries
import React, { useEffect, useState } from 'react';
// types
import { FormControlSettings } from 'types/forms';
// constants
import { SIGN_UP_FORM_SETTINGS } from 'constants/forms/signUp';
// hooks
import useForm from 'hooks/forms/useForm';
// api
import { getUser } from 'api/user';

const SignUp = () => {
  const [user, setUser] = useState<{[key: string]: any}>({});
  const [isUserInfoLoaded, setLoadingStatus] = useState(false);

  const getUserData = () => {
    getUser(1)
      .then(data => {
        setUser(data);
        setLoadingStatus(false);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (isUserInfoLoaded) {
      return;
    }

    getUserData();
  }, [isUserInfoLoaded]);

  const {
    values,
    errorsVisibility,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(SIGN_UP_FORM_SETTINGS);

  const validateConfirmPassword = () => {
    if (values.password === values.repeatPassword) {
      return false;
    }

    return 'do not match';
  };

  return (
    <div className="form-container">
      <div className="title">Sign Up</div>
      <form noValidate onSubmit={handleSubmit}>
        {(SIGN_UP_FORM_SETTINGS).map((field: FormControlSettings) => {
          const FormControl = field.component;

          let { handleValidationCallback } = field;

          if (field.id === 'repeat-password') {
            handleValidationCallback = validateConfirmPassword;
          }

          return (
            <FormControl
              key={field.id}
              handleBlurCallback={handleBlur}
              handleChangeCallback={handleChange}
              handleValidationCallback={handleValidationCallback}
              id={field.id}
              initialValue={values[field.id] || user.name}
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
