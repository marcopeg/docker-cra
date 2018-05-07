/*
    eslint
        import/prefer-default-export: off
*/

import Root from 'app/containers/Root'
import RootStatic from 'app/containers/RootStatic'
import { createStore } from 'app/store'
import { createSSRRender } from 'create-react-app-ssr/lib/create-ssr-render'

export const staticRender = createSSRRender({
    createStore,
    ClientApp: Root,
    StaticApp: RootStatic,
})
