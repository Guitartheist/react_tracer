import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { useGetUsernameFromTokenQuery } from '../../common/services/appUserSlice';

function Navbar() {

    const { currentData , isFetching } = useGetUsernameFromTokenQuery( '', { refetchOnMountOrArgChange: true } );

    return (
        <>
            <nav 
                className="navbar navbar-expand-lg navbar-light bg-light"
                style={{
                    marginBottom: '1rem',
                }}
            >
                <div className="container-fluid">
                    <a 
                        className="navbar-brand" 
                        href="/" 
                        style={{
                            marginBottom: '0',
                            paddingBottom: '0',
                            borderBottom: '1px solid black'
                        }}>
                        <p style={{
                            display: 'inline',
                            fontFamily: "'Brush Script MT', cursive",
                            fontSize: '1.5em',
                            color: '#FC3F26',
                            textShadow: '0 0 1px #fff,0 0 2px #fff,0 0 3px #fff,0 0 0px #FC3F26,0 0 15px #FC3F26,0 0 25px #FC3F26,0 0 40px #FC3F26,0 0 50px #FC3F26'
                        }}>AfterNoon </p>
                        <p style={{
                            display: 'inline',
                            fontFamily: 'Garamond, serif',
                            fontSize: '1.1em',
                            color: '#1A56B0',
                            //textShadow: '0 0 1px #fff,0 0 2px #fff,0 0 3px #fff,0 0 0px #1A56B0,0 0 25px #1A56B0,0 0 35px #1A56B0,0 0 50px #1A56B0,0 0 60px #1A56B0'
                        }}>Divebar</p>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        { isFetching ? 'checking token' : ''}
                        {  !currentData ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/userlist'>Roll Call</Link>
                                </li>
                            </ul>
                        :  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/userlist'>Roll Call</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={`/profile/${currentData.username}`}>My Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/logout'>Logout {currentData.username}</Link>
                                </li>
                            </ul> }
                    </div>
                    <div className="d-flex flex-row-reverse bd-highlight">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/darkmode">Darkmode</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Navbar;
