/* eslint react/prefer-stateless-function: off */
import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'

import PageTitle from 'layouts/Page/Title'
import Link from 'components/RadiumLink'
import { loadUser } from 'features/users/services/users-service'

import getStyles from './Posts.style'
const styles = getStyles()

/**
 * State Management
 */

const state2props = ({ users }, { authorId }) => {
    const user = users.details[authorId]
    return {
        ...(user ? user : {}),
        isReady: !!user,
    }
}


const dispatch2props = {
    loadDetails: loadUser,
}


/**
 * Component
 */

const Loading = () => null

const Content = ({ id, name, email, address }) => (
    <div>
        <PageTitle>
            <Link style={styles.title} to={`/users/${id}/details`}>{name}</Link>
        </PageTitle>
        <div>
            <a style={styles.title} href={`mailto:${email}`}>{email}</a>
        </div>
        <div>
            {`${address.street}, ${address.suite}, ${address.city}`}
        </div>
    </div>
)

class AuthorDetails extends React.PureComponent {
    componentWillMount () {
        this.props.loadDetails(this.props.authorId)
    }

    render () {
        return this.props.isReady
            ? <Content {...this.props} />
            : <Loading />
    }
}

AuthorDetails.propTypes = {
    isReady: PropTypes.bool.isRequired,
    authorId: PropTypes.string.isRequired,
    loadDetails: PropTypes.func.isRequired,
}

Content.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.shape({
        suite: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
    }).isRequired,
}

/**
 *  Decorators & Exports
 */

const StyledAuthorDetails = radium(AuthorDetails)
export default connect(state2props, dispatch2props)(StyledAuthorDetails)
