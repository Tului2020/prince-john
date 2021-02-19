export const getAllStocks = (ticker, page = 1, perpage=50) => {
  return $.ajax({
    url: 'https://api.polygon.io/v2/reference/tickers',
    method: 'GET',
    data: {
      locale: 'us',
      search: ticker,
      sort: 'ticker',
      perpage,
      apiKey: 'bfF_zzUFmQX9mksRil15wBibzlNnOvWY',
      page
    },
  }).then(payload => {
    console.log(payload.tickers)
  
  
  })
}