
const validateGrants = async (grants) => {
    if (!grants) {
        throw new Error('grants is empty')
    }

    if (!Array.isArray(grants)) {
        throw new Error('grants must be an array')
    }

    return true
}

module.exports = {
    validateGrants,
}
