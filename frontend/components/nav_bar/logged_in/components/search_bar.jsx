import React from 'react';
import { searchBarIcon } from './searchbar_components/search_bar_icon';
import searchFunction from './searchbar_components/search_function';
import { Link } from 'react-router-dom';


class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 'searching': '' }
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount(){
    document.addEventListener('mousedown', this.toggleDropDown)
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.toggleDropDown)
  }


  updateSearch(e) {
    if (e.target.value === '') {
      e.target.nextElementSibling.classList.remove('search-show')
      e.target.nextElementSibling.classList.add('search-content')
    } else {
      e.target.nextElementSibling.classList.add('search-show')
      e.target.nextElementSibling.classList.remove('search-content')
    }
    this.setState({ searching: e.target.value })
  }

  toggleDropDown(e) {
    let searchElement = document.getElementsByClassName('search-bar')[0]

    if (searchElement === e.target) {
      // debugger
      if (e.target.value !== '') {
        e.target.nextElementSibling.classList.add('search-show')
        e.target.nextElementSibling.classList.remove('search-content')
      }
    } else {
      searchElement.nextElementSibling.classList.remove('search-show')
      searchElement.nextElementSibling.classList.add('search-content')
      
      // debugger
    }
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
          <div className='search-show-header'>Stocks</div>
          <div className='search-show-results'>


            {searchFunction(this.state.searching).map((el, idx) => {
              return (
                <Link to={`/stocks/${Object.keys(el)[0]}`} key={idx} className='search-result-line-outer'>
                  <div className='search-result-line'>
                    <div>
                      {Object.keys(el)[0]}
                    </div>
                    <div className="search-result-name">
                      {(Object.values(el)[0].length > 17) ? (Object.values(el)[0].slice(0, 17) + '..') : (Object.values(el)[0])}
                    </div>

                  </div>
                </Link>
              )
            })}
          </div>

        </div>

      </div>
    )
  }
}

export default SearchBar;