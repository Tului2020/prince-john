import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './sessions/login_form_container';
import SignupFormContainer from './sessions/signup_form_container';
import {AuthRoute, HomeAuthRoute, ErrorRoute, ProtectedRoute} from '../util/route_util'
import NotFound from './errors/404';
import HomeLoggedOut from './home/logged_out/homeloggedout';
import HomeLoggedIn from './home/logged_in/homeloggedin';
import StockShowContainer from './stock_show/stock_show_container';
import NewsContainer from './stock_show/components/news';




const App = () => (
  <div>
    <Switch>
      <HomeAuthRoute exact path='/' component={HomeLoggedOut} otherComponent={HomeLoggedIn}/>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute path="/stocks/:ticker" component={StockShowContainer} />
      <ProtectedRoute path="/news" component={NewsContainer} />
      <Route exact path='/404' component={NotFound}/>
      <ErrorRoute />
    </Switch>
  </div>
);

export default App;
