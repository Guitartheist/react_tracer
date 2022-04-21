import React from 'react';

function RegisterDisplay() {
    return (
        <div className="d-flex justify-content-center">
            <div className="card max-320" >
                <div className="card-body">
                <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <p className="btn btn-primary">Register</p>
                </div>
            </div>
        </div>
    );
}

export default RegisterDisplay;
