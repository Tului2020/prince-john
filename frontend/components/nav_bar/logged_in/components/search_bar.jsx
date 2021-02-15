import React from 'react';


class SearchBar extends React.Component {
  render() {
    return (
      <div >
        <input className="search-bar" type="text"
          placeholder="Search"/>
      </div>
    )
  }
}

export default SearchBar;