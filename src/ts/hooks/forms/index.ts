// libraries
import React, { useState, useEffect } from 'react';
// types
import {
  FormValuesType, FormErrorsType, FormSettingsType, FormControlSettingsType, FormControlValueTypes,
  FormControlValidationResultTypes,
} from 'types/forms';
// utils
import { validateInput } from 'utils/validation';

const initialValuesState: FormValuesType = {};
const initialErrorsState: FormErrorsType = {};

const prepareInitialState = (settings: FormSettingsType) => {
  Object.keys(settings).forEach(key => {
    initialValuesState[key] = '';
    initialErrorsState[key] = '';
  });
};

const useForm = (formSettings: FormSettingsType, isSubmitted: boolean) => {
  prepareInitialState(formSettings);

  const [values, setValues] = useState(initialValuesState);
  const [errors, setErrors] = useState(initialErrorsState);
  const [isSubmitting, setSubmittingStatus] = useState(false);

  useEffect(() => {
    if (!isSubmitted) {
      return;
    }

    setSubmittingStatus(false);
  }, [isSubmitted]);

  const validateField = (id: string, {
    isRequired, minLength, maxLength, handleValidationCallback,
  }: FormControlSettingsType) => {
    const validationParams = {
      isRequired,
      minLength,
      maxLength,
      handleValidationCallback,
    };

    const validationResult = validateInput(values[id], validationParams);

    const errorMessage = (validationResult && `${validationResult}.`) || '';

    setErrors(prevErrors => ({
      ...prevErrors,
      [id]: errorMessage,
    }));

    return validationResult;
  };

  const handleValidation = (id: string) => {
    const fieldKey = Object.keys(formSettings).find(key => key === id);

    if (!fieldKey || !formSettings[fieldKey]) {
      return false;
    }

    return validateField(fieldKey, formSettings[fieldKey]);
  };

  const validate = () => {
    let result: FormControlValidationResultTypes = true;

    Object.keys(formSettings).forEach(key => {
      result = !validateField(key, formSettings[key]) && result;
    });

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
  };

  const handleChange = (id: string, value: FormControlValueTypes) => {
    setValues({
      ...values,
      [id]: value,
    });

    setErrors({
      ...errors,
      [id]: '',
    });
  };

  return {
    handleChange,
    handleSubmit,
    handleValidation,
    values,
    errors,
    isSubmitting,
  };
};

export default useForm;
