const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('74713eba594a45e1a80088bc78668995');


newsapi.v2.topHeadlines({
  // sources: 'bbc-news,the-verge',
  q: 'TSLA',
  // category: 'business',
  language: 'en',
  // country: 'us'
}).then(response => {
  console.log(response.articles);
  debugger
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
}).catch(err => console.log(err))