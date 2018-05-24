
import { colors } from 'styles'

const getStyles = () => ({
    link: {
        display: 'block',

        color: colors.primary,
        textDecoration: 'none',

        ':hover': {
            color: colors.white,
        },
    },
    title: {
        display: 'block',

        color: colors.primary,
        textDecoration: 'none',

        ':hover': {
            color: colors.primaryDark,
        },
    },
})

export default getStyles
