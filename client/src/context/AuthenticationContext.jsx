import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthenticationContext = createContext(null);

export const useAuthentication = () =>{
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthenticationContext);
    return {isAuthenticated, setIsAuthenticated};
}

const AuthenticationProvider = (props) => {
    console.log("authentication provide is loaded");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const getIsAuthenticated = async () => {
        try {
            const response = await axios.get("/api/auth/status");
            if (response.status == 200) setIsAuthenticated(true);
        } catch (error) {
            console.error(error);
        }
    }
    getIsAuthenticated();
    
    // useEffect(() => {
    // }, []);

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {props.children}
        </AuthenticationContext.Provider>
    );
};
export default AuthenticationProvider;