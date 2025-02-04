import React from "react";

export interface AccessTokenContextType {
    token: string;
    setToken: (x:string)=>void
}

const AccessTokenContext = React.createContext<AccessTokenContextType>({token: ""} as AccessTokenContextType)

export default AccessTokenContext