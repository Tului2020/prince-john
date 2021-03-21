const axios = require('axios')
const apiKeys = {
	key1: 'PMC6363GDICNKO59',
	key2: 'OQFH5RW80HB6ZGYT',
	key3: 'YP9AGVNZ920LSPDV',
	key4: 'YP9AGVNZ920LSPDV'}



const getIntraDay = (symbol, keyNum=1) => {
	if (keyNum > Object.keys(apiKeys).length) return
	return axios.get('https://www.alphavantage.co/query',
		{
			params: {
				function: 'TIME_SERIES_INTRADAY',
				symbol,
				interval: '5min',
				apikey: apiKeys[`key${keyNum}`],
				datatype: 'csv'
			}
		})
		// .then(({ data }) => {
		// 	callBackFunc(data)
		// })
		// .catch(err => {
		// 	console.log('Max reached')
		// 	return getIntraDay(symbol, keyNum+1)(callBackFunc)
			
		// })
}

export default getIntraDay;



