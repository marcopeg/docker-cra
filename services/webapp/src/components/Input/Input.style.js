
import { fonts, colors } from 'styles'

const getStyles = () => ({
    input: {
        ...fonts.text,
        outline: 'none',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.default,
        borderRadius: 4,
        padding: '2px 5px',
        marginBottom: 5,
        ':focus': {
            borderColor: colors.primary,
        },
    },
})

export default getStyles
