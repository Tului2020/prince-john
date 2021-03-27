const axios = require('axios');
const apiKey = '74713eba594a45e1a80088bc78668995'

const getGeneralNews = (callBackFunc=console.log) => {
  // // debugger
  // return newsapi.v2.topHeadlines({
  //   category: 'business',
  //   language: 'en',
  // }).then(response => {
  //   callBackFunc(response.articles);
  // }).catch(err => console.log(err))
  return axios.get(`https://newsapi.org/v2/top-headlines`,
    {
      params: {
        apiKey,
        category: 'business',
        language: 'en'
      }
    }
  )
  .then(({data: {articles}}) => {
    debugger
    callBackFunc(articles)})
  .catch(err => console.log(err))

}

// getGeneralNews();

export default getGeneralNews;

