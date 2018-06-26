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

export const toggleConvertButton = (el) => {

    if (!el) [el] = document.getElementsByClassName('convert');

    if (!el.style.display || el.style.display === 'none')
        el.style.display = 'inline-block'
    else
        el.style.display = 'none'
}

const errorLabel = (el, message, error) => {
    el.innerText = `${message}:`
    el.style.color = error ? 'red' : ''
}

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