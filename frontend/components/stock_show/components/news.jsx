import React from 'react';
import { connect } from 'react-redux';
import { getStockNews } from '../../../util/polygon_api';

// getStockNews


class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data: []}
    this.processNews = this.processNews.bind(this)
    getStockNews(this.props.ticker, this.processNews)
  }

  render() {
    // debugger
    return (
      <div id='news-div'>
        <div className='stock-show-title bottom-border'>News</div>
        {this.state.data.map(news => this.displayNewsArticle(news))}
      </div>
    )
  }

  processNews(data) {
    this.setState({data})
  }



  displayNewsArticle({timestamp, source, summary, title, url, image}) {
    // debugger
    return (
      <div className='news'>
        <div className='news-left'>
          <div className='news-source-time'>{source}{timestamp}</div>
          <div className='news-title'>{title}</div>
          <div className='news-summary'>{summary}</div>
        </div>

        <div className='news-right'>
          <div className='news-image'>
            <img src={image} alt={title}/>
          </div>
        </div>
      </div>
    )
  }



}

const mSTP = (state) => ({})

const mDTP = (dispatch) => ({})

const NewsContainer = connect(mSTP, mDTP)(News);
export default NewsContainer;