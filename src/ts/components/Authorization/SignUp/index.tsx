// libraries
import React from 'react';
// hooks
import useForm from 'hooks/forms/useForm';
// types
import { FormControlSettings } from 'types/forms';
// components
import Input from 'components/shared/Input';

const formSettings: FormControlSettings[] = [
  {
    component: Input,
    id: 'email',
    name: 'email',
    label: 'E-mail',
    type: 'email',
    isRequired: true,
  },
  {
    component: Input,
    id: 'password',
    name: 'password',
    label: 'Password',
    type: 'password',
    isRequired: true,
    maxLength: 16,
    minLength: 8,
  },
  {
    component: Input,
    id: 'repeat-password',
    name: 'repeat-password',
    label: 'Repeat Password',
    type: 'password',
    isRequired: true,
    maxLength: 16,
    minLength: 8,
  },
];

const SignUp = () => {
  const {
    values,
    /* errors, */
    handleChange,
    handleSubmit,
  } = useForm(formSettings);

  return (
    <div className="form-container">
      <div className="title">Sign Up</div>
      <form noValidate onSubmit={handleSubmit}>
        {(formSettings).map((elem: FormControlSettings) => {
          const FormControl = elem.component;

          return (
            <FormControl
              key={elem.id}
              handleChangeCallback={handleChange}
              id={elem.id}
              initialValue={values[elem.id]}
              isRequired={elem.isRequired}
              label={elem.label}
              maxLength={elem.maxLength}
              minLength={elem.minLength}
              name={elem.name}
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
