import React from "react";
import { useLogoutAppUserQuery } from '../../common/services/appUserSlice';
import { useNavigate } from 'react-router-dom';

function LogoutDisplay() {
    useLogoutAppUserQuery('');
    window.location.reload();
    const navigate = useNavigate();
    navigate('/login');

    return (
        <div className="d-flex justify-content-center">
            <div className="card mw-320" >
                <div className="card-body">
                    <h3>Logged Out</h3>
                </div>
            </div>
        </div>
    );
}

export default LogoutDisplay;