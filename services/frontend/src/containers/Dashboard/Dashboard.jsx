/*
    eslint
        react/prefer-stateless-function: off,
        jsx-a11y/anchor-is-valid: off
*/

import './styles.css'
import './styles.styl'
import styles from './styles.module.styl'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// require()
// require()
// import styles from './styles.modules.styl' // eslint-disable-line

// console.log(styles)


const state2props = ({ app }) => ({
    title: app.name,
})

const dispatch2props = {}

class Dashboard extends React.Component {
    render () {
        return (
            <div className={`dashboard ${styles.foo}`} style={{ textAlign: 'left', margin: 20 }}>
                <h1>Dashboard - {this.props.title}</h1>
            </div>
        )
    }
}

Dashboard.propTypes = {
    title: PropTypes.string.isRequired,
}

export default connect(state2props, dispatch2props)(Dashboard)
