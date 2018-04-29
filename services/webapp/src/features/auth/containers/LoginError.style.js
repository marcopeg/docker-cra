
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
        width: '70vw',
        height: '70vh',
    },
    message: {
        ...fonts.title,
        color: colors.error,
        marginBottom: 25,
    },
})

export default getStyles
