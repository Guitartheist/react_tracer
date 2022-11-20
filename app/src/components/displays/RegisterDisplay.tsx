import React, { useState } from "react";

import { useRegisterAppUserMutation } from '../../common/services/appUserSlice'
import { useNavigate } from 'react-router-dom';

function RegisterDisplay() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [register, result] = useRegisterAppUserMutation({})
    const navigate = useNavigate()
    const [displayError, setDisplayError] = useState("")

    function RegisterUser() {
        try{
        const payload = register({ username, email, password }).unwrap();
        console.log('fulfilled', payload.then(user=>{
            navigate('/login')
        }))
      } catch (error) {
        setDisplayError('Registration Failed')
      }
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card max-320" >
                <div className="card-body">
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
                    <p className="btn btn-primary" onClick={RegisterUser}>Register</p>
                </div>
            </div>
        </div>
    );
}

export default RegisterDisplay;
