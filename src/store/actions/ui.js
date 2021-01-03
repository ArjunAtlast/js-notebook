import { UI } from '../types'

/**
 * Set the current display mode to dark or light.
 * @param {'light'|'dark'} mode - The display mode to set
 */
export const SetMode = (mode='light') => ({
    type: UI.SET_MODE,
    payload: mode
})