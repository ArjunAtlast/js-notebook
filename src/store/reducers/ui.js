import { UI } from '../types'

const initialState = {
    mode: 'light'
}

export default function (state=initialState, action) {
    switch(action.type) {
        case UI.SET_MODE:
            return {
                ...state,
                mode: action.payload
            }
            break
        default:
            return state
    }
}