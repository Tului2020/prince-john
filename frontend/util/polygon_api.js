const axios = require('axios');
const apiKeys = {
  key1: 'bfF_zzUFmQX9mksRil15wBibzlNnOvWY',
  key2: 'emefn3Vdolrs5KBjmDRLrlv5RsVo5gSA',
  key3: 'nLcMBLPg3y2QedY9J4uSFqO2p0_Nzjiq'
}



export const getCompanyInfo = (ticker, callBackFunc=console.log) => {
  const apiKeyToUse = Math.ceil(Math.random() * Object.keys(apiKeys).length)
  console.log(`getCompanyInfo ${apiKeyToUse}`)
  let apiKey = apiKeys[`key${apiKeyToUse}`]
  return axios.get(`https://api.polygon.io/v1/meta/symbols/${ticker}/company`,
    {
      params: {
        apiKey
      }
    }
  )
  .then(({data}) => callBackFunc(data))
  .catch(err => console.log(err))
}




export const getStockNews = (ticker, callBackFunc=console.log, page=1, perpage=5) => {
  const apiKeyToUse = Math.ceil(Math.random() * Object.keys(apiKeys).length)
  console.log(`getStockNews ${apiKeyToUse}`)
  let apiKey = apiKeys[`key${apiKeyToUse}`]
  return axios.get(`https://api.polygon.io/v1/meta/symbols/${ticker}/news`,
    {
      params: {
        perpage,
        page,
        apiKey,
      }
    }
  ).then(({data}) => {
    callBackFunc(data)
  })
  .catch(err => console.log(err))
}


