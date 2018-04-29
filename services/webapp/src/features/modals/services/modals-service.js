
import { setModal } from '../reducers/modals-reducer'

export const openModal = (id, data = {}) => setModal(id, data)

export const closeModal = id => setModal(id, null)
