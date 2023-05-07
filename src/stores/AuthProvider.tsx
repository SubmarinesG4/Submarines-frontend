import { createContext, Dispatch, ReactElement, ReactNode, SetStateAction, useContext, useState } from "react";

interface AuthProviderProps {
    children: ReactNode,
    authenticated: boolean
}

type AuthContextType = {
    auth: boolean,
    setAuth: Dispatch<SetStateAction<boolean>>
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ authenticated, children }: AuthProviderProps): ReactElement {
    const [auth, setAuth] = useState<boolean>(authenticated);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext);
}

