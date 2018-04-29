
const pause = async time =>
    new Promise(resolve => setTimeout(resolve, time))

module.exports = pause
