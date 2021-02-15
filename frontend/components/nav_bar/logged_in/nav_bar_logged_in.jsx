import React from 'react';
import Cash from './cash';
import FreeStocks from './free_stocks';
import LoggedInLogo from './logo'
import Portfolio from './portfolio';
import SearchBar from './search_bar';
import Messages from './messages'
import Account from './account';


class LoggedInNavBar extends React.Component {
  render() {
    return (
      <div id="logged-in-nav">
        <LoggedInLogo/>
        <SearchBar/>

        
        <div id="logged-in-dropdown">
          <FreeStocks/>
          <Portfolio/>
          <Cash/>
          <Messages/>
          <Account/>
        </div>
        
      </div>
    )  
  }
} 

export default LoggedInNavBar;
