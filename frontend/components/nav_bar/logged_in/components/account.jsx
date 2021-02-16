import React from 'react';


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
    return (
      <div className="dropdown">
        <span onClick={this.dropDownClick}>
          Account
        </span>

        <div className="dropdown-content">
          
          <p>Free Stock</p>
          <p>Account</p>
          <p>History</p>
          <p onClick={this.props.signout}>Log Out</p>

        </div>
      </div>
    )
  }
}

export default Account;