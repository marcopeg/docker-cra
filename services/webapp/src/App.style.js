import { fonts } from 'styles'

const getStyles = () => ({
    wrapper: {
        marginTop: 80,
    },
    version: {
        ...fonts.text,
        color: '#aaa',
        position: 'fixed',
        bottom: 10,
        right: 10,
    },
})

export default getStyles
