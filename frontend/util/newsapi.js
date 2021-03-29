const axios = require('axios');

const apiKeys = {
  // key1: '74713eba594a45e1a80088bc78668995',
  key2: '7c1f92b6684a4cbc9a81af00ebee4425',
  key3: 'aea6e8e1d5ec46c59ab66304da74d5d1',
  key1: '13ffcb13c7e7470793810587b3c84cfa'
}

const getGeneralNews = (callBackFunc=console.log) => {
  // const apiKeyToUse = Math.ceil(Math.random() * Object.keys(apiKeys).length)
  // console.log(`getGeneralNews ${apiKeyToUse}`)
  // let apiKey = apiKeys[`key${apiKeyToUse}`]

  // return axios.get(`https://newsapi.org/v2/top-headlines`,
  //   {
  //     params: {
  //       apiKey,
  //       category: 'business',
  //       language: 'en'
  //     }
  //   }
  // )

  

  // return $.ajax({
  //   method: 'get',
  //   url: 'https://newsapi.org/v2/top-headlines',
  //   params: {
  //     apiKey,
  //     category: 'business',
  //     language: 'en'
  //   }
  // })
  // .then(({data: {articles}}) => callBackFunc(articles))
  return axios.get('https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=uNS4n69yrCa7KWhTetHlla46DXTZkVg2')
  .then(({data: {results}}) => callBackFunc(results))
  .catch(err => console.log(err))
}

// getGeneralNews()




export default getGeneralNews;

