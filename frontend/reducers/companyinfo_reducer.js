import { RECEIVE_COMPANY_INFO, DELETE_COMPANY_INFO } from "../actions/companyinfo_action";

let nullState = { ceo: '', employees: '', description: '', marketcap: 0, hq_country: '', hq_state: '', industry: '', sector: '', name: ''}

const companyInfoReducer = (state=nullState, action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_COMPANY_INFO:
      return action.companyInfo
    case DELETE_COMPANY_INFO:
      return nullState
    default:
      return state
  }
}

export default companyInfoReducer;