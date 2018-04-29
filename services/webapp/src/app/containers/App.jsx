import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
// import { Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import radium from 'radium'

import { Menu } from 'features/menu'

import getStyles from './App.style'
const styles = getStyles()

const state2props = ({ app }) => ({
    title: app.name,
})

const dispatch2props = {}

const App = ({ title }) => (
    <div style={styles.root}>
        <Helmet>
            <html lang="en" />
            <title>docker - cra</title>
        </Helmet>
        <Menu />
        <h1>{title}</h1>
    </div>
)

App.propTypes = {
    title: PropTypes.string.isRequired,
}

const StyledApp = radium(App)
const ConnectedApp = connect(state2props, dispatch2props)(StyledApp)

export default withRouter(ConnectedApp)
