
import { fonts, colors } from 'app/styles'

const getStyles = () => ({
    wrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        width: '100vw',
        height: '100vh',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        height: '70vh',
    },
    title: {
        ...fonts.title,
    },
    error: {
        ...fonts.text,
        color: colors.error,
        marginLeft: 10,
    },
    input: {
        display: 'block',
    },
})

export default getStyles
