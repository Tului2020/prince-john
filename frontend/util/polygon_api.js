const axios = require('axios');
const apiKey = 'bfF_zzUFmQX9mksRil15wBibzlNnOvWY';

export const getCompanyInfo = (ticker, callBackFunc=console.log) => {
  return axios.get(`https://api.polygon.io/v1/meta/symbols/${ticker}/company`,
    {
      params: {
        apiKey: 'bfF_zzUFmQX9mksRil15wBibzlNnOvWY'
      }
    }
  )
  .then(({data}) => callBackFunc(data))
  .catch(err => console.log(err))
}




export const getStockNews = (ticker, callBackFunc, page=1, perpage = 5) => {
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

