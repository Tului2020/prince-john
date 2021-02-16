import React from 'react';
import { Link } from 'react-router-dom';

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
    // debugger
    console.log(this.props.currentUser.username)
    return (
      <div className="dropdown">
        <span onClick={this.dropDownClick}>
          Account
        </span>

        <div className="dropdown-content">
          
          <p>{this.props.currentUser.username}</p>
          {/* <input type="text"/> */}
          <Link className="dropdown-content-child" to='/referal'>Free Stock</Link>
          <Link className="dropdown-content-child" to='/referal'>Account</Link>
          <Link className="dropdown-content-child" to='/referal'>History</Link>
          <span className="dropdown-content-child" onClick={this.props.signout}>Log Out</span>

        </div>
      </div>
    )
  }
}

export default Account;