
const axios = require('axios')

const apiKeys = {
	key1: 'PMC6363GDICNKO59',
	key2: 'OQFH5RW80HB6ZGYT',
	key3: 'YP9AGVNZ920LSPDV',
	key4: 'YP9AGVNZ920LSPDV',
	key5:	'1WTB1A6XI1M58NSR',
	key6: 'RTS7570AGF98Z8J1',
	key7: '9797G28PN807LRPO',
	key8: 'UBIUEDORLPL4ZCAK',
	key9: 'SSA3C3DIPBBVK9QZ',
	key10:'8O3VZSH2CNOEQTR1'}




const getIntraDay = (symbol) => {
	let keyNum = Math.floor(Math.random() * Object.keys(apiKeys).length + 1)
	// console.log(`getIntraDay ${keyNum}`)
	let apiKey = apiKeys[`key${keyNum}`]

	return axios.get('https://www.alphavantage.co/query',
		{
			params: {
				function: 'TIME_SERIES_INTRADAY',
				symbol,
				interval: '5min',
				apikey: apiKey,
				datatype: 'csv'
			}
		})

	}

export default getIntraDay;



