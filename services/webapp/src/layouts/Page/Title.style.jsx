
import { fonts } from 'styles'

const getStyles = () => ({
    wrapper: {
        // layout
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 10,

        // appearance
        ...fonts.title,

        // inside a section
        standalone: {
            marginLeft: 50,
            marginRight: 50,
        },
    },
})

export default getStyles
