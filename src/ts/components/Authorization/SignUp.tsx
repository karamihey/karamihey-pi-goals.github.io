// libraries
import React, { useState, useEffect } from 'react';
// constants
import FORM_VALIDATION_SETTINGS from 'constants/forms/signUp';
// hooks
import useForm from 'hooks/forms';
import useAuth from 'hooks/authorization';
// components
import Input from 'components/shared/Input';
// utils
import { convertToString } from 'utils/converters';

const SignUp = () => {
  const [isSubmitted, setSubmittedStatus] = useState(false);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleValidation,
    isSubmitting,
  } = useForm(FORM_VALIDATION_SETTINGS, isSubmitted);

  const { signUp } = useAuth();

  const signUpUser = () => {
    // TODO: Check convert type is still needed
    const userData = {
      email: convertToString(values.email),
      password: convertToString(values.password),
    };

    signUp(userData)
      .then(() => {
        setSubmittedStatus(true);
      });
  };

  useEffect(() => {
    if (!isSubmitting) {
      return;
    }

    signUpUser();
  }, [isSubmitting]);

  const { email, password, confirmPassword } = FORM_VALIDATION_SETTINGS;

  return (
    <div className="form-container">
      <div className="title">Sign Up</div>
      <form noValidate onSubmit={handleSubmit}>
        <Input
          errorText={errors.email}
          handleChangeCallback={handleChange}
          handleValidation={handleValidation}
          handleValidationCallback={email.handleValidationCallback}
          id="email"
          initialValue={values.email}
          isRequired={email.isRequired}
          label="E-mail"
          name="email"
          type="email"
        />

        <Input
          errorText={errors.password}
          handleChangeCallback={handleChange}
          handleValidation={handleValidation}
          handleValidationCallback={password.handleValidationCallback}
          id="password"
          initialValue={values.password}
          isRequired={password.isRequired}
          label="Password"
          maxLength={password.maxLength}
          minLength={password.minLength}
          name="password"
          type="password"
        />

        <Input
          errorText={errors.confirmPassword}
          handleChangeCallback={handleChange}
          handleValidation={handleValidation}
          // handleValidationCallback={() =>
          // confirmPassword.handleValidationCallback(values.password, values.confirmPassword)}
          id="confirm-password"
          initialValue={values.confirmPassword}
          isRequired={confirmPassword.isRequired}
          label="Confirm Password"
          maxLength={confirmPassword.maxLength}
          minLength={confirmPassword.minLength}
          name="confirm-password"
          type="password"
        />
      </form>

      <button className="button" onClick={handleSubmit} type="submit">Sign Up</button>
    </div>
  );
};

export default SignUp;
