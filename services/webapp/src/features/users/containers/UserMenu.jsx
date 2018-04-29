import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'

import { Helmet } from 'react-helmet'
import PageSection from 'layouts/Page/Section'
import Link from 'components/RadiumLink'

import getStyles from './UserMenu.style'
const styles = getStyles()


/**
 * State Management
 */

const getUser = (list, userId) => list
    ? list.find(i => String(i.id) === userId)
    : null

const state2props = ({ users }, { match }) => {
    const user = getUser(users.list, match.params.userId)
    return {
        id: match.params.userId,
        name: user ? user.name : 'unknown',
    }
}

const dispatch2props = {}


/**
 * Component
 */

const UserMenu = ({ id, name }) => (
    <PageSection title={name}>
        <Helmet><title>{name}</title></Helmet>
        <Link to={`/users/${id}/details`} style={styles.link}>details</Link>
        {' | '}
        <Link to={`/users/${id}/posts`} style={styles.link}>posts</Link>
    </PageSection>
)

UserMenu.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

UserMenu.defaultProps = {}


/**
 *  Decorators & Exports
 */

const StyledUserMenu = radium(UserMenu)
export default connect(state2props, dispatch2props)(StyledUserMenu)
