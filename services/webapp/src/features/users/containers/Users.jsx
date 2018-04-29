import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import Page from 'layouts/Page'
import PageSection from 'layouts/Page/Section'
import List from 'components/List'
import Link from 'components/RadiumLink'

import UserDetails from './UserDetails'

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

const Users = ({ items }) => (
    <Page title="Users">
        <PageSection>
            {renderList(items)}
        </PageSection>
        <Route path={'/users/:userId'} component={UserDetails} />
    </Page>
)

Users.propTypes = {
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
export default connect(state2props, dispatch2props)(StyledUsers)
