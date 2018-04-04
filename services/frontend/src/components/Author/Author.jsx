/*
    eslint
        jsx-a11y/anchor-is-valid: off
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Author = ({ id, name }) => (
    <div>
        <div>
            by: <Link to={`/u/${id}`}>{name}</Link>
        </div>
    </div>
)

Author.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
}

export default Author
