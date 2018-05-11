/*
    eslint
        import/prefer-default-export: off
*/

import { createSSRRender } from 'create-react-app-ssr/lib/create-ssr-render'
import Root from 'app/Root'
import RootStatic from 'app/RootStatic'
import { createStore } from 'app/store'

export const staticRender = createSSRRender({
    createStore,
    ClientApp: Root,
    StaticApp: RootStatic,
})
