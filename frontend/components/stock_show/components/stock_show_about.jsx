import React from 'react';
import { connect } from 'react-redux';
import { getCompanyInfoThunk, deleteCompanyInfoThunk } from '../../../actions/companyinfo_action';




class StockShowAbout extends React.Component {
  constructor(props) {
    super(props)
    this.lastRequested = ''
    // this.state = { ceo: '', employees: '', description: '', marketcap: 0, hq_country: '', hq_state: '', industry: '', sector: '', name: ''}
    this.requestedInfo = ''
    // this.processCompanyInfo = this.processCompanyInfo.bind(this)
    this.props.getCompanyInfo(this.props.ticker)
    this.requestedInfo = this.props.ticker
  }

  componentDidUpdate() {
    if (this.requestedInfo === this.props.ticker) return
    this.props.deleteCompanyInfo()
    this.props.getCompanyInfo(this.props.ticker)
    this.requestedInfo = this.props.ticker
  }

  // componentWillUpdate() {
  //   this.props.deleteCompanyInfo()
  // }

  



  render() {
    // debugger
    let { ceo, employees, description, marketcap, hq_country, hq_state, industry, sector } = this.props.companyInfo
    ceo = ceo || 'N/A'
    employees = employees || 'N/A'
    description = description || ''
    marketcap = marketcap || 'N/A'
    hq_country = hq_country || 'N/A'
    hq_state = hq_state || 'N/A'
    industry = industry || 'N/A'
    sector = sector || 'N/A'


    let hq_address = `${hq_state}, ${hq_country}`
    if (hq_country === 'N/A' || hq_state === 'N/A') hq_address = 'N/A'


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




  // processCompanyInfo(data) {

  //   let { ceo, employees, description, marketcap, hq_country, hq_state, industry, sector } = data
  //   marketcap = this.moneyConverter(marketcap)

  //   let info = { ceo, employees: numberFormatter(employees), description, marketcap, hq_country, hq_state, industry, sector }
  //   Object.keys(info).forEach(el => {
  //     if (!info[el]) info[el] = 'N/A'
  //   })
    

  //   this.requestedInfo = this.props.ticker
  //   this.setState(info)
  // }


}





const mSTP = ({entities}) => ({
  companyInfo: entities.companyInfo
})

const mDTP = (dispatch) => ({
  getCompanyInfo: (ticker) => dispatch(getCompanyInfoThunk(ticker)),
  deleteCompanyInfo: () => dispatch(deleteCompanyInfoThunk())
})

const StockShowAboutContainer = connect(mSTP, mDTP)(StockShowAbout);
export default StockShowAboutContainer;