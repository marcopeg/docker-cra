
import { colors, fonts } from 'styles'

const getStyles = () => ({
    wrapper: {
        // layout
        paddingTop: 30,

        // appearance
        ...fonts.text,
        color: colors.default,
    },
})

export default getStyles
