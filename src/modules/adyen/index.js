import cse from './lib/client.encryption'
import { key, options } from './lib/public'

export default (
    cardNumber,
    cvc,
    holderName,
    expiryMonth,
    expiryYear,
    generationtime,
) => {
    const cardData = {
        number: cardNumber,
        cvc,
        holderName,
        expiryMonth,
        expiryYear,
        generationtime,
    }

    return cse(key, options).encrypt(cardData)
}
