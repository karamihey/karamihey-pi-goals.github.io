// libraries
import React from 'react';
import { shallow } from 'enzyme';
// components
import Input from 'components/shared/Input';

const mockInputProps = {
  id: 'test',
  name: 'test',
  label: 'Test',
  shouldErrorsBeVisible: false,
};

it('renders without crashing', () => {
  shallow(<Input
    id={mockInputProps.id}
    label={mockInputProps.label}
    name={mockInputProps.name}
    shouldErrorsBeVisible={mockInputProps.shouldErrorsBeVisible}
  />);
});
