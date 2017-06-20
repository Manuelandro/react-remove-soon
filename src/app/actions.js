import { PULL_CATALOG } from 'Consts'

// actions' shortners
const f = type => (payload = {}) => dispatch => dispatch({ type, payload })
const g = type => (payload = {}) => ({ type, payload })

// actions' creators
export const pullCatalog = f(PULL_CATALOG)
