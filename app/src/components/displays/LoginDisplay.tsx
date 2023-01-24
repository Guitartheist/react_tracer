import React, { useState } from "react";
import { useLoginAppUserMutation } from '../../common/services/appUserSlice'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { storeUserData } from "../../common/slices/userSlice";

function LoginDisplay() {
		const dispatch = useDispatch();
		const navigate = useNavigate();
		const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, result] = useLoginAppUserMutation({});
    const [displayError, setDisplayError] = useState("")

    function LoginUser() {
        try{
            const payload = login({username, password, email:''}).unwrap();
            console.log('fulfilled', payload.then(user=>{
							const userId = user.id;
							const userEmail = user.email;
							dispatch(
								storeUserData({
									userId,
									username,
									userEmail,
								})
							);
							navigate('/profile/'+username)
            }))
          } catch (error) {
            setDisplayError('Login Failed')
            console.log('ok then')
          }
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card mw-320" >
                <div className="card-body">
                {
                displayError ?
                <h3>{displayError}</h3> : ''
            }
                    <h3>Login</h3>
                    <label>Username</label>
                    <div className="input-group mb-3">
                        <input type="text" 
                        className="form-control" 
                        placeholder="Username" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }} />
                    </div>
                    <label>Password</label>
                    <div className="input-group mb-3">
                        <input type="password" 
                        className="form-control" 
                        placeholder="Password" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                    </div>
                    <p className="btn btn-primary" onClick={LoginUser}>Login</p>
                </div>
            </div>
        </div>
    );
}

export default LoginDisplay;
