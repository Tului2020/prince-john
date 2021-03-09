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
      // debugger
      e.target.nextElementSibling.classList.remove('search-show')
      e.target.nextElementSibling.classList.add('search-content')
    } else {
      e.target.nextElementSibling.classList.add('search-show')
      e.target.nextElementSibling.classList.remove('search-content')
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





        <div className='search-content'>
          {searchFunction(this.state.searching).slice(0, 20).map((el, idx) => {
            return (
              <div key={idx} className='search-results'>{Object.keys(el)[0]}</div>
            )
          })}
        </div>

      </div>
    )
  }
}

export default SearchBar;