import React from 'react'
import ReactDom from 'react-dom'
import configureStore from './store/store'
import Root from './components/root'
import { deleteErrors, RECEIVE_CURRENT_USER, signout } from './actions/session_actions'



document.addEventListener('DOMContentLoaded', () => {
  let store; 

  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser}
      },
      session: { currentUserId: window.currentUser.id}
    };
    store = configureStore(preloadedState)
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  
  window.RECEIVE_CURRENT_USER = RECEIVE_CURRENT_USER;
  window.getState = store.getState;
  window.dispatch = store.dispatch; 
  window.removeErrors = deleteErrors;
  window.signout = signout;


  const rootEl = document.getElementById('root');
  ReactDom.render(<Root store={store} />, rootEl)
})
