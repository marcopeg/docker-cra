
import { colors, fonts } from 'app/styles'

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
