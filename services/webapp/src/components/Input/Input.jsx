/* eslint react/prefer-stateless-function: off */

import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import getStyles from './Input.style'

const styles = getStyles()

const Input = ({ style, ...props }) => (
    <input
        {...props}
        style={[ styles.input, styles.input[props.type], style ]}
    />
)

Input.propTypes = {
    style: PropTypes.object,
    type: PropTypes.string,
}

Input.defaultProps = {
    style: {},
    type: 'text',
}

const StyledInput = radium(Input)

// Need this stuff so it can be referenced!
class EnhancedInput extends React.Component {
    static propTypes = {
        initialValue: PropTypes.string,
    }

    static defaultProps = {
        initialValue: '',
    }

    constructor (props) {
        super(props)
        this.value = this.props.initialValue
    }

    state = {
        value: this.props.initialValue,
    }

    updateValue = (evt) => {
        this.setState({ value: evt.target.value })
        this.value = evt.target.value
    }

    render () {
        // eslint-disable-next-line
        const { initialValue, ...props } = this.props
        return (
            <StyledInput
                {...props}
                value={this.state.value}
                onChange={this.updateValue}
            />
        )
    }
}

export default EnhancedInput
