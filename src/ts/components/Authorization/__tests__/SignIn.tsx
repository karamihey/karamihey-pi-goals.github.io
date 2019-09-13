// libraries
import React from 'react';
import { shallow } from 'enzyme';
// components
import SignIn from 'components/Authorization';

it('renders without crashing', () => {
  shallow(<SignIn />);
});
