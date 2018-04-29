import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import radium from 'radium'

import { closeModal } from '../services/modals-service'

import getStyles from './Modal.style'

const mapState = ({ modals }, { id }) => ({
    visible: modals[id] && modals[id] !== null,
})

const mapDispatch = (dispatch, { id }) => ({
    closeModal: () => dispatch(closeModal(id)),
})

const Modal = ({
    visible,
    dismissable,
    width,
    height,
    offset,
    children,
    component,
    closeModal,
}) => {
    const styles = getStyles({
        width,
        height,
        offset,
    })

    return (
        <div style={[
            styles.overlay,
            visible ? styles.overlay.visible : styles.overlay.hidden,
        ]}>
            <div
                style={[
                    styles.wrapper,
                    visible ? styles.wrapper.visible : styles.wrapper.hidden,
                ]}
            >
                {(component && visible) ? React.createElement(component) : null}
                {children}
                {dismissable ? (
                    <div
                        style={styles.closeHandler}
                        onClick={closeModal}
                    >X</div>
                ) : null}
            </div>
        </div>
    )
}

Modal.propTypes = {
    children: PropTypes.any, // eslint-disable-line
    component: PropTypes.any, // eslint-disable-line
    visible: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string,
    offset: PropTypes.string,
    dismissable: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
}

Modal.defaultProps = {
    visible: false,
    width: '65vw',
    height: 'auto',
    offset: '10vh',
    dismissable: false,
    children: null,
    component: null,
}

const StyledModal = radium(Modal)

const ConnectedModal = connect(mapState, mapDispatch)(StyledModal)

export const withModal = (component, props) => {
    return () => (
        <ConnectedModal
            {...props}
            component={component}
        />
    )
}

export default ConnectedModal
