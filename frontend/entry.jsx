import React from 'react'
import ReactDom from 'react-dom'
import configureStore from './store/store'
import Root from './components/root'
import { getAllStocks } from './util/polygon_api'
import searchFunction from './components/nav_bar/logged_in/components/searchbar_components/search_function'  //./components/nav_bar/logged_in/components/searchbar_components/search_function'
import getIntraDay from './util/alphavantage_api'



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
  window.dispatch = store.dispatch; 
  window.getAllStocks = getAllStocks;
  window.searchFunction = searchFunction;
  window.getIntraDay = getIntraDay;


  const rootEl = document.getElementById('root');
  ReactDom.render(<Root store={store} />, rootEl)
})