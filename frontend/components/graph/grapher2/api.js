const getIntraDay = (symbol) => (callBackFunc) => {
  return axios.get('https://www.alphavantage.co/query',
    {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol,
        interval: '5min',
        apikey: 'PMC6363GDICNKO59',
        datatype: 'csv'
      }
    })
    .then(({data}) => {
			debugger
      callBackFunc(JSON.stringify(data))})
}



// getIntraDay('TSLA')(console.log)



