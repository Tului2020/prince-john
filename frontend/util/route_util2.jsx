import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({ component: Component, otherComponent: OtherComponent, path, loggedIn, exact }) => (
  <Route 
    path={path}
    exact={exact}
    render={props => 
      !loggedIn ? <Component {...props} /> : <OtherComponent {...props} />
    }
  />
)

const mSTP = state => ({
  loggedIn: Boolean(state.session.currentUserId)
})

export default HomeAuthRoute = withRouter(
  connect(
    mSTP,
    null
  )(Auth)
)