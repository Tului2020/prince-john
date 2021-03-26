import React from 'react';
import { connect } from 'react-redux';
import { getCompanyInfo } from '../../../util/polygon_api';

class StockShowAbout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {ceo: '', employees: '', description: '', marketcap: 0, hq_address: '', industry: '', sector: '', name:'', requestedInfo: false}
    this.processCompanyInfo = this.processCompanyInfo.bind(this)
    getCompanyInfo(this.props.ticker, this.processCompanyInfo)
  }

  render() {
    let { ceo, employees, description, marketcap, hq_address, industry, sector, name } = this.state
    return (
    <div id='company-info'>
      <div id='company-info-about' className='bottom-border'>About</div>
      <div id='compay-info-description'>{description}</div>

      <div id='company-short-info'>
        <div id='compay-info-name'>Name: {name}</div>
        <div id='compay-info-ceo'>CEO: {ceo}</div>
        <div id='compay-info-employees'>Number of Employyes: {employees}</div>
        <div id='compay-info-marketcap'>MarketCap: {marketcap}</div>
        <div id='compay-info-hq_address'>Address: {hq_address}</div>
        <div id='compay-info-industry'>Industry: {industry}</div>
        <div id='compay-info-sector'>Sector: {sector}</div>
      </div>
    </div>
    
    )
  }



  processCompanyInfo(data) {
    if (this.state.requestedInfo) return
    let { ceo, employees, description, marketcap, hq_address, industry, sector, name } = data
    this.setState({ ceo, employees, description, marketcap, hq_address, industry, sector, name, requestedInfo: true})
  }

 
}





const mSTP = (state) => ({})

const mDTP = (dispatch) => ({})

const StockShowAboutContainer = connect(mSTP, mDTP)(StockShowAbout);
export default StockShowAboutContainer;