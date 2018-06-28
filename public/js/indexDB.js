import idb from 'idb';

class IndexDB{
    //constructor creates the db
    constructor () {
        this._db = idb.open('currency-converter', 1, (upgradeDB) => {
            let store = upgradeDB.createObjectStore('cc-key-val');
            store.put('0.265', 'USD_GHS')
        })
    }

    /**
     * @description this gets the stored currencies within indexDB
     */
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

    /**
     * @description puts the downloaded currencies into the db
     * @param {json} currencies 
     */
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

    /**
     * @description adds a newly downloaded rate to the db
     * @param {string} key 
     * @param {number} value 
     */
    addRate (key, value) {
        return new Promise((resolve, reject) => {
            this._db.then(db => {
                let transaction = db.transaction('cc-key-val', 'readwrite');
                let store = transaction.objectStore('cc-key-val');
                store.put(value, key)
                return transaction.complete;
            }).then(() => resolve(true)).catch(() => reject(null))
        })
    }

    /**
     * @description finds a given rate from the db. if rate not found it finds
     * the reverse rate next, if that also not found then it rejects
     * @param {string} key 
     */
    findRate (key) {
        return new Promise((resolve, reject) => {
            this._db.then(db => {
                //create transaction
                let transaction = db.transaction('cc-key-val');
                let store = transaction.objectStore('cc-key-val');
                //create reverse ralation
                //eg relation: USD_EUR will reverse to give EUR_USD
                let reversekey = key.split('_').reverse().join('_');

                //this promises will resolve to defined and undefined data
                return Promise.all([store.get(key), store.get(reversekey)])
            }).then(val => {
                //if first value is defined, then its the rate, resolve the rate
                if (val[0] && !val[1]) {
                    resolve(val[0])
                } else if (!val[0] && val[1]) {
                    //if second value is defined, then resolve the invert the rate
                    resolve(1/val[1])
                } else {
                    reject(false)
                }
            })
        })
    }
}


//finally, export an instance of this class
export default new IndexDB();