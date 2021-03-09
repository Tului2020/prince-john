import bigData from './search_data'


// only searching by ticker right now, will add search by name feature
const searchByTicker = (phrase) => {
    let filteredData = [];
    const searchData = Object.keys(bigData)
    searchData.forEach(el => {
        if (el.search(phrase.toUpperCase()) === 0) filteredData.push({[el]: bigData[el]})
    })
    return filteredData
}

const searchFunction = (phrase) => {
    return searchByTicker(phrase)
}

export default searchFunction;
