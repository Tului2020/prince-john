import bigData from './search_data'
// const bigData = require('./search_data')


// only searching by ticker right now, will add search by name feature
const searchByTicker = (phrase) => {
    if (phrase === '') return []
    let filteredData = [];
    const searchData = Object.keys(bigData)
    searchData.forEach(el => {
        if (el.search(phrase.toUpperCase()) === 0) filteredData.push({[el]: bigData[el]})
    })
    return filteredData.slice(0, 6)
}

const searchFunction = (phrase) => {
    return searchByTicker(phrase)
}

// console.log(searchFunction('QYLD')[0]['QYLD'])

export default searchFunction;
