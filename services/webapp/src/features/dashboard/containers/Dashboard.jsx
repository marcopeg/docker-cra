import React from 'react'
import radium from 'radium'

import Page from 'layouts/Page'
import Section from 'layouts/Page/Section'
import Text from 'layouts/Page/Text'

// import getStyles from './Dashboard.style'
// const styles = getStyles()


/**
 * Component
 */

const Dashboard = () => (
    <Page title="Dashboard">
        <Section>
            <Text>
                Here come the dashboard...
            </Text>
        </Section>
    </Page>
)


/**
 *  Decorators & Exports
 */

const StyledDashboard = radium(Dashboard)
export default StyledDashboard
