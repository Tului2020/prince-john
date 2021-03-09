// const fs = require('fs')
// const axios = require('axios')

// const writeToFile = page => data => {
//   fs.writeFile(`frontend/util/stock_info/stock_info_${page}.js`, `${JSON.stringify(data, null, 2)}`, "utf8", function (error, data) {
//     if (error) console.log(error);
//   });
// }



// const getAllStocks = (page = 1) => {
//   let writer = writeToFile(page)
//   return axios.get('https://api.polygon.io/v2/reference/tickers',
//     {
//       params: {
//         locale: 'us',
//         sort: 'ticker',
//         perpage: 50,
//         apiKey: 'bfF_zzUFmQX9mksRil15wBibzlNnOvWY',
//         page
//       }
//     }
//   ).then(payload => {
//     let tickers = payload.data.tickers;
//     let stockInfo = [];

//     tickers.forEach(({ ticker, name, active }) => {
//       if (active) {
//         stockInfo.push({ ticker, name })
//       }
//     });
//     writer(stockInfo)

//   })
//     .catch(error => { console.log(error) })
// }




// // for (let i = 1; i <= 2; i++) { // 790 is the last one
// //   getAllStocks(i);
// // }





