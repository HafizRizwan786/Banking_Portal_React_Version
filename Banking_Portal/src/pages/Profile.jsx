import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { validateName, validatePassword } from "../utils/validation";



function Profile(){
    const {user, updateUser} = useAuth();
    const {showToast} = useToast();
    const navigate = useNavigate();

    const fileInputRef = useRef(null);
    const [profileImg, setProfileImg] = useState(user?.profileImage || "/images/default_user.png");

    const [name , setName ] = useState(user?.name || "");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    const validateForm = () => {
        const newErrors = {};

        const valName = validateName(name);
        if(!valName.valid) newErrors.name = valName.message

        if(password){
            const valPassword = validatePassword(password);
            if(!valPassword.valid) newErrors.password = valPassword.message

            if(password !== confirm){
                newErrors.confirm = "Passwords do not match";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateForm()){
            return;
        }

        setIsLoading(true);

        try{
            const updatedUser = {
                ...user,
                name
            };

            if (password) {
                updatedUser.password = password;
            }

            const success = await updateUser(
                updatedUser,
                Boolean(password)
            );

            if (success) {
                showToast('Profile Updated Successfully', 'success');
                setConfirm('');
                setName('');
                setPassword('');
                setErrors({});
                navigate('/dashboard');
            }
        }
        catch(error){
            showToast('Failed to update profile','error');
        }
        finally{
            setIsLoading(false);
        }
    }



    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if(!file) return;

        if(file.size > 1024 * 1024){
            showToast('Image size must be less than 1MB','warning');
            return;
        }

        const reader = new FileReader();
        reader.onload=()=>{
            const newImage = reader.result;
            setProfileImg(newImage);
            updateUser({...user,profileImage:newImage});
            showToast('Profile Image Updated','success');
        }

        reader.readAsDataURL(file);
    }


    return(
        <div className="profile-page">
            <div className="profile-container">
                <h1>Edit Profile</h1>
                <p>Update your personal information</p>
                
                <div className="profile-image-wrapper">
                    <input type="file" accept="image/*" id="profileImageInput" hidden onChange={handleImageChange} ref={fileInputRef}/>
                    <img src={profileImg} alt={`${user?.name || 'User'}'s profile`}  className="profile-img" />
                    <button className="profile-upload-btn" aria-label="Upload Image" onClick={()=>fileInputRef.current.click()}>
                        <i className="fa-solid fa-circle-plus" style={{ color: "rgb(101, 174, 108)" }}></i>
                    </button>
                </div>

                <form className="profile-form" action="post" onSubmit={handleSubmit}>
                    <label htmlFor="name" >Name</label>
                    <input type="text" id="name" className="profile-input"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if(errors.name) setErrors({...errors, name: null});
                        }} />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="profile-input" value={user?.email} readOnly/>

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="profile-input"
                        value={password}
                        onChange={(e) =>{
                            setPassword(e.target.value);
                            if(errors.password){
                                setErrors({...errors,password:null})
                            }
                        }} />

                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" id="confirm" className="profile-input"
                        value={confirm}
                        onChange={(e)=>{
                            setConfirm(e.target.value);
                            if(errors.confirm) setErrors({...errors,confirm:null})
                        }}
                    />

                    <div className="edit-btn">
                        <button type="submit" className="btn-save" >Save Changes</button>
                        <button type="button" className="btn-cancel" onClick={()=> navigate('/dashboard')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile