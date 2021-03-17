var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data',
  params: {symbol: 'AMRN', region: 'US'},
  headers: {
    'x-rapidapi-key': '1db19e9c88msh07eed2fefd02252p1a7e4cjsn359eec1083fa',
    'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error('error');
});