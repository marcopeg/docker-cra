
import { colors, fonts } from 'app/styles'

const getStyles = () => ({
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#eee',
    },
    wrapper: {
        display: 'flex',
    },
    sidebar: {
        width: 220,
        height: '100vh',
        overflow: 'scroll',
        backgroundColor: colors.default,
        color: colors.white,
        borderRightWidth: 1,
        borderRightStyle: 'solid',
        borderRightColor: colors.black,
    },
    main: {
        flex: 1,
        backgroundColor: colors.white,
        overflow: 'auto',
    },
    title: {
        ...fonts.title,
        color: colors.white,
        marginTop: 15,
        marginBottom: 20,
        marginLeft: 10,
    },
    subtitle: {
        ...fonts.text,
        fontSize: 10,
        color: colors.primary,
        backgroundColor: colors.defaultDark,
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 10,
    },
    menu: {
        display: 'flex',
        flexDirection: 'column',
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderTopColor: colors.defaultLight,
    },
    menuItem: {
        ...fonts.text,
        color: colors.white,
        textDecoration: 'none',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: colors.defaultLight,
        cursor: 'pointer',
        ':hover': {
            backgroundColor: colors.defaultLight,
        },
    },
})

export default getStyles
