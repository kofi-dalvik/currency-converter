/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/api.js":
/*!**************************!*\
  !*** ./public/js/api.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./public/js/helpers.js\");\n/** importing app utility functions like one which toggles progressIndicator*/\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    /**\r\n     * @description fetches all convertible currencies\r\n     * @param Element dom elements\r\n     */\n    fetchAllCurrencies([fromType, toType] = document.getElementsByTagName('select')) {\n\n        /** make request to get all currencies */\n        fetch('https://free.currencyconverterapi.com/api/v5/currencies').then(response => {\n\n            //parse response body to json\n            return response.json();\n        }).then(currencies => {\n\n            /**\r\n             * currencies does not implement iteratable protocol\r\n             * so makeIterable() function converts the object into array\r\n             * makeIterable() also sorts the currencies into alphabetical order\r\n             */\n            currencies = makeIterable(currencies.results);\n\n            /** with each currency */\n            for (let item of currencies) {\n\n                /** create option element */\n                let option = document.createElement('option');\n\n                /** set properties of the element */\n                const { id, currencyName, currencySymbol } = item;\n\n                option.value = id;\n\n                option.innerText = `${id} - ${currencyName} - ${currencySymbol || ''}`;\n\n                /** append option elements to dom */\n                fromType.appendChild(option);\n\n                toType.appendChild(option.cloneNode(true));\n            }\n        }).catch(error => {\n            console.log(error);\n        });\n    },\n    /**\r\n     * @description gets the rate between 2 currencies and converts it\r\n     * @param {DOM} param0 \r\n     * @param {DOM} toValue \r\n     */\n    convertCurrency({ from, to, value }, toValue) {\n\n        /** show progressIndicator */\n        Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"toggleProgressIndicator\"])();\n\n        /** remove the green backgroun of the result text input */\n        toValue.className = '';\n\n        /** define the request relation */\n        let relation = [from, to].join('_');\n\n        /** fetch rate between give currencies in the ralation */\n        fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${relation}&compact=ultra`).then(response => {\n\n            /** on request completion, hide progressIndicator */\n            Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"toggleProgressIndicator\"])();\n\n            /** resolve response to json */\n            return response.json();\n        }).then(data => {\n\n            /** compute the convertion with the rate and show value to user */\n            toValue.value = value * data[relation];\n\n            toValue.className = 'ok';\n        }).catch(error => {\n\n            console.log(error);\n\n            /** if request not sent, hide progressIndicator */\n            Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"toggleProgressIndicator\"])();\n        });\n    }\n});\n\n/**\r\n * @description parses currency object into array and sorts the array\r\n * bases on currencyname property. This makes it easy for the user\r\n * @param {Object} data\r\n * @returns Array of sorted currencies\r\n */\nconst makeIterable = data => {\n\n    /** convert object into iterable array */\n    let iterable = [];\n\n    for (let key in data) {\n\n        iterable.push(data[key]);\n    }\n\n    /** sort iterable */\n    iterable.sort((a, b) => {\n\n        if (a.currencyName < b.currencyName) return -1;\n\n        if (a.currencyName > b.currencyName) return 1;\n\n        return 0;\n    });\n\n    return iterable;\n};\n\n//# sourceURL=webpack:///./public/js/api.js?");

/***/ }),

/***/ "./public/js/app.js":
/*!**************************!*\
  !*** ./public/js/app.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./public/js/api.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ \"./public/js/helpers.js\");\n/** importing api methods, these methods makes http requests */\n\n\n/** importing utility functions, most of which are dom manipulating functions */\n\n\n/** when ready, we fetch all currencies and populate the select inputs with currencies */\nwindow.onload = event => {\n\n    /** registering service worker */\n\n    /** fetch list of currencies */\n    _api__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fetchAllCurrencies();\n\n    /** these are dom elements we are going to use very frequently\r\n     * getting them here will help reduce having to repeat codes accros modules\r\n    */\n    const [convert] = document.getElementsByClassName('convert');\n\n    const [fromType, toType] = document.getElementsByTagName('select');\n\n    const [fromValue, toValue] = document.getElementsByTagName('input');\n\n    /** \r\n     * converts currencies\r\n     */\n    convert.addEventListener('click', event => {\n\n        //validate the form data, make sure all inputs are set\n        let valid = Object(_helpers__WEBPACK_IMPORTED_MODULE_1__[\"validateData\"])(fromValue, fromType, toType, toValue);\n\n        //if form is valid, convert currency\n        if (valid && !valid.sameCurrency) {\n\n            _api__WEBPACK_IMPORTED_MODULE_0__[\"default\"].convertCurrency(valid, toValue);\n        }\n    });\n};\n\n//# sourceURL=webpack:///./public/js/app.js?");

/***/ }),

/***/ "./public/js/helpers.js":
/*!******************************!*\
  !*** ./public/js/helpers.js ***!
  \******************************/
/*! exports provided: toggleProgressIndicator, validateData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggleProgressIndicator\", function() { return toggleProgressIndicator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validateData\", function() { return validateData; });\n/**\r\n * @description toggles the visibility of the progress indicator\r\n */\nconst toggleProgressIndicator = () => {\n\n        /** get the progress indicator */\n        const [progressIndicator] = document.getElementsByClassName('progress');\n\n        /** check if progress indicator's display property is none then set to flex, else set to none */\n        if (progressIndicator.style.display === 'none' || progressIndicator.style.display === '') {\n\n                progressIndicator.style.display = 'flex';\n        } else {\n\n                progressIndicator.style.display = 'none';\n        }\n};\n\n/**\r\n * @description changes the text and color for a given Dom node\r\n * @param {DOM} el \r\n * @param {String} message \r\n * @param {Boolean} error \r\n */\nconst errorLabel = (el, message, error) => {\n        el.innerText = `${message}:`;\n        el.style.color = error ? 'red' : '';\n};\n\n/**\r\n * @description validates dom input values \r\n * @param {DOM} fromValue \r\n * @param {DOM} fromType \r\n * @param {DOM} toType \r\n * @param {DOM} toValue \r\n */\nconst validateData = (fromValue, fromType, toType, toValue) => {\n\n        let fromValueLable = fromValue.parentElement.firstElementChild,\n            fromTypeLabel = fromType.parentElement.firstElementChild,\n            toTypeLable = toType.parentElement.firstElementChild;\n\n        let response = null;\n\n        if (!fromValue.value) {\n\n                errorLabel(fromValueLable, 'The amount to convert is required', true);\n\n                return false;\n        } else if (!/^(\\d*\\.)?\\d+$/.test(fromValue.value)) {\n\n                errorLabel(fromValueLable, 'A valid number is required', true);\n\n                return false;\n        } else {\n\n                errorLabel(fromValueLable, 'Amount I have', false);\n        }\n\n        if (!fromType.value) {\n\n                errorLabel(fromTypeLabel, 'Select Currency to convert', true);\n\n                return false;\n        } else {\n\n                errorLabel(fromTypeLabel, 'Currency I have', false);\n        }\n\n        if (!toType.value) {\n\n                errorLabel(toTypeLable, 'Select Currency to convert to', true);\n\n                return false;\n        } else {\n\n                errorLabel(toTypeLable, 'Currency I want', false);\n        }\n\n        if (fromType.value === toType.value) {\n\n                toValue.value = fromValue.value;\n\n                toValue.className = toValue.className + ' ok';\n        } else {\n\n                toValue.className = '';\n        }\n\n        return {\n                sameCurrency: fromType.value === toType.value,\n                from: fromType.value,\n                to: toType.value,\n                value: fromValue.value\n        };\n};\n\n//# sourceURL=webpack:///./public/js/helpers.js?");

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./public/js/app.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./public/js/app.js */\"./public/js/app.js\");\n\n\n//# sourceURL=webpack:///multi_./public/js/app.js?");

/***/ })

/******/ });