
export const start = () => (dispatch) => {
    console.log('start images service')
    dispatch({ type: 'start-images-service' })
}
