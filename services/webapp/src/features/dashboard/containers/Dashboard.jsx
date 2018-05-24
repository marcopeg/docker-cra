import React from 'react'
import radium from 'radium'

import Page from 'layouts/Page'
import Section from 'layouts/Page/Section'
import Text from 'layouts/Page/Text'

import reactImage from '../images/react.png'
import react2Image from '../images/react.jpg'
import getStyles from './Dashboard.style'
const styles = getStyles()


/**
 * Component
 */

const Dashboard = () => (
    <Page title="Welcome to Universal React on Docker">
        <Section>
            <Text>
                <p>
                    This project aim to put together great open source projects with the goal
                    to provide an easy starting point to create and distribute universal PWA based on React/Redux.
                </p>
                <ul>
                    <li>a Docker wrapper makes it immediate to start working on the solution</li>
                    <li>
                        thaks to Docker, it's easy to deploy highly optimized{' '}
                        containers with a built in NGiNX proxy
                    </li>
                    <li>SSR - server side rendering is built-in with simple Express middlewares</li>
                    <li>
                        {'the React app is built over '}
                        <a style={styles.link} key="create-react-app" href="https://github.com/facebook/create-react-app" target="_blank" rel="noopener noreferrer">create-react-app</a>
                        {' and '}
                        <a style={styles.link} key="react-app-rewired" href="https://github.com/timarney/react-app-rewired" target="_blank" rel="noopener noreferrer">react-app-rewired</a>
                    </li>
                    <li>
                        react-redux, redux-thunks, react-router, route listeners,{' '}
                        radium are already set up and ready to be used
                    </li>
                </ul>
                <p>
                    <a style={styles.link} key="docker-cra" href="https://github.com/marcopeg/docker-cra" target="_blank" rel="noopener noreferrer">Read the full README.md, and contribute on GitHub :-)</a>
                </p>
                <p>
                    <img src={reactImage} alt="made with react" style={{ maxWidth: '100%' }} />
                    <img src={react2Image} alt="made with react" style={{ maxWidth: '100%' }} />
                </p>
            </Text>
        </Section>
    </Page>
)


/**
 *  Decorators & Exports
 */

const StyledDashboard = radium(Dashboard)
export default StyledDashboard
