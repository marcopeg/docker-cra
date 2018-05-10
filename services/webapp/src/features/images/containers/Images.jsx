import React from 'react'
import connectStore, { storeShape } from 'react-redux-feature/lib/connect-store'
import registerFeature from '../register-feature'

const Images = ({ store }) => (
    <div>
        images*
        <button onClick={() => store.dispatch({ type: 'images.click' })}>click</button>
    </div>
)

Images.propTypes = {
    store: storeShape.isRequired,
}

export default connectStore(registerFeature)(Images)
