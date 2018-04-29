
import { fonts } from 'app/styles'

const getStyles = () => ({
    wrapper: {
        // layout
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 10,

        // appearance
        ...fonts.title,
    },
})

export default getStyles
