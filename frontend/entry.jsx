import React from 'react'
import ReactDom from 'react-dom'
import configureStore from './store/store'
import Root from './components/root'
import * as polygon from './util/polygon_api'




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
  

  window.getState = store.getState;
  console.log(getState())

  window.dispatch = store.dispatch; 
  window.polygon = polygon;



  const rootEl = document.getElementById('root');
  ReactDom.render(<Root store={store} />, rootEl)
})