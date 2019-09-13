// libraries
import React, { useState } from 'react';
// types
import { FormControlSettings, FormControlValueTypes } from 'types/forms';

const useForm = (formSettings: FormControlSettings[] /* callback?: CallbackParamsTypes */) => {
  const initialValuesState: { [key: string]: FormControlValueTypes } = {};
  const initialErrorsState: { [key: string]: boolean } = {};
  const allErrorsVisibleState: { [key: string]: boolean } = {};

  formSettings.forEach(elem => {
    initialValuesState[elem.id] = null;
    initialErrorsState[elem.id] = false;
    allErrorsVisibleState[elem.id] = true;
  });

  const [values, setValues] = useState(initialValuesState);
  const [errorsVisibility, setErrorsVisibility] = useState(initialErrorsState);

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

    setErrorsVisibility(allErrorsVisibleState);

    // setIsSubmitting(true);
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
    values,
    errorsVisibility,
  };
};

export default useForm;
