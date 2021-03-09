import React from 'react';
import { searchBarIcon } from './searchbar_components/search_bar_icon';
import bigData from './../../../../util/allStocks'


class SearchBar extends React.Component {
  render() {
    return (
      <div className="search-bar-div">
        <div className="search-bar-icon">
          {searchBarIcon}
        </div>

          <input type="text" className="search-bar"
            placeholder="Search"/>

      </div>
    )
  }
}

export default SearchBar;