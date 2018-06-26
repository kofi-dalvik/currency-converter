import api from './api'
import {toggleProgressIndicator, validateData} from './helpers'


window.onload = (event) => {
    /** on load, register service worker */

    /** fetch list of currencies */
    api.fetchAllCurrencies();

    /** get tag elements in the forms */
    const [convert] = document.getElementsByClassName('convert');
    const [fromType, toType] = document.getElementsByTagName('select');
    const [fromValue, toValue] = document.getElementsByTagName('input');


    convert.addEventListener('click', (event) => {
        let valid = validateData(fromValue, fromType, toType, toValue);
        if (valid && !valid.sameCurrency) {
            toggleProgressIndicator()
            console.log(valid)
        }
    })
}