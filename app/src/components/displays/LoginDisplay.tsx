import React, { useState } from "react";
import { useLoginAppUserMutation } from '../../common/services/appUserSlice'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { storeUserData } from "../../common/slices/userSlice";

function LoginDisplay() {
  const dispatch = useDispatch();
	const navigate = useNavigate()    
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [login] = useLoginAppUserMutation({})
	const [errorMessage, setErrorMessage] = useState("")

	function LoginUser() {
		login({username, password, email:''})
				.unwrap()
				.then((payload) => {
						console.log('fulfilled', payload);
						const userId = payload.id;
						const userEmail = payload.email;
						dispatch(
							storeUserData({
								userId,
								username,
								userEmail,
							})
						);
						navigate('/profile/'+username);
						window.location.reload();
				})
				.catch((error) => {
						console.error('rejected', error);
						setErrorMessage(error.data.message);
				})
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card mw-320" >
                <div className="card-body">
                    {errorMessage ? <p className="text-danger">{errorMessage}</p> : ''}
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
                            setErrorMessage("");
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
                            setErrorMessage("");
                        }} />
                    </div>
                    <p className="btn btn-primary" onClick={LoginUser}>Login</p>
                </div>
            </div>
        </div>
    );
}

export default LoginDisplay;
