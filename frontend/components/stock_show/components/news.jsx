import React from 'react';
import { connect } from 'react-redux';
import getGeneralNews from '../../../util/newsapi';
import { getStockNews } from '../../../util/polygon_api';



class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }
    this.lastRequested = ''
    this.processNews = this.processNews.bind(this)
    this.dateNow = new Date()
    this.getNews();
  }

  render() {
    let { ticker } = this.props
    
    if (!ticker) {
      return (
        <div id='news-div'>
          <div className='stock-show-title bottom-border'>News</div>
          {this.state.data.map((news, idx) => {
            let newsInfo = {};
            //timestamp, source, summary, title, url, image
            newsInfo.timestamp = news.publishedAt;
            newsInfo.source = news.source.name;
            newsInfo.summary = news.content;
            newsInfo.title = news.description;
            newsInfo.url = news.url;
            newsInfo.image = news.urlToImage;

            return this.displayNewsArticle(newsInfo, idx)
          })}
        </div>
      )
    } else {
      return (
        <div id='news-div'>
          <div className='stock-show-title bottom-border'>News</div>
          {this.state.data.map((news, idx) => this.displayNewsArticle(news, idx))}
        </div>
      )
    }
  }

  getNews() {
    let { ticker } = this.props
    if (!ticker) {
      if (this.lastRequested !== 'General') {
        getGeneralNews(this.processNews)
        this.lastRequested = 'General'
      }
    }
    else {
      if (this.lastRequested !== ticker) {
        getStockNews(ticker, this.processNews)
        this.lastRequested = ticker
      }
    }
  }


  componentDidUpdate() {
    this.getNews()
  }

  processNews(data) {
    this.setState({ data })
  }

  hoursSince(postedDate) {
    let secondsSince = (this.dateNow - new Date(postedDate)) / 1000;
    let hoursSince = secondsSince / 3600;
    let daysSince = hoursSince / 24;
    let monthsSince = daysSince / 30;

    
    if (hoursSince <= 24) {
      return Math.round(hoursSince) + 'h'
    } else if  (daysSince <= 30) {
      return Math.round(daysSince) + 'd'
    } else if (monthsSince <= 12) {
      return Math.round(daysSince) + 'm'
    } else {
      return Math.round(monthsSince / 12) + 'y'
    }

  }




  displayNewsArticle({ timestamp, source, summary, title, url, image }, idx) {
    // console.log(summary)
    // debugger
    return (
      <a href={url} className='news bottom-border' key={idx}>
        <div className='news-left'>
          <div className='news-source-time'>
            <div className='news-source'>{source}</div>
            <div className='news-time'>{this.hoursSince(timestamp)}</div>
          </div>

          <div className='news-title'>{title.slice(0, 100)}</div>
          <div className='news-summary'>{summary.slice(0, 200) + '...'}</div>
        </div>

        <div className='news-right'>
          <div className='news-image-div'>
            <img className='news-image' src={image} alt={title} />
          </div>
        </div>
      </a>
    )
  }



}

const mSTP = (state) => ({})

const mDTP = (dispatch) => ({})

const NewsContainer = connect(mSTP, mDTP)(News);
export default NewsContainer;