/*
    eslint
        import/prefer-default-export: off
*/

export const pause = timeout =>
    new Promise(resolve => setTimeout(resolve, timeout))
