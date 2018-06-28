import {toggleProgressIndicator, displayCurrencies} from './helpers'
import indexDB from './indexDB'

export default {


    /**
     * @description fetches all convertible currencies
     * @param Element dom elements
     */
    fetchAllCurrencies () {
        /** make request to get all currencies */
        fetch('https://free.currencyconverterapi.com/api/v5/currencies').then(response => {
            //parse response body to json
            return response.json()
        }).then(currencies => {
            displayCurrencies(currencies)
            indexDB.setCurrencies(currencies)
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

