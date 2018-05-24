
import { colors } from 'styles'

const getStyles = () => ({
    link: {
        display: 'inlione-block',
        color: colors.primary,
        textDecoration: 'none',
        transition: 'all .3s ease',

        ':hover': {
            color: colors.primaryDark,
        },
    },
})

export default getStyles
