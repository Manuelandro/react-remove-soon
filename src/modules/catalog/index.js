import keys from 'lodash/keys'
import pick from 'lodash/pick'

export const getProductAttributes = (data = {}, attributeSchema) =>
    keys(data).map(val => pick(data[val], attributeSchema))
