import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) =>{

    const [available, setAvailable] = useState(false);
    
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{available, setAvailable,auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;