
const validatePassword = async (passw) => {
    if (!passw) {
        throw new Error('password is missing')
    }
    if (passw.length < 3) {
        throw new Error('password is too short')
    }
    return true
}

module.exports = {
    validatePassword,
}
