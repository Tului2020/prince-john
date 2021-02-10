import React from 'react';
import { Route } from 'react-router-dom';
import LoginFormContainer from './sessions/login_form_container';
import SignupFormContainer from './sessions/signup_form_container';
import {AuthRoute} from '../util/route_util'
import NavBarContainer from './nav_bar/nav_bar_container'

const App = () => (
  <div>
    <AuthRoute exact path="/" component={NavBarContainer} />
    <AuthRoute exact path="/login" component={LoginFormContainer} />
    <AuthRoute exact path="/signup" component={SignupFormContainer} />
  </div>
);

export default App;
