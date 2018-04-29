
import { fonts, colors } from 'app/styles'

const getStyles = () => ({
    wrapper: {
        ...fonts.code,
        fontStyle: 'italic',
        color: colors.default,
        background: '#eee',
        padding: '3px 10px',
        wordWrap: 'break-word',
    },
})

export default getStyles
