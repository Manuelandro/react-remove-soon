import keys from 'lodash/keys'
import indexOf from 'lodash/indexOf'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { archetipo } from 'Config'
import { filtersSelector } from 'Selectors'
import * as actions from '../actions'
import { FiltersWrapper, Filter } from '../styled'

const Filters = ({ filters, toggleFilter }) => (
    <FiltersWrapper>
        {keys(archetipo).map((val) => {
            const active = indexOf(filters, val) > -1

            return (
                <Filter
                  key={val}
                  active={active}
                  onClick={() => toggleFilter(val)}
                >
                    {archetipo[val]}
                </Filter>
            )
        })}
    </FiltersWrapper>
)

Filters.defaultProps = {
    filters: [],
    toggleFilter: () => {},
}

Filters.propTypes = {
    filters: PropTypes.array.isRequired, // eslint-disable-line
    toggleFilter: PropTypes.func.isRequired,
}

const mapStateToProps = ({ catalog }) => ({
    filters: filtersSelector(catalog),
})

const mapDispatchToProps = {
    toggleFilter: actions.toggleFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
