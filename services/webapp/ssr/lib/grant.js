
const normalizeGrants = grants => (
    Array.isArray(grants)
        ? grants
        : [grants]
).filter(i => i)

const checkGrant = granted => (required) => {
    // token has specific grant
    if (granted.indexOf(required) !== -1) {
        return true
    }

    // token has wildchar grant
    const tokens = required.split(':')
    if (granted.indexOf(`${tokens[0]}:*`) !== -1) {
        return true
    }

    // required accepts any sub-grant
    if (required.indexOf(':?') !== -1) {
        return granted.some((grant) => {
            const t1 = grant.split(':')
            const t2 = required.split(':')
            if (t1[0] === t2[0]) {
                return true
            }
        })
    }

    return false
}

const grant = (gr, rq) => {
    const granted = normalizeGrants(gr)
    const required = normalizeGrants(rq)

    // token has no grants
    if (!granted.length) {
        return false
    }

    // route requires no grants
    if (!required.length) {
        return true
    }

    // token has admin grants
    if (granted[0] === '*') {
        return true
    }

    return required.every(checkGrant(granted))
}

module.exports = grant
