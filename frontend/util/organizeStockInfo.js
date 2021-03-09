const fs = require('fs')
const relativePath = (page) => `frontend/util/stock_info/stock_info_${page}.js`

const writeToFile = data => {
    fs.writeFile(`frontend/util/allStocks.js`, `export default bigData = ${JSON.stringify(data, null, 2)}`, "utf8", function (error, data) {
      if (error) console.log(error);
    });
  }



let bigData = {}

for (let i=1; i <= 790; i++){
    const data = JSON.parse(fs.readFileSync(relativePath(i), 'utf8'))
    data.forEach(({ticker, name}) => {
        bigData[ticker] = name
    })
}

writeToFile(bigData);