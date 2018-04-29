import React from 'react'
// import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'
// import { Route } from 'react-router-dom'

// import Page from 'layouts/Page'
import PageSection from 'layouts/Page/Section'
// import List from 'components/List'
// import Link from 'components/RadiumLink'

// import getStyles from './UserDetails.style'
// const styles = getStyles()


/**
 * State Management
 */

const state2props = ({ UserDetails, modals }) => ({})

const dispatch2props = {}


/**
 * Component
 */

const UserDetails = () => (
    <PageSection>
        user details
    </PageSection>
)

UserDetails.propTypes = {}

UserDetails.defaultProps = {}


/**
 *  Decorators & Exports
 */

const StyledUserDetails = radium(UserDetails)
export default connect(state2props, dispatch2props)(StyledUserDetails)
