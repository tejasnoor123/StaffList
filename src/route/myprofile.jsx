import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";

function MyProfile() {
    const { user } = useAuth();
    const navigate = useNavigate();


    return (
        <div>
            {user == null ? (
                <p>Please log in to view your profile.</p>
            ) : (
                <>
                    <h3>Name: {user.currentName}</h3>
                    <p>Email: {user.email}</p>
                </>
            )}
        </div>
    );
}

export default MyProfile;
