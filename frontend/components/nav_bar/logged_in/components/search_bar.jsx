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

  // componentWillUnmount(){
  //   document.removeEventListener('mousedown', this.toggleDropDown)
  // }


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

    if (e.target.classList.contains('search-component')) {
      if (e.target.value !== '') {
        searchElement.nextElementSibling.classList.add('search-show')
        searchElement.nextElementSibling.classList.remove('search-content')
      }
    } else {
      this.closeDropDown();
    }
  }

  closeDropDown() {
    let searchElement = document.getElementsByClassName('search-bar')[0]
    searchElement.nextElementSibling.classList.remove('search-show')
    searchElement.nextElementSibling.classList.add('search-content')
  }





  render() {
    return (
      <div className="search-bar-div search-component">

        <div className="search-bar-icon search-component">
          {searchBarIcon}
        </div>
        <input type="text" className="search-bar search-component"
          placeholder="Search" onChange={this.updateSearch} />



        <div className='search-content search-component'>
          <div className='search-show-header search-component'>Stocks</div>
          <div className='search-show-results search-component'>


            {searchFunction(this.state.searching).map((el, idx) => {
              return (
                <Link to={`/stocks/${Object.keys(el)[0]}`} onClick={() => {setTimeout(this.closeDropDown(), 10)}}key={idx} className='search-result-line-outer search-component'>
                  <div className='search-result-line search-component'>
                    <div className='search-component'>
                      {Object.keys(el)[0]}
                    </div>
                    <div className="search-result-name search-component">
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