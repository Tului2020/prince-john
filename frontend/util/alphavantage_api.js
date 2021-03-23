
const axios = require('axios')

const apiKeys = {
	key1: 'PMC6363GDICNKO59',
	key2: 'OQFH5RW80HB6ZGYT',
	key3: 'YP9AGVNZ920LSPDV',
	key4: 'YP9AGVNZ920LSPDV'}



const getIntraDay = (symbol, keyNum=1) => {
	// if (keyNum > Object.keys(apiKeys).length) return
	console.log('getIntraDay Working')
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
	}

export default getIntraDay;



