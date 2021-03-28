import React from 'react';
import { connect } from 'react-redux';
import { getCompanyInfo } from '../../../util/polygon_api';

class StockShowAbout extends React.Component {
  constructor(props) {
    super(props)
    this.lastRequested = ''
    this.state = { ceo: '', employees: '', description: '', marketcap: 0, hq_country: '', hq_state: '', industry: '', sector: '', name: ''}
    this.requestedInfo = ''
    this.processCompanyInfo = this.processCompanyInfo.bind(this)
    getCompanyInfo(this.props.ticker, this.processCompanyInfo)
    console.log('running constructor')
  }

  componentDidUpdate() {
    if (this.requestedInfo === this.props.ticker) return
    getCompanyInfo(this.props.ticker, this.processCompanyInfo)
    console.log('running componentDidUpdate')
  }

  render() {
    let { ceo, employees, description, marketcap, hq_country, hq_state, industry, sector } = this.state
    let hq_address = `${hq_state}, ${hq_country}`

    return (
      <div id='company-info'>
        <div className='bottom-border stock-show-title'>About</div>
        <div id='compay-info-description'>{description}</div>

        <div id='company-short-info'>
          {/* <div id='compay-info-name'><div>Name</div><div>{name}</div></div> */}
          <div id='compay-info-ceo'><div className='bottom-padding'>CEO</div><div>{ceo}</div></div>
          <div id='compay-info-employees'><div className='bottom-padding'>Number of Employees</div><div>{employees}</div></div>
          <div id='compay-info-marketcap'><div className='bottom-padding'>Market Cap</div><div>{marketcap}</div></div>

          <div id='compay-info-hq_address'><div className='bottom-padding'>Address</div><div>{hq_address}</div></div>
          <div id='compay-info-industry'><div className='bottom-padding'>Industry</div><div>{industry}</div></div>
          <div id='compay-info-sector'><div className='bottom-padding'>Sector</div><div>{sector}</div></div>
        </div>
      </div>

    )
  }


  moneyConverter(labelValue) {
    // Nine Zeroes for Billions
    return Number(labelValue) >= 1.0e9
      ? '$' + ((Number(labelValue)) / 1.0e9).toFixed(1) + "B"
      : // Six Zeroes for Millions
      Math.round(Number(labelValue)) >= 1.0e6
      ? '$' + (Number(labelValue) / 1.0e6).toFixed(1)  + "M"
      : // Three Zeroes for Thousands
      Math.round(Number(labelValue)) >= 1.0e3
      ? '$' + ((Number(labelValue)) / 1.0e3).toFixed(1)  + "K"
      : (Number(labelValue));
  }

  processCompanyInfo(data) {

    let { ceo, employees, description, marketcap, hq_country, hq_state, industry, sector } = data
    marketcap = this.moneyConverter(marketcap)

    let info = { ceo, employees, description, marketcap, hq_country, hq_state, industry, sector }
    Object.keys(info).forEach(el => {
      if (!info[el]) info[el] = 'N/A'
    })
    

    this.requestedInfo = this.props.ticker
    this.setState(info)
  }


}





const mSTP = (state) => ({})

const mDTP = (dispatch) => ({})

const StockShowAboutContainer = connect(mSTP, mDTP)(StockShowAbout);
export default StockShowAboutContainer;