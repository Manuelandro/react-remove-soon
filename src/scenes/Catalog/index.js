import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { productsSelector, singleProductSelector } from 'Selectors'
import { WelcomeMsg, WelcomeMsgH, MaxWrapper } from 'Styled'
import List from './components/list'
import Product from './components/product'
import Filters from './components/filters'
import Oneclick from './components/oneclick'
import { CatalogWrapper } from './styled'

const Catalog = ({ isProduct, products, singleProduct }) => (
    <CatalogWrapper>
        {!isProduct
            ? <MaxWrapper>
                <WelcomeMsg>
                    <WelcomeMsgH>Ciao Manuel, hai fame?</WelcomeMsgH>
                </WelcomeMsg>
                <Filters />
                <Oneclick />
                {products.map((val, indx) => <List {...val} key={indx} />)}
            </MaxWrapper>
            : <div>
                <WelcomeMsg>Prodotto</WelcomeMsg>
                <Oneclick />
                <Product product={singleProduct} />
            </div>}
    </CatalogWrapper>
)

Catalog.propTypes = {
    isProduct: PropTypes.bool.isRequired,
    singleProduct: PropTypes.object, // eslint-disable-line
    products: PropTypes.array.isRequired // eslint-disable-line
}

Catalog.defaultProps = {
    isProduct: false,
    singleProduct: {},
    catalog: [],
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    products: productsSelector(state),
    singleProduct: ownProps.isProduct ? singleProductSelector(state) : {},
})

export default connect(mapStateToProps)(Catalog)
