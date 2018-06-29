/**
 * @description toggles the visibility of the progress indicator
 */
export const toggleProgressIndicator = () => {

    /** get the progress indicator */
    const [progressIndicator] = document.getElementsByClassName('progress');

    /** check if progress indicator's display property is none then set to flex, else set to none */
    if (progressIndicator.style.display === 'none' || progressIndicator.style.display === '') {
        progressIndicator.style.display = 'flex'
    } else {
        progressIndicator.style.display = 'none'
    }
}

/**
 * @description changes the text and color for a given Dom node
 * @param {DOM} el 
 * @param {String} message 
 * @param {Boolean} error 
 */
const errorLabel = (el, message, error) => {
    el.innerText = `${message}:`
    el.style.color = error ? 'red' : ''
}

/**
 * @description validates dom input values 
 * @param {DOM} fromValue 
 * @param {DOM} fromType 
 * @param {DOM} toType 
 * @param {DOM} toValue 
 */
export const validateData = (fromValue, fromType, toType, toValue) => {

    let fromValueLable = fromValue.parentElement.firstElementChild, fromTypeLabel = fromType.parentElement.firstElementChild, toTypeLable = toType.parentElement.firstElementChild
    let response = null

        if (!fromValue.value) {
            errorLabel(fromValueLable, 'The amount to convert is required', true)
            return false
        } else if (!/^(\d*\.)?\d+$/.test(fromValue.value)) {
            errorLabel(fromValueLable, 'A valid number is required', true)
            return false
        } else {
            errorLabel(fromValueLable, 'Amount I have', false)
        }


        if (!fromType.value) {
            errorLabel(fromTypeLabel, 'Select Currency to convert', true)
            return false
        } else {
            errorLabel(fromTypeLabel, 'Currency I have', false)
        }


        if (!toType.value) {
            errorLabel(toTypeLable, 'Select Currency to convert to', true)
            return false
        } else {
            errorLabel(toTypeLable, 'Currency I want', false)
        }

        
        if (fromType.value === toType.value) {
            toValue.value = fromValue.value
            toValue.className = toValue.className + ' ok'
        } else {
            toValue.className = ''
        }


        return {
            sameCurrency: fromType.value === toType.value,
            from: fromType.value,
            to: toType.value,
            value: fromValue.value
        }
}



/**
 * @description displays currencies into the select boxes
 * @param {JSON} currencies 
 */
export const displayCurrencies =  (currencies) => {
    const [fromType, toType] = document.getElementsByTagName('select');

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

        //replace currency symbol with ' ' if not exist. otherwise it will be undefined
        option.innerText = `${id} - ${currencyName} - ${currencySymbol || ''}`

        /** append option elements to dom */
        fromType.appendChild(option);
        toType.appendChild(option.cloneNode(true));
    }
}



/**
 * @description parses currency object into array and sorts the array
 * bases on currencyname property. This makes it easy for the user
 * @param {Object} data
 * @returns Array of sorted currencies
 */
export const makeIterable = (data) => {

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


/**
 * @description converts between two currencies and displays the values
 */
export const displayConversion = ({rate, value}, resultInput) => {
    resultInput.value = Number(value * rate).toFixed(4);
    resultInput.className = 'ok'
}