import React from 'react'
import { Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import radium from 'radium'

import { Menu } from 'features/menu'
import { Dashboard } from 'features/dashboard'
import { Users } from 'features/users'

import getStyles from './App.style'
const styles = getStyles()

/**
 * Component
 */

const App = () => (
    <div style={styles.wrapper}>
        <Helmet>
            <html lang="en" />
            <title>docker - cra</title>
        </Helmet>
        <Menu />
        <Route path="/" exact component={Dashboard} />
        <Route path="/users" component={Users} />
    </div>
)


/**
 *  Decorators & Exports
 */

const StyledApp = radium(App)
export default StyledApp
