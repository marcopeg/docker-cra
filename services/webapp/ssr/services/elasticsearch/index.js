/* eslint consistent-return: off */

let library = null
let settings = null
const connections = new Map()

const init = (customLibrary, customSettings) => {
    library = customLibrary
    settings = customSettings
}

const start = clusterName => new Promise((resolve, reject) => {
    try {
        const clusterSettings = settings.clusters[clusterName]
        const client = new library.Client({ hosts: clusterSettings.hosts })
        client.cluster.health({}, (err) => {
            if (err) {
                throw err
            }
            connections.set(clusterName, {
                settings: clusterSettings,
                client,
            })
            resolve()
        })
    } catch (err) {
        reject(err)
    }
})

const call = (clusterName, method, payload) =>
    new Promise((resolve, reject) => {
        const handler = (err, resp) => {
            if (err) {
                return reject(err)
            }
            return resolve(resp)
        }

        try {
            const client = connections.get(clusterName).client

            // handle nested client keywords
            if (method.indexOf('cat.') !== -1) {
                return client.cat[method.split('.')[1]](payload, handler)
            }

            if (method.indexOf('cluster.') !== -1) {
                return client.cluster[method.split('.')[1]](payload, handler)
            }

            if (method.indexOf('indices.') !== -1) {
                return client.indices[method.split('.')[1]](payload, handler)
            }

            if (method.indexOf('ingest.') !== -1) {
                return client.ingest[method.split('.')[1]](payload, handler)
            }

            if (method.indexOf('nodes.') !== -1) {
                return client.nodes[method.split('.')[1]](payload, handler)
            }

            if (method.indexOf('remote.') !== -1) {
                return client.remote[method.split('.')[1]](payload, handler)
            }

            if (method.indexOf('snapshot.') !== -1) {
                return client.snapshot[method.split('.')[1]](payload, handler)
            }

            if (method.indexOf('tasks.') !== -1) {
                return client.tasks[method.split('.')[1]](payload, handler)
            }

            // handle first level keywords
            client[method](payload, handler)
        } catch (e) {
            reject(e)
        }
    })

module.exports = {
    init,
    start,
    call,
}
