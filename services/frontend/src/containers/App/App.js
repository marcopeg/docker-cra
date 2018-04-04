import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// Pure components tree
import Dashboard from 'containers/Dashboard'
import Posts from 'containers/Posts'
import PostDetails from 'containers/PostDetails'
// Side effected tree
import Users from 'containers/Users'

// import logo from './logo.svg'
import './App.css'

const App = () => (
    <div className="App">
        <Helmet>
            <html lang="en" />
            <title>[cra-ssr] server side rendering for create react app</title>
        </Helmet>
        <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <div>
                <Link to="/" style={{ color: '#fff' }}>Home</Link>
                {' | '}
                <Link to="/p" style={{ color: '#fff' }}>Posts</Link>
                {' | '}
                <Link to="/u" style={{ color: '#fff' }}>Users</Link>
            </div>
        </header>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/p" component={Posts} />
        <Route path="/p/:postId" component={PostDetails} />
        <Route path="/u*" component={Users} />
    </div>
)

export default App
