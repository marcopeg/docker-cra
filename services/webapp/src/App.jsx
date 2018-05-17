import React from 'react'
import { Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import radium from 'radium'

import { Menu } from 'features/menu'
import { Dashboard } from 'features/dashboard'
import { Users } from 'features/users'
import { Posts, PostDetails } from 'features/posts'
import { Gallery } from 'features/gallery'

import getStyles from './App.style'
const styles = getStyles()


/**
 * Component
 */

const App = (props) => (
    <div style={styles.wrapper}>
        <Helmet>
            <html lang="en" />
            <title>docker - cra</title>
        </Helmet>
        <Menu />
        <Route path="/" exact component={Dashboard} />
        <Route path="/users/:userId?" component={Users} />
        <Route path="/posts" exact component={Posts} />
        <Route path="/posts/:postId" component={PostDetails} />
        <Route path="/gallery" component={Gallery} />
        <span style={styles.version}>v0.0.3</span>
    </div>
)


/**
 *  Decorators & Exports
 */

const StyledApp = radium(App)
export default StyledApp
