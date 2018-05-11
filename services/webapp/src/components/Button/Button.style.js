
import { colors } from 'styles'

const getStyles = () => ({
    wrapper: {
        backgroundColor: colors.primary,
        color: colors.white,
        padding: '3px 10px',
        borderWidth: 0,
        borderRadius: 4,
        outline: 'none',
        cursor: 'pointer',
        ':active': {
            backgroundColor: colors.primaryDark,
        },
        link: {
            color: colors.primary,
            backgroundColor: 'transparent',
            ':active': {
                color: colors.white,
            },
        },
    },
})

export default getStyles
