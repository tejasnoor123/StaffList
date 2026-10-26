import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utlities/firebase";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = { currentUser, setCurrentUser, user: currentUser, loading };

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
export const useAuth = () => useContext(UserContext);

export default UserProvider;
