const myApiKey = 'bfF_zzUFmQX9mksRil15wBibzlNnOvWY'


export const getGroupedDaily = (date) => (
  $.ajax({
    url: `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${date}`,
    method: 'GET',
    data: {
      apiKey: myApiKey,
    }
  })
)




export const getAllStocks = (ticker, page = 1, perpage=50) => {
  return $.ajax({
    url: 'https://api.polygon.io/v2/reference/tickers',
    method: 'GET',
    data: {
      locale: 'us',
      search: ticker,
      sort: 'ticker',
      perpage,
      apiKey: myApiKey,
      page
    },
  }).then(payload => {
    console.log(payload.tickers)
  
  
  })
}