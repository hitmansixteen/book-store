import { createContext, useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { data: session } = useSession();
    const [user, setUser] = useState(null);

    const updateUser = async (userData) => {
        setUser(userData);
    };

    useEffect(() => {
        if (session) {
            setUser(session.user);
        }
    }, [session]);

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
