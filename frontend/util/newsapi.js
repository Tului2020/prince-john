const axios = require('axios');
const apiKey = '74713eba594a45e1a80088bc78668995'

const getGeneralNews = (callBackFunc=console.log) => {
  return axios.get(`https://newsapi.org/v2/top-headlines`,
    {
      params: {
        apiKey,
        category: 'business',
        language: 'en'
      }
    }
  )
  .then(({data: {articles}}) => callBackFunc(articles))
  .catch(err => console.log(err))

}


export default getGeneralNews;

