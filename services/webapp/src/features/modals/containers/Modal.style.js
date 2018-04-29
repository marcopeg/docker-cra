
import { colors, fonts } from 'app/styles'

const handlerSize = 25

const getStyles = ({ width, height, offset }) => ({
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(245, 245, 245, 0.85)',
        hidden: {
            transform: 'translate3d(0, -100vh, 0)',
        },
    },
    wrapper: {
        position: 'fixed',
        top: offset,
        left: `calc((100vw - ${width}) / 2`,
        width,
        height,
        background: '#fff',
        border: `1px solid ${colors.default}`,
        borderRadius: 4,
        boxShadow: `2px 2px 8px ${colors.defaultLighter}`,
    },
    footer: {
        borderTop: `1px solid ${colors.default}`,
        padding: '5px 10px',
    },
    closeHandler: {
        ...fonts.text,
        cursor: 'pointer',
        position: 'absolute',
        top: 0 - handlerSize / 2,
        right: 0 - handlerSize / 2,
        width: handlerSize,
        height: handlerSize,
        borderRadius: handlerSize,
        overflow: 'hidden',
        background: colors.default,
        color: colors.white,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: `2px 2px 8px ${colors.defaultLighter}`,
    },
})

export default getStyles
