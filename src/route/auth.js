import { useContext } from "react";
import { UserContext } from "../usercontext/usercontext";
import { auth } from "../Utlities/firebase";

export function useAuth() {
    const context = useContext(UserContext);
    const user = context?.currentUser || auth.currentUser;
    return {
        user,
        currentUser: user,
        loading: context?.loading ?? false
    };
}

export default useAuth;
