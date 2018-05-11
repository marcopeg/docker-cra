import React from 'react'
import PropTypes from 'prop-types'
import connectStore, { storeShape } from 'react-redux-feature/lib/connect-store'
import { connect } from 'react-redux'
import registerFeature from '../register'

const mapState = ({ gallery }) => ({
    title: gallery ? gallery.title : 'loading',
})

const Gallery = ({ store, title }) => (
    <div>
        {title}
        <button onClick={() => store.dispatch({ type: 'gallery.click' })}>click</button>
    </div>
)

Gallery.propTypes = {
    store: storeShape.isRequired,
    title: PropTypes.string.isRequired,
}

const connectedGallery = connect(mapState)(Gallery)
export default connectStore(registerFeature)(connectedGallery)
