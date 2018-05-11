import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'
import Link from 'components/RadiumLink'

import { Dashboard } from 'features/dashboard'
import { Users } from 'features/users'
import { Posts } from 'features/posts'
import { Gallery } from 'features/gallery'

import getStyles from './Menu.style'
const styles = getStyles()


/**
 * State Management
 */
const state2props = ({ menu }) => ({
    title: menu.name,
})

const dispatch2props = {}


/**
 * Component
 */

const Menu = ({ title }) => (
    <div style={styles.wrapper}>
        <div style={styles.title}>
            {title}
        </div>
        <div style={styles.items}>
            <Link
                to="/"
                style={styles.item}
                onMouseOver={() => Dashboard.preload()}
            >Home</Link>
            <Link
                to="/posts"
                style={styles.item}
                onMouseOver={() => Posts.preload()}
            >Posts</Link>
            <Link
                to="/users"
                style={styles.item}
                onMouseOver={() => Users.preload()}
            >Users</Link>
            <Link
                to="/gallery"
                style={styles.item}
                onMouseOver={() => Gallery.preload()}
            >Gallery</Link>
        </div>
    </div>
)

Menu.propTypes = {
    title: PropTypes.string.isRequired,
}

/**
 *  Decorators & Exports
 */

const StyledMenu = radium(Menu)
const ConnectedMenu = connect(state2props, dispatch2props)(StyledMenu)
export default ConnectedMenu
