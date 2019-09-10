// libraries
import React, { useEffect, createRef } from 'react';
// types
import { FormSettingsType } from 'types/forms';
import { InputComponentType, InputComponentProps } from 'types/forms/input';
// components
import Input from 'components/shared/Input';

const formSettings: FormSettingsType = [
  {
    id: 'email',
    name: 'email',
    label: 'E-mail',
    type: 'email',
    isRequired: true,
  },
  {
    id: 'password',
    name: 'password',
    label: 'Password',
    type: 'password',
    isRequired: true,
    maxLength: 16,
    minLength: 8,
  },
  {
    id: 'repeat-password',
    name: 'repeat-password',
    label: 'Repeat Password',
    type: 'password',
    isRequired: true,
    maxLength: 16,
    minLength: 8,
  },
];

const refs: { [key: string]: InputComponentType; } = {};

const SignUp = () => {
  useEffect(() => {
    formSettings.forEach((elem: InputComponentProps) => {
      if (!refs[elem.id]) {
        refs[elem.id] = createRef<typeof Input>();
      }
    });
  });

  return (
    <div className="form-container">
      <div className="title">Sign Up</div>
      <form noValidate>
        {(formSettings).map((elem: InputComponentProps) => (
          <Input
            key={elem.id}
            ref={refs[elem.id]}
            id={elem.id}
            isRequired={elem.isRequired}
            label={elem.label}
            maxLength={elem.maxLength}
            minLength={elem.minLength}
            name={elem.name}
            type={elem.type}
          />
        ))}
      </form>

      <button className="button" type="submit">Sign Up</button>
    </div>
  );
};

export default SignUp;
