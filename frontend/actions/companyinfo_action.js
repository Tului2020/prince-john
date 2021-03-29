import { getCompanyInfo } from "../util/polygon_api";


export const RECEIVE_COMPANY_INFO = 'RECEIVE_COMPANY_INFO';
export const DELETE_COMPANY_INFO = 'DELETE_COMPANY_INFO';

function moneyConverter(labelValue) {
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

function numberFormatter(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}





const receiveCompanyInfo = (companyInfo) => ({
  type: RECEIVE_COMPANY_INFO,
  companyInfo
})

const deleteCompanyInfo = () => ({
  type: DELETE_COMPANY_INFO
})


export const getCompanyInfoThunk = ticker => dispatch => (
  getCompanyInfo(ticker)
    .then(({ data: { ceo, employees, description, marketcap, hq_country, hq_state, industry, sector } }) => {
      dispatch(receiveCompanyInfo({ ceo, employees: numberFormatter(employees), description, marketcap: moneyConverter(marketcap), hq_country, hq_state, industry, sector }))
    })
    .catch(err => console.log(err))
)

export const deleteCompanyInfoThunk = () => dispatch => (
  dispatch(deleteCompanyInfo())
)