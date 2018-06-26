/** importing api methods, these methods makes http requests */
import api from './api'

/** importing utility functions, most of which are dom manipulating functions */
import {validateData} from './helpers'


/** when ready, we fetch all currencies and populate the select inputs with currencies */
window.onload = (event) => {

    /** registering service worker */
    
    /** fetch list of currencies */
    api.fetchAllCurrencies();

    /** these are dom elements we are going to use very frequently
     * getting them here will help reduce having to repeat codes accros modules
    */
    const [convert] = document.getElementsByClassName('convert');

    const [fromType, toType] = document.getElementsByTagName('select');

    const [fromValue, toValue] = document.getElementsByTagName('input');


    /** 
     * converts currencies
     */
    convert.addEventListener('click', (event) => {

        //validate the form data, make sure all inputs are set
        let valid = validateData(fromValue, fromType, toType, toValue);

        //if form is valid, convert currency
        if (valid && !valid.sameCurrency) {

            api.convertCurrency(valid, toValue)
            
        }
    })
}