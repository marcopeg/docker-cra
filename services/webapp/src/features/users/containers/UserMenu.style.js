
import { colors } from 'styles'

const getStyles = () => ({
    link: {
        color: colors.primary,
        textDecoration: 'none',

        ':hover': {
            color: colors.primaryDark,
        },
    },
})

export default getStyles
