import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useGetUserByUserNameQuery, useUpdateAppUserMutation } from '../../common/services/appUserSlice'

function UserDisplay() {
    const [update, result] = useUpdateAppUserMutation();

    const { userName } =  useParams();
    const { currentData , isFetching, isError, isLoading, error } = useGetUserByUserNameQuery( userName ? userName : '' );

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [displayError, setDisplayError] = useState("")

    // If user email provided by server is null, hide edit controls.
    let hideEdits = currentData ? currentData.email ? false : true : true;

    function UpdateUser() {
        try{
            email ? email : currentData ? setEmail(currentData.email) : '';
            const payload = update({ username : userName ? userName : '', email, password }).unwrap();
            payload.then(user=>{
            })
          } catch (error) {
            setDisplayError('Update Failed')
          }
    }

    return (
        <div className="d-flex justify-content-center">
            {
                displayError ?
                <h3>{displayError}</h3> : ''
            }
            {
                isFetching ?
                <h3>Refreshing...</h3> : ''
            }
            {
                isLoading ?
                <h3>Loading...</h3> : ''
            }
            {
                isError ?
                <h3>{error}</h3> : ''
            }
            {currentData
                ? 
                    <div className="card max-320" >
                        <div className="card-body">
                            <h3>{userName}</h3>
                            <label hidden={hideEdits}>Email</label>
                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control"
                                    defaultValue={currentData.email}
                                    aria-label="Email"
                                    aria-describedby="basic-addon1"
                                    hidden={hideEdits}
                                    onChange={(e) => {
                                            setEmail(e.target.value);
                                    }} />
                            </div>
                            <label hidden={hideEdits}>New Password</label>
                            <div className="input-group mb-3">
                                
                                <input type="password"
                                    className="form-control"
                                    placeholder="Optional"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    hidden={hideEdits}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }} />
                            </div>
                            <p className="btn btn-primary" hidden={hideEdits} onClick={UpdateUser}>Save Changes</p>
                        </div>
                    </div>
                : 'No data available'}
        </div>
        
    );
}

export default UserDisplay;
