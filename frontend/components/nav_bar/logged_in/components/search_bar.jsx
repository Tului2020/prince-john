import React from 'react';
import { searchBarIcon } from './searchbar_components/search_bar_icon';
import searchFunction from './searchbar_components/search_function';



class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 'searching': '' }
    this.updateSearch = this.updateSearch.bind(this);
  }


  updateSearch(e) {
    if (e.target.value === '') {
      e.target.nextElementSibling.classList.add('hide')
    } else {
      e.target.nextElementSibling.classList.remove('hide')
    }
    this.setState({ searching: e.target.value })
  }


  render() {
    return (
      <div className="search-bar-div">
        <div className="search-bar-icon">
          {searchBarIcon}
        </div>

        <input type="text" className="search-bar"
          placeholder="Search" onChange={this.updateSearch} />


        <div className='search-values hide'>
          {/* {Object.keys(searchFunction(this.state.searching)[0])[0]} */}
          {searchFunction(this.state.searching).slice(0, 20).map((el, idx) => {
            return (

              <div className='search-results'>{Object.keys(el)[0]}</div>

            )

          })}


        </div>
        {/* {searchFunction(this.state.searching)[0]} */}
      </div>
    )
  }
}

export default SearchBar;