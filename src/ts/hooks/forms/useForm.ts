import React, { useState } from 'react';
// types
import { FormControlSettings, FormControlValueTypes } from 'types/forms';
// utils
import { validateForm } from 'utils/validation';

const useForm = (formSettings: FormControlSettings[] /* callback?: CallbackTypes */) => {
  const initialState: { [key: string]: FormControlValueTypes } = {};

  formSettings.forEach(elem => {
    initialState[elem.id] = '';
  });

  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  // const [isSubmitting, setIsSubmitting] = useState(false);

  /* useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      if (callback) {
        // callback();
      }
    }
  }, [errors]); */

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement | HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    const errorsList = validateForm(values, formSettings);

    setErrors(errorsList);
    // setIsSubmitting(true);
  };

  const handleChange = (id: string, value: FormControlValueTypes) => {
    setValues({
      ...values,
      [id]: value,
    });
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
