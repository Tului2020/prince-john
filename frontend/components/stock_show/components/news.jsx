import React from 'react';
import { connect } from 'react-redux';
import { getStockNews } from '../../../util/polygon_api';

// getStockNews


class News extends React.Component {
  constructor(props) {
    super(props)
    getStockNews(this.props.ticker, this.processNews)
  }

  render() {
    return (
      <div id='news-div'>
        <div className='stock-show-title bottom-border'>News</div>
      </div>
    )
  }

  processNews(data) {
    debugger
  }



  displayNewsArticle(news) {

  }



}

const mSTP = (state) => ({})

const mDTP = (dispatch) => ({})

const NewsContainer = connect(mSTP, mDTP)(News);
export default NewsContainer;