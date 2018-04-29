
import { colors } from 'app/styles'

const getStyles = () => ({
    link: {
        display: 'block',

        color: colors.primary,
        textDecoration: 'none',

        ':hover': {
            color: colors.white,
        },
    },
})

export default getStyles
