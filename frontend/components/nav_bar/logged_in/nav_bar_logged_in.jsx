import React from 'react';
import Cash from './components/cash';
import FreeStocks from './components/free_stocks';
import LoggedInLogo from './components/logo'
import Portfolio from './components/portfolio';
import SearchBar from './components/search_bar';
import Messages from './components/messages'
import Account from './components/account';



class LoggedInNavBar extends React.Component {
  render() {
    return (
      <div id="logged-in-nav">
        <LoggedInLogo/>
        <SearchBar/>

        <div id="logged-in-dropdown-list">
          <FreeStocks/>
          <Portfolio/>
          <Cash/>
          <Messages/>
          <Account signout={this.props.signout}/>
        </div>
      </div>
    )  
  }
} 

export default LoggedInNavBar;
