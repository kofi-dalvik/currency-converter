/** importing api methods, these methods makes http requests */
import api from './api'
import indexDB from './indexDB'

/** importing utility functions, most of which are dom manipulating functions */
import {validateData, displayCurrencies, displayConversion} from './helpers'


/** when ready, we fetch all currencies and populate the select inputs with currencies */
window.onload = (event) => {

    /** registering service worker first*/
    registerServiceWorker()

    /** fetch currencies if not in db */
    indexDB.getCurrencies().then(val => {
        if (!val) {
            //reach out to network
            api.fetchAllCurrencies();
        } else {
            //display data from indexedDB
            displayCurrencies(val);
        }
    })

    /** these are dom elements we are going to use very frequently
     * getting them here will help reduce having to repeat codes accross modules
    */
    const [convert] = document.getElementsByClassName('convert');
    const [fromType, toType] = document.getElementsByTagName('select');
    const [fromValue, toValue] = document.getElementsByTagName('input');
    const [flipButton] = document.getElementsByClassName('link');

    /**
     * flips the currency conversions
     */
    flipButton.addEventListener('click', (event) => {
        event.preventDefault()
        let temp = fromType.value
        fromType.value = toType.value
        toType.value = temp
    })


    /** 
     * event listener to converts currencies
     */
    convert.addEventListener('click', (event) => {

        //validate the form data, make sure all inputs are set
        let valid = validateData(fromValue, fromType, toType, toValue);

        //if form is valid, and not of the same currency conversion
        if (valid && !valid.sameCurrency) {

            const {to, from, value} = valid

            //the query paramter, the ralation between the two currencies
            let relation = [from, to].join('_');

            //find if rate has already been added to db
            //this findRate method implemented in indexDB class will find the reverse rate if the rate does not exist
            indexDB.findRate(relation).then(rate => {
                //displaying result to the user
                displayConversion({rate, value}, toValue);
            }).catch(() => {
                //rate is not found so reaching out to network
                //once rate is obtained, it will be added to db
                api.convertCurrency({relation, value}, toValue)
            })
        }
    })

    /**
     * event listener for change to currency type
     * clear the class on the select element
     */
    toType.addEventListener('change', (event) => {
        if (event.target.value !== fromType.value) {
            toValue.className = ''
            toValue.value = ''
        }
    })
}

/**
 * this registers the service worker
 */
const registerServiceWorker = () => {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            navigator.serviceWorker.addEventListener('controllerchange', (event) => {
                //reloading browser when new worker is installed
                window.location.reload()
            })
        }).catch(() => {
            console.log('sw not registered')
        })
    }
} 