import React from 'react'
import PropTypes from 'prop-types'

const Comments = ({ list }) => (
    <div>
        {list.map(item => (
            <div key={`comment${item.id}`}>
                <h6>{item.name}</h6>
                <i>by: {item.email}</i>
                <p>{item.body}</p>
                <hr />
            </div>
        ))}
    </div>
)

Comments.propTypes = {
    list: PropTypes.array.isRequired, // eslint-disable-line
}

export default Comments
