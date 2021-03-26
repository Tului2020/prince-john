const axios = require('axios');
const apiKey = 'bfF_zzUFmQX9mksRil15wBibzlNnOvWY';

export const getCompanyInfo = (ticker, callBackFunc) => {
  return axios.get(`https://api.polygon.io/v1/meta/symbols/${ticker}/company`,
    {
      params: {
        apiKey: 'bfF_zzUFmQX9mksRil15wBibzlNnOvWY'
      }
    }
  )
  .then(({data}) => callBackFunc(data))
}




export const getStockNews = (ticker, callBackFunc, perpage = 20, page=1) => {
  return axios.get(`https://api.polygon.io/v1/meta/symbols/${ticker}/news`,
    {
      params: {
        perpage,
        page,
        apiKey: 'bfF_zzUFmQX9mksRil15wBibzlNnOvWY',
      }
    }
  ).then(({data}) => {
    callBackFunc(data)
  })
  .catch(err => console.log(err))
}

// getStockNews('AAPL')

