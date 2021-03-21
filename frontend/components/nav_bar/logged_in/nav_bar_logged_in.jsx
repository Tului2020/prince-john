import React from 'react';
import Cash from './components/cash';
import FreeStocks from './components/free_stocks';
import LoggedInLogo from './components/logo'
import Portfolio from './components/portfolio';
import SearchBar from './components/search_bar';
import Messages from './components/messages'
import Account from './components/account';
// import { debug } from 'webpack';


class LoggedInNavBar extends React.Component {

  getStockHistory() {
    let { current_stocks, getIntraDayThunk, history } = this.props

    if (current_stocks) {
      console.log(Object.keys(history))
      console.log(Object.keys(current_stocks))
    } 
  }


  render() {
    const { signout, currentUser} = this.props
    this.getStockHistory();

    return (
      <div id="logged-in-nav">
        <LoggedInLogo/>
        <div id="filler"></div>
        <SearchBar/>

        <div id="logged-in-dropdown-list">
          <FreeStocks/>
          <Portfolio/>
          <Cash/>
          <Messages/>
          <Account signout={signout} currentUser={currentUser}/>
        </div>
      </div>
    )  
  }
} 

export default LoggedInNavBar;
