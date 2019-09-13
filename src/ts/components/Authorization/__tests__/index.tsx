// libraries
import React from 'react';
import { shallow } from 'enzyme';
// components
import Authorization from 'components/Authorization';

it('renders without crashing', () => {
  shallow(<Authorization />);
});
