import { useState } from "react";
import { signinwithgoogle, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth 
} from "../Utlities/firebase";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";

function SignUp() {



    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function handleEmailSignUp(e) { e.preventDefault();

        if (password !=confirmPassword){
            setMessage("passwords does not match.");
            return;
        }

       

        try {
            setLoading(true);
            setMessage("");

            const userCredential = await createAuthUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Store user in Firestore with their name
            await createUserDocumentFromAuth(user, { name });
            setMessage("Account created successfully! Redirecting...");

            setTimeout(() => {
                navigate("/myprofile");
            }, 1000);
        } catch (error) {
            console.error("Error creating account:", error);
            setMessage(`Sign-up failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleSignin() {
        try {
            setLoading(true);
            setMessage("");
            const response = await signinwithgoogle();
            const user = response.user;

            // Store user in Firestore
            await createUserDocumentFromAuth(user);
            setMessage("Sign-in successful! Redirecting...");

            setTimeout(() => {
                navigate("/myprofile");
            }, 1000);
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setMessage(`Sign-in failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="sign-page">
            <h2>Create an Account</h2>

            {message && <p className="status-message">{message}</p>}

            <form onSubmit={handleEmailSignUp}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Sign Up"}
                </button>
            </form>

            <button 
                type="button" 
                className="google-button" 
                onClick={handleGoogleSignin}
                disabled={loading}
            >
                {loading ? "Signing in..." : "Continue with Google"}    
            </button>   

            <p>
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    );
}

export default SignUp;