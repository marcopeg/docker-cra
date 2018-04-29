/* eslint react/prefer-stateless-function: off */
import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'

import Page from 'layouts/Page'
import PageSection from 'layouts/Page/Section'
import List from 'components/List'
import Link from 'components/RadiumLink'

import { loadPosts } from '../services/posts-service'

import getStyles from './Posts.style'
const styles = getStyles()

/**
 * State Management
 */

const state2props = ({ posts }) => ({
    isReady: !!posts.list,
    items: posts.list,
})

const dispatch2props = {
    loadPosts,
}


/**
 * Component
 */

const Loading = () => (
    <span>loading...</span>
)

const decorateListItems = items =>
    items.map(item => ({
        ...item,
        key: item.id,
    }))

const PostItem = ({ id, title }) => (
    <Link
        to={`/posts/${id}`}
        style={styles.link}
        children={title}
    />
)

const Content = ({ items }) => (
    <PageSection>
        <List
            items={decorateListItems(items)}
            renderItem={PostItem}
        />
    </PageSection>
)

class Posts extends React.PureComponent {
    componentWillMount () {
        this.props.loadPosts()
    }

    render () {
        return (
            <Page title="Posts">
                {(
                    this.props.isReady
                        ? <Content {...this.props} />
                        : <Loading />
                )}
            </Page>
        )
    }
}

Posts.propTypes = {
    isReady: PropTypes.bool.isRequired,
    loadPosts: PropTypes.func.isRequired,
}

PostItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
}

Content.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape(PostItem.propTypes)).isRequired,
}

/**
 *  Decorators & Exports
 */

const StyledPosts = radium(Posts)
export default connect(state2props, dispatch2props)(StyledPosts)

