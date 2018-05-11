import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'
import Link from 'components/RadiumLink'

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
            <Link to="/" style={styles.item}>Home</Link>
            <Link to="/posts" style={styles.item}>Posts</Link>
            <Link to="/users" style={styles.item}>Users</Link>
            <Link to="/gallery" style={styles.item}>Gallery</Link>
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
