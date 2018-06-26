export default {
    fetchAllCurrencies ([fromType, toType] = document.getElementsByTagName('select')) {
        fetch('https://free.currencyconverterapi.com/api/v5/currencies').then(response => {
            return response.json()
        }).then(currencies => {
            
            for(let item of makeIterable(currencies.results)) {
                let option = document.createElement('option')
                const {id, currencyName, currencySymbol} = item
                option.value = id
                option.innerText = `${id} - ${currencyName} - ${currencySymbol || ''}`
                fromType.appendChild(option);
                toType.appendChild(option.cloneNode(true));
            }
        }).catch(error => {
            console.log(error)
        })
    },
    convertCurrency () {

    }
}

/**
 * @description parses currency object into array and sorts the array
 * bases on currencyname property. This makes it easy for the user
 * @param {Object} data
 * @returns Array of sorted currencies
 */
const makeIterable = (data) => {
    /** convert object into iterable array */
    let iterable = []
    for(let key in data) {
        iterable.push(data[key])
    }
    /** sort iterable */
    iterable.sort((a , b) => {
        if (a.currencyName < b.currencyName)
            return -1;
        if (a.currencyName > b.currencyName)
            return 1;
        return 0;
    })
    return iterable;
}