
import { colors, fonts } from 'styles'

const getStyles = () => ({
    wrapper: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.defaultLighter,
        borderRadius: 4,
    },
    item: {
        ...fonts.text,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'transparent',
        padding: '5px 10px',
        normal: {
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            borderBottomColor: colors.defaultLighter,
        },
        clickable: {
            cursor: 'pointer',
        },
        ':hover': {
            backgroundColor: colors.primaryLight,
        },
    },
})

export default getStyles
