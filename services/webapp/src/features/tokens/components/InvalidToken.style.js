
import { fonts, colors } from 'app/styles'

const getStyles = () => ({
    wrapper: {},
    details: {
        marginLeft: 10,
        marginTop: 5,
    },
    error: {
        ...fonts.text,
        color: colors.error,
    },
})

export default getStyles
