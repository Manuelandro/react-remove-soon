import adyenEncript from '../'
import cse from './client.encryption'
import { key, options } from './public'
import { returnParsed } from './return'

export const encryptExample = () => {
    const generationTime = new Date().toISOString() // Note:
    // Generate this
    // serverside!

    const postData = adyenEncript(
        '5555 4444 3333 1111',
        '737',
        'John Doe',
        '06',
        '2016',
        generationTime,
    )

    return returnParsed(postData)
}

export const validateExample = () => {
    const valid = cse(key, options).validate({
        number: '5555 4444 3333 1111',
        cvc: '737',
        month: '06',
        year: '2016',
    })

    return returnParsed(valid)
}
