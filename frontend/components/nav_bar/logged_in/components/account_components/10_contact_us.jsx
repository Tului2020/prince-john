import React from 'react';
import { Link } from 'react-router-dom';
import { contactUsIcon } from './icons';

class ContactUs extends React.Component {
  render() {
    return (
      <Link className="dropdown-content-child" to='/referal'>
        {contactUsIcon}Contact Us</Link>
    )
  }
}

export default ContactUs;