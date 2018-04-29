import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PageSection from 'layouts/Page/Section'


/**
 * State Management
 */

const state2props = ({ users }, { match }) => {
    const user = users.details[match.params.userId]
    return {
        ...(user ? user : {}),
        isReady: !!user,
    }
}

const dispatch2props = {}


/**
 * Component
 */

const Loading = () => (
    <span>loading...</span>
)

const Details = ({ email, address }) => (
    <div>
        <div>
            <a href={`mailto:${email}`}>{email}</a>
        </div>
        <div>
            {`${address.street}, ${address.suite}, ${address.city}`}
        </div>
    </div>
)

const UserDetails = ({ isReady, ...props }) => (
    <PageSection>
        {isReady ? <Details {...props} /> : <Loading /> }
    </PageSection>
)

UserDetails.propTypes = {
    isReady: PropTypes.bool.isRequired,
}

Details.propTypes = {
    email: PropTypes.string,
    address: PropTypes.shape({
        suite: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
    }),
}

Details.defaultProps = {
    email: null,
    address: null,
}


/**
 *  Decorators & Exports
 */

export default connect(state2props, dispatch2props)(UserDetails)
