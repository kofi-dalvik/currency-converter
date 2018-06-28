import {toggleProgressIndicator, displayCurrencies, displayConversion} from './helpers'
import indexDB from './indexDB'

export default {


    /**
     * @description fetches all currencies
     * this will only be called once in a particular browser
     */
    fetchAllCurrencies () {
        /** make request to get all currencies */
        fetch('https://free.currencyconverterapi.com/api/v5/currencies').then(response => {
            //parse response data to json
            return response.json()
        }).then(currencies => {
            displayCurrencies(currencies)
            //add this to database
            indexDB.setCurrencies(currencies)
        }).catch(error => {
            console.log(error)
        })
    },


    /**
     * @description gets the rate between 2 currencies and converts it
     * 
     */
    convertCurrency ({relation, value}, toValue) {
        /** show progressIndicator */
        toggleProgressIndicator()
        /** remove the green backgroun of the result text input */
        toValue.className = ''
        /** fetch rate between give currencies in the ralation */
        fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${relation}&compact=ultra`).then(response => {
            /** on request completion, hide progressIndicator */
            toggleProgressIndicator()
            /** resolve response to json */
            return response.json()
        }).then(data => {
            /** compute the convertion with the rate and show value to user */
            displayConversion({rate: data[relation], value}, toValue)
            //add newly fetched rate to db
            indexDB.addRate(relation, data[relation]).then(() => console.log('rate added')).catch(() => console.log('add rate failed'))
        }).catch(error => {
            console.log(error)
            /** if request not sent, hide progressIndicator */
            toggleProgressIndicator()
        })
    }
}

