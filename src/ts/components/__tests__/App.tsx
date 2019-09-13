// libraries
import React from 'react';
import { shallow } from 'enzyme';
// components
import App from 'components/App';

it('renders without crashing', () => {
  shallow(<App />);
});
