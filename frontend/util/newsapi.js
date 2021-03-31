const axios = require('axios');

const getGeneralNews = (callBackFunc=console.log) => {
  return axios.get('https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=uNS4n69yrCa7KWhTetHlla46DXTZkVg2')
  .then(({data: {results}}) => callBackFunc(results))
}



export default getGeneralNews;

