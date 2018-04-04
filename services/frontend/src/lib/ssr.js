/*
    eslint
        import/prefer-default-export: off
*/

const createContext = () => {
    const awaitStack = []
    const callbacks = {}

    let checkTimer = null

    const upsert = (action) => {
        if (!callbacks[action]) {
            callbacks[action] = []
        }
    }

    const emit = (action) => {
        upsert(action)
        callbacks[action].forEach((ticket) => {
            if (ticket.once) {
                ticket.off()
            }
            ticket.fn()
        })
    }

    const checkStack = () => {
        if (awaitStack.length <= 0) {
            emit('complete')
        }
        return awaitStack.length
    }

    const unsubscribe = (action, ticket) => {
        const idx = callbacks[action].indexOf(ticket)
        callbacks[action].splice(idx, 1)
    }

    const subscribe = (action, fn, once = false) => {
        upsert(action)
        const ticket = { fn, once }
        ticket.off = () => unsubscribe(action, ticket)

        callbacks[action].push(ticket)
        setTimeout(checkStack)
        return ticket
    }

    const reducer = {
        checkStack,
        on: (action, fn) => subscribe(action, fn, false),
        once: (action, fn) => subscribe(action, fn, true),
        await: (p) => {
            // console.log('push in stack')
            awaitStack.push(p)

            p.then(() => {
                clearTimeout(checkTimer)
                const idx = awaitStack.indexOf(p)
                awaitStack.splice(idx, 1)
                checkTimer = setTimeout(checkStack)
            })

            return p
        },
    }


    return {
        reducers: {
            ssr: state => state || reducer,
        },
    }
}

export default createContext
