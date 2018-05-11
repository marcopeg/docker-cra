
import { colors, fonts } from 'styles'

const getStyles = () => ({
    wrapper: {
        // position
        position: 'fixed',
        top: 0,
        left: 0,

        // layout
        display: 'flex',
        width: '100vw',
        height: 80,
        alignItems: 'stretch',

        // appearance
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: colors.black,
        background: colors.white,
    },
    title: {
        // layout
        display: 'flex',
        marginLeft: 50,
        marginRight: 40,
        alignItems: 'center',

        // appearance
        ...fonts.title,
    },
    items: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
    },
    item: {
        // layout
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,

        // appearance
        ...fonts.text,
        color: colors.primary,
        backgroundColor: colors.white,
        textDecoration: 'none',

        ':hover': {
            color: colors.primaryDark,
            backgroundColor: colors.primaryLight,
        },
    },
})

export default getStyles
