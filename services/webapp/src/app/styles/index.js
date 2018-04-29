
import './styles.css'

import color from 'color'
export const fontFamily = 'Verdana'

export const colors = {
    white: '#fff',
    black: '#000',
    default: '#333',
    defaultLight: '#666',
    defaultLighter: '#aaa',
    primary: '#1997FC',
    primaryLight: color('#1997FC').lighten(0.5),
    primaryDark: color('#1997FC').darken(0.3),
    error: 'red',
}

export const fonts = {
    text: {
        fontFamily,
        fontSize: 12,
    },
    code: {
        fontFamily: 'monospace',
        fontSize: 12,
    },
    title: {
        fontFamily,
        fontSize: 16,
    },
}
