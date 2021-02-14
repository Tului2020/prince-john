import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found">
    <h1>This page is not found</h1>
    <Link to="/">
      Click Here to Go Home!
    </Link>
  </div>
);

export default NotFound;