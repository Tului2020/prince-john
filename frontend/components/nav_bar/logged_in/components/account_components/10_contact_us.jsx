import React from 'react';
import { Link } from 'react-router-dom';

class ContactUs extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>Contact Us</Link>
    )
  }
}

export default ContactUs;