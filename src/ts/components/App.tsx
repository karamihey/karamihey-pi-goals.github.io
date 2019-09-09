// libraries
import React from 'react';
// components
import Preloader from 'components/shared/Preloader';
import Input from 'components/shared/Input';

const App = () => (
  <div className="App">
    <Preloader />

    <Input
      handleChangeCallback={value => {
        console.error('ololo', value);
      }}
      id="email"
      label="E-mail"
      name="email"
    />
  </div>
);

export default App;
