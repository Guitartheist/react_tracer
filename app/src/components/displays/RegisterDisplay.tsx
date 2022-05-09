import React, { useState } from "react";

import { useRegisterAppUserMutation } from '../../common/services/appUserSlice'

function RegisterDisplay() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [register, result] = useRegisterAppUserMutation({})

    function RegisterUser() {
        register({ username, email, password })
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card max-320" >
                <div className="card-body">
                    <h3>Register</h3>
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
