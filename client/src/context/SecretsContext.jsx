import { createContext, useContext, useState } from "react";

export const SecretsContext = createContext();

export const useSecrets = () => {
    const { secrets, setSecrets } = useContext(SecretsContext);
    return {secrets, setSecrets};
}

const SecretsProvider = (props) => {
    const [secrets, setSecrets] = useState([{
        "title": "The Singing Shower Mishap",
        "description": "Belted out my favorite song in the shower only to realize later that the window was wide open and the neighbors heard it all."
    }]);
    return (
        <SecretsContext.Provider value={{ secrets, setSecrets }}>
            {props.children}
        </SecretsContext.Provider>
    );
};
export default SecretsProvider;