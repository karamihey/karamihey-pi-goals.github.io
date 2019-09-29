// libraries
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// constants
import ROUTES from 'constants/routes';
// components
import SignIn from 'components/Authorization/SignIn';
import SignUp from 'components/Authorization/SignUp';

const Authorization = () => (
  <div className="authorization-pages">
    <Switch>
      <Route component={SignIn} exact path={ROUTES.signIn} />
      <Route component={SignUp} exact path={ROUTES.signUp} />

      <Redirect to={ROUTES.signIn} />
    </Switch>
  </div>
);

export default Authorization;
