import React from 'react';


class Messages extends React.Component {

  constructor(props) {
    super(props);
    this.dropDownClick = this.dropDownClick.bind(this);
  }

  dropDownClick(e) {
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
          Messages
        </span>

        <div className="dropdown-content">
          
          <p>msg1</p>
          <p>msg2</p>

        </div>
      </div>
    )
  }
}

export default Messages;