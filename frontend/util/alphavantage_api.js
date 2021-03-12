const axios = require('axios')




const getIntraDay = (symbol) => (callBackFunc) => {
  return axios.get('https://www.alphavantage.co/query',
    {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol,
        interval: '5min',
        // slice: 'year1month1',
        apikey: 'PMC6363GDICNKO59'
      }
    })
    .then(({data}) => callBackFunc(data['Time Series (5min)']))
    // .catch(err => console.log(err))
}


export default getIntraDay;



