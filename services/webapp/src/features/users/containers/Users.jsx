import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'
import connectStore from 'react-redux-feature/lib/connect-store'
import { Route, Redirect } from 'react-router-dom'

import Page from 'layouts/Page'
import PageSection from 'layouts/Page/Section'
import List from 'components/List'
import Link from 'components/RadiumLink'

import registerFeature from '../register'
import UserDetails from './UserDetails'
import UserPosts from './UserPosts'
import UserMenu from './UserMenu'

import getStyles from './Users.style'
const styles = getStyles()


/**
 * State Management
 */

const state2props = ({ users, modals }) => ({
    items: users.list,
})

const dispatch2props = {}


/**
 * Component
 */

const makeListItems = items => items.map(item => ({
    ...item,
    key: `user-${item.id}`,
}))

const renderItem = item => (
    <Link to={`/users/${item.id}`} style={styles.link}>
        {item.name}
    </Link>
)

const renderList = (items) => {
    if (!items) {
        return <div>loadin</div>
    }

    if (!items.length) {
        return <div>no users found</div>
    }

    return (
        <List
            items={makeListItems(items)}
            renderItem={renderItem}
        />
    )
}

const Users = ({ items, match }) => (
    <Page title="Users">
        <PageSection>
            {renderList(items)}
        </PageSection>
        <Route
            exact
            path={'/users/:userId/'}
            component={() => (
                <Redirect to={`${match.url}/details`} />
            )}
        />
        <Route
            exact
            path={'/users/:userId/:action(details|posts)'}
            component={UserMenu}
        />
        <Route
            path={'/users/:userId/details'}
            component={UserDetails}
        />
        <Route
            path={'/users/:userId/posts'}
            component={UserPosts}
        />
    </Page>
)

Users.propTypes = {
    match: PropTypes.any.isRequired, // eslint-disable-line
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })),
}

Users.defaultProps = {
    items: [],
}


/**
 *  Decorators & Exports
 */

const StyledUsers = radium(Users)
const ConnectedUsers = connect(state2props, dispatch2props)(StyledUsers)
export default connectStore(registerFeature)(ConnectedUsers)
