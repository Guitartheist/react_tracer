import React, { useState } from "react";

import { useRegisterAppUserMutation } from '../../common/services/appUserSlice'
import { useNavigate } from 'react-router-dom';

function RegisterDisplay() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [register, result] = useRegisterAppUserMutation({})
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")

    function RegisterUser() {
      register({ username, email, password })
        .unwrap()
        .then((payload) => {
            console.log('fulfilled', payload);
            navigate('/login')
        })
        .catch((error) => {
            console.error('rejected', error);
            setErrorMessage(error.data.message);
        })
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card max-320" >
                <div className="card-body">
                    {errorMessage ? <p className="text-danger">{errorMessage}</p> : ''}
                    <h3>Register</h3>
                    <label>Email</label>
                    <div className="input-group mb-3">
                        
                        <input type="text"
                            className="form-control"
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrorMessage("");
                            }} />
                    </div>
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
                    <p className="btn btn-primary" onClick={RegisterUser}>Register</p>
                </div>
            </div>
        </div>
    );
}

export default RegisterDisplay;
