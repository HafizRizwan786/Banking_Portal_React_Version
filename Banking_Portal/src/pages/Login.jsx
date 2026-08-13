import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { validateLogin } from "../utils/storage"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import { validateEmail } from "../utils/validation"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();
    const { showToast } = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Basic validation
        const emailValidation = validateEmail(email);
        if (!emailValidation.valid) {
            showToast(emailValidation.message, 'warning');
            return;
        }

        if (!password) {
            showToast('Password is required', 'warning');
            return;
        }

        setIsLoading(true);

        try {
            // Using await because validateLogin now hashes password (async)
            const result = await validateLogin(email, password);
            
            if (!result.success) {
                showToast(result.message, 'error');
                return;
            }

            // Sync with context
            login(result.user);
            showToast(result.message, 'success');
            
            // Clean up
            setEmail('');
            setPassword('');
            navigate('/dashboard');
        } catch (error) {
            showToast('An unexpected error occurred', 'error');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="signup-container">
                <img src="/images/image.png" alt="Banking App Logo" />
                <h1>Login</h1>
                <p>Good to see you! Let&apos;s get started.</p>

                <form id="loginForm" onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Enter your email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        autoComplete="email"
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Enter your password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        autoComplete="current-password"
                    />

                    <div className="btn">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>

                <div className="already">
                    <p>Don&apos;t have an account?</p>
                    <Link to='/signup'>Sign Up</Link>
                </div>

                <div className="back">
                    <Link to='/'>Back to Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Login