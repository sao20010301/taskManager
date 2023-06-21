import { useState, createContext, useContext } from "react"

const UserContext = createContext({})

export const LoginContextProvider = ({children}) => {
    const [user, setUser] = useState(undefined)
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function UserLogin() {
    return useContext(UserContext)
}