import React from 'react'
import ReactDom from 'react-dom'
import configureStore from './store/store'
import Root from './components/root'
import { updateUserStockInfo } from './actions/stock_actions'
import { getIntraDayThunk } from './actions/history_actions'
import { getCompanyInfo, getStockNews } from './util/polygon_api'
import getGeneralNews from './util/newsapi'
import { addBalance } from './actions/session_actions'
import { deleteCompanyInfoThunk, getCompanyInfoThunk } from './actions/companyinfo_action'
import { createIntraDayDB, getIntraDayFromDB, updateIntraDayDB } from './util/session_api_util'





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
  window.getIntraDayFromDB = getIntraDayFromDB
  window.createIntraDayDB = createIntraDayDB
  window.updateIntraDayDB = updateIntraDayDB
  window.getIntraDayThunk = getIntraDayThunk


  const rootEl = document.getElementById('root');
  ReactDom.render(<Root store={store} />, rootEl)
})