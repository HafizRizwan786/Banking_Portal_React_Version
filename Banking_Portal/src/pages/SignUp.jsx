import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { storeUser } from "../utils/storage"
import { useToast } from "../context/ToastContext"
import { validateEmail, validatePassword, validateName, validateBank} from "../utils/validation"

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [bank, setBank] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { showToast } = useToast();

    const validateForm = () => {
        const newErrors = {};
        
        const nameVal = validateName(name);
        if (!nameVal.valid) newErrors.name = nameVal.message;

        const emailVal = validateEmail(email);
        if (!emailVal.valid) newErrors.email = emailVal.message;

        const bankVal = validateBank(bank);
        if (!bankVal.valid) newErrors.bank = bankVal.message;

        const passVal = validatePassword(password);
        if (!passVal.valid) newErrors.password = passVal.message;

        if (password !== confirm) {
            newErrors.confirm = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        const user = {
            id: Date.now().toString(),
            name,
            email,
            bank,
            password,
            profileImage: "/images/default_user.png",
            balance: 0,
            totalDeposit: 0,
            totalWithDraw: 0
        };

        try {
            // Await the new async storeUser function
            const result = await storeUser(user);
            
            if (!result.success) {
                showToast(result.message, 'error');
                return;
            }

            showToast(result.message, 'success');
            
            // Clean up
            setConfirm('');
            setName('');
            setEmail('');
            setBank('');
            setPassword('');
            setErrors({});

            navigate('/login');
        } catch (error) {
            showToast('Failed to create account', 'error');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="signup-page">
            <div className="signup-container">
                <img src="/images/image.png" alt="Banking App Logo" />
                <h1>Create Account</h1>
                <p>Create your banking account to continue.</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if(errors.name) setErrors({...errors, name: null});
                        }} 
                        autoComplete="name"
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if(errors.email) setErrors({...errors, email: null});
                        }} 
                        autoComplete="email"
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}


                    <label htmlFor="bank">Select Bank</label>
                    <select 
                    name="bank" 
                    id="bank"
                    onChange={(e)=> {
                        setBank(e.target.value);
                        if(errors.bank) setErrors({...errors, bank: null});
                    }}
                    >
                        <option value="no">-- Select Bank --</option>
                        <option value="hbl">HBL Bank</option>
                        <option value="ubl">UBL Bank</option>
                        <option value="meezan">Meezan Bank</option>
                        <option value="faisal">Faisal Bank</option>
                    </select>
                    {errors.bank && <span className="field-error">{errors.bank}</span>}



                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if(errors.password) setErrors({...errors, password: null});
                        }} 
                        autoComplete="new-password"
                    />
                    {errors.password && <span className="field-error">{errors.password}</span>}

                    <label htmlFor="confirm">Confirm Password</label>
                    <input 
                        type="password" 
                        name="confirm" 
                        id="confirm" 
                        placeholder="Confirm your password" 
                        value={confirm}
                        onChange={(e) => {
                            setConfirm(e.target.value);
                            if(errors.confirm) setErrors({...errors, confirm: null});
                        }} 
                        autoComplete="new-password"
                    />
                    {errors.confirm && <span className="field-error">{errors.confirm}</span>}

                    <div className="btn">
                        <button id="create" type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>
                </form>

                <div className="already">
                    <p>Already have an account?</p>
                    <Link to='/login'>Login</Link>
                </div>

                <div className="back">
                    <Link to="/">Back to Home</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp