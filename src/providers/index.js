import React, { useMemo, useContext } from 'react'
import ElectronService from './electron'

const ServiceContext = React.createContext(null)

export const ServiceProvider = ({children}) => {
    
    const electron = useMemo(() => new ElectronService(), [])
    const recorder = useMemo(() => new RecorderService(), [])

    const services = {
        electron
    }

    return (
        <ServiceContext.Provider value={services}>
            {children}
        </ServiceContext.Provider>
    )
}

/* -------------------------------------------------------------------------- */
/*                                    HOOKS                                   */
/* -------------------------------------------------------------------------- */

export function useService(name) {
    const services = useContext(ServiceContext)
    return services[name]
}