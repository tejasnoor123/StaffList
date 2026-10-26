import "./LoginPage.css";
import { useState } from "react";
import {  signinwithgoogle,  signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../Utlities/firebase";
import { useNavigate, Link } from "react-router-dom";


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function handleEmailLogin(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setMessage("");
            const userCredential = await signInAuthUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            await createUserDocumentFromAuth(user);
            setMessage("Login successful! Redirecting...");
            setTimeout(() => {
                navigate("/myprofile");
            }, 1000);
        } catch (error) {
            console.error("Login error:", error);
            setMessage(`Login failed: ${error.message}`);
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
            console.log("Logged in user:", user);

            // Store user data in Firestore 'users' collection
            await createUserDocumentFromAuth(user);
            setMessage("Login successful! Redirecting...");
            
            // Navigate to myprofile after successful authentication
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
        <div className="login-page">
            <h2>Welcome Back</h2>
            {message && <p className="status-message">{message}</p>}

            <form onSubmit={handleEmailLogin}>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
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
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
}

export default LoginPage;