import adyen from 'adyen-cse-js'

export default (key, options) => adyen.createEncryption(key, options)
