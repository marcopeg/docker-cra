/*
    eslint
        react/prefer-stateless-function: off,
        jsx-a11y/anchor-is-valid: off
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const state2props = ({ app }) => ({
    title: app.name,
})

const dispatch2props = {}

class Dashboard extends React.Component {
    render () {
        return (
            <div style={{ textAlign: 'left', margin: 20 }}>
                <h1>Dashboard - {this.props.title}</h1>
            </div>
        )
    }
}

Dashboard.propTypes = {
    title: PropTypes.string.isRequired,
}

export default connect(state2props, dispatch2props)(Dashboard)
