import React, { useState } from "react";
import { useLoginAppUserMutation } from '../../common/services/appUserSlice'

function LoginDisplay() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [login, result] = useLoginAppUserMutation({})

    function LoginUser() {
        login({ username, password })
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card mw-320" >
                <div className="card-body">
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
                    <p className="btn btn-primary" onClick={LoginUser}>Login</p>
                </div>
            </div>
        </div>
    );
}

export default LoginDisplay;
