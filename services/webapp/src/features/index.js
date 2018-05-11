/**
 * List all the features that need synchronous loading.
 * Services and listeners will be loded accordingly to this order.
 */

export default [
    require('redux-events-middleware/lib/location'),
    require('./menu'),
    require('./dashboard'),
]
