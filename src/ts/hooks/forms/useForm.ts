// libraries
import React, { useState, useEffect } from 'react';
// types
import { FormControlSettings, FormControlValueTypes, FormControlValidationResultTypes } from 'types/forms';

const useForm = (formSettings: FormControlSettings[], isSubmitted: boolean) => {
  const initialValuesState: { [key: string]: FormControlValueTypes } = {};
  const initialErrorsState: { [key: string]: boolean } = {};
  const initialValidationState: { [key: string]: FormControlValidationResultTypes } = {};
  const allErrorsVisibleState: { [key: string]: boolean } = {};

  formSettings.forEach(elem => {
    initialValuesState[elem.id] = null;
    initialErrorsState[elem.id] = false;
    allErrorsVisibleState[elem.id] = true;
    initialValidationState[elem.id] = true;
  });

  const [values, setValues] = useState(initialValuesState);
  const [errors, setErrors] = useState(initialValidationState);
  const [errorsVisibility, setErrorsVisibility] = useState(initialErrorsState);
  const [isSubmitting, setSubmittingStatus] = useState(false);

  useEffect(() => {
    if (!isSubmitted) {
      return;
    }

    setSubmittingStatus(false);
    console.error('...submitting finished!');
  }, [isSubmitted]);

  const validate = () => {
    let result: FormControlValidationResultTypes = true;

    Object.keys(errors).forEach((key: string) => {
      result = !errors[key] && result;
    });

    setErrorsVisibility(allErrorsVisibleState);

    return result;
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement | HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    if (isSubmitting || !validate()) {
      return;
    }

    setSubmittingStatus(true);

    console.error('...submitting');
  };

  const handleChange = (id: string, value: FormControlValueTypes) => {
    setValues({
      ...values,
      [id]: value,
    });

    setErrorsVisibility({
      ...errorsVisibility,
      [id]: false,
    });
  };

  const handleValidationErrors = (id: string, value: FormControlValidationResultTypes) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [id]: value,
    }));
  };

  const handleBlur = (id: string) => {
    setErrorsVisibility({
      ...errorsVisibility,
      [id]: true,
    });
  };

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    handleValidationErrors,
    values,
    errorsVisibility,
    isSubmitting,
  };
};

export default useForm;
