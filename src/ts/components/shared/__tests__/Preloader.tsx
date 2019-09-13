// libraries
import React from 'react';
import { shallow } from 'enzyme';
// components
import Preloader from 'components/shared/Preloader';

it('renders without crashing', () => {
  shallow(<Preloader />);
});
