
export const start = () => (dispatch) => {
    console.log('start gallery service')
    dispatch({ type: 'start-gallery-service' })
}
