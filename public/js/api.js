/** importing app utility functions like one which toggles progressIndicator*/
import {toggleProgressIndicator} from './helpers'

export default {
    /**
     * @description fetches all convertible currencies
     * @param Element dom elements
     */
    fetchAllCurrencies ([fromType, toType] = document.getElementsByTagName('select')) {
        
        /** make request to get all currencies */
        fetch('https://free.currencyconverterapi.com/api/v5/currencies').then(response => {

            //parse response body to json
            return response.json()

        }).then(currencies => {

            /**
             * currencies does not implement iteratable protocol
             * so makeIterable() function converts the object into array
             * makeIterable() also sorts the currencies into alphabetical order
             */
            currencies = makeIterable(currencies.results)

            /** with each currency */
            for(let item of currencies) {
                
                /** create option element */
                let option = document.createElement('option')

                /** set properties of the element */
                const {id, currencyName, currencySymbol} = item

                option.value = id

                option.innerText = `${id} - ${currencyName} - ${currencySymbol || ''}`

                /** append option elements to dom */
                fromType.appendChild(option);

                toType.appendChild(option.cloneNode(true));
            }
        }).catch(error => {
            console.log(error)
        })
    },
    /**
     * @description gets the rate between 2 currencies and converts it
     * @param {DOM} param0 
     * @param {DOM} toValue 
     */
    convertCurrency ({from, to, value}, toValue) {

        /** show progressIndicator */
        toggleProgressIndicator()

        /** remove the green backgroun of the result text input */
        toValue.className = ''

        /** define the request relation */
        let relation = [from, to].join('_');

        /** fetch rate between give currencies in the ralation */
        fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${relation}&compact=ultra`).then(response => {

            /** on request completion, hide progressIndicator */
            toggleProgressIndicator()

            /** resolve response to json */
            return response.json()

        }).then(data => {

            /** compute the convertion with the rate and show value to user */
            toValue.value = value * data[relation]

            toValue.className = 'ok'

        }).catch(error => {

            console.log(error)

            /** if request not sent, hide progressIndicator */
            toggleProgressIndicator()
        })
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