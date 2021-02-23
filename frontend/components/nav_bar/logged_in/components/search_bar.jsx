import React from 'react';
import { searchBarIcon } from './searchbar_components/search_bar_icon';
import searchIngredient from './searchbar_components/search'


class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = { searching: ''}
  }

  updateSearch() {
    return (e) => {
      this.setState({ searching: e.target.value })
    }
  }



  render() {
    return (
      <div className="search-bar-div">
        <div className="search-bar-icon">
          {searchBarIcon}
        </div>

          <input type="text" className="search-bar"
            placeholder="Search"
            onChange={this.updateSearch()}/>
        <div>
          {searchIngredient(this.state.searching).map(el => {
            return (
              <div>{el}</div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default SearchBar;