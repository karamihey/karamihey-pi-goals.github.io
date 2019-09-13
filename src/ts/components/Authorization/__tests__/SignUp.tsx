// libraries
import React from 'react';
import { shallow } from 'enzyme';
// components
import SignUp from 'components/Authorization';

it('renders without crashing', () => {
  shallow(<SignUp />);
});
