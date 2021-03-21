import React from 'react';
import { Link } from 'react-router-dom';
import UserInfo from './account_components/00_user';
import PrinceJohnGold from './account_components/01_princejohn_gold';
import FreeStocks from './account_components/02_free_stock';
import AccountDrop from './account_components/03_account';
import Banking from './account_components/04_banking';
import Recurring from './account_components/05_recurring';
import History from './account_components/06_history';
import Documents from './account_components/07_documents';
import Settings from './account_components/08_settings';
import HelpCenter from './account_components/09_help_center';
import ContactUs from './account_components/10_contact_us';
import Disclosures from './account_components/11_disclosures';
import Signout from './account_components/12_signout';




class Account extends React.Component {
  constructor(props) {
    super(props);
    this.dropDownClick = this.dropDownClick.bind(this);
  }

  dropDownClick(e) {
    // debugger
    Array.from(document.getElementsByClassName('drop-down-show')).forEach(element => {
      if (e.target.nextElementSibling !== element) {
        element.classList.remove('drop-down-show')
      }
    });
  
    e.target.nextElementSibling.classList.toggle('drop-down-show')
  }




  render() {
    const { currentUser, signout } = this.props

    return (
      <div className="dropdown">
        <span onClick={this.dropDownClick}>
          Account
        </span>

        <div className="dropdown-content">
          <UserInfo currentUser={currentUser}/>
          <PrinceJohnGold/>
          <FreeStocks/>
          <AccountDrop />
          <Banking/>
          <Recurring/>
          <History/>
          <Documents/>
          <Settings/>
          <HelpCenter/>
          <ContactUs/>
          <Disclosures/>
          <Signout signout={signout}/>
        </div>
      </div>
    )
  }
}

export default Account;