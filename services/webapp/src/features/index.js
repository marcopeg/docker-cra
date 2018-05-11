/**
 * List all the features that need synchronous loading.
 * Services and listeners will be loded accordingly to this order.
 *
 * NOTE: only synchronous or partially sinchronous features need to
 * be listed here so that their reducers are injected and the
 * services started at boot time.
 */

export default [
    require('redux-events-middleware/lib/location'),
    require('./menu'),
]
