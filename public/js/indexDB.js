import idb from 'idb';
import {makeIterable} from './helpers'

class IndexDB{
    constructor () {
        console.log('store created')
        this._db = idb.open('currency-converter', 1, (upgradeDB) => {
            let store = upgradeDB.createObjectStore('cc-key-val');
            store.put('world', 'hello')
        })
    }

    getCurrencies() {
        return new Promise((resolve, reject) => {
            this._db.then(db => {
                let transaction = db.transaction('cc-key-val');
                let store = transaction.objectStore('cc-key-val');
                return store.get('currencies');
            }).then(val => {
                resolve(val)
            })
        })
    }

    setCurrencies (currencies) {
        return new Promise((resolve, reject) => {
            this._db.then(db => {
                let transaction = db.transaction('cc-key-val', 'readwrite');
                let store = transaction.objectStore('cc-key-val');
                store.put(currencies, 'currencies');
                return transaction.complete;
            }).then(() => resolve(true)).catch(() => reject(null))
        })
    }

    isFirstTime () {
        return new Promise((resolve, reject) => {
            this._db.then(db => {
                let transaction = db.transaction('cc-key-val');
                let store = transaction.objectStore('cc-key-val');
                return store.get('firsttime')
            })
        })
    }

    populateRatesOfConversion () {
        console.log('in populateRatesOfConvertion')
        fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=USD_PHP,USD_GHS&compact=ultra`, {mode: 'no-cors'}).then(response => {
            return response.json()
        }).then(val => {
            console.log(val)
        })
        return new Promise((resolve, reject) => {
            this.getCurrencies().then(currencies => {
                currencies = makeIterable(currencies.results).slice(0, 10);

                // currencies = [{id: 'A'}, {id: 'B'}, {id: 'C'}, {id: 'D'},{id: 'E'}, {id: 'F'}]
                let relation = ``
                let limit = 0;

                for (let i = 0; i < currencies.length; i++) {
                    let j = i + 1;
                    while(j < currencies.length) {

                        let pair = `${currencies[i].id}_${currencies[j].id},`
                        limit++
                        relation += pair
                        // console.log(`relation as at limit ${limit} = ${relation}`)
                        
                        if (limit % 2 == 0) {
                            relation = relation.substring(0, relation.length - 1)
                            console.log(relation)
                           
                            // setTimeout(function () {
                               
                            // }, 3000)

                            relation = ``
                        }
                        j++
                    }
                }
                console.log(relation)
            }).catch( (err) => {
                console.log('cannot populateRates of covertions', err)
            })
        })
    }
}

export default new IndexDB();