import React, { useContext, useEffect, useState } from 'react';
//import { useDispatch } from 'react-redux';
import { Outlet, Link } from "react-router-dom";
import { useLogoutAppUserMutation } from '../../common/services/appUserSlice';
import { useLazyFindCartByCartIdQuery } from '../../common/services/cartSlice';
import { storeCartData, storeCartItems } from '../../common/slices/cartSlice';
import CartContextProvider, { CartContext } from './cart/CartContext';
import CartIcon from './cart/CartIcon';

function Navbar() {
	//const dispatch = useDispatch();
	const [logout, result] = useLogoutAppUserMutation();
	/*
	const [getCart, cartResults, lastPromiseInfo] = useLazyFindCartByCartIdQuery();
		
	const cartId = localStorage.getItem("cartId");
	if (cartId && cartId !== lastPromiseInfo.lastArg) {
		getCart(cartId);
	}

	useEffect(() => {
		if (cartResults && cartResults.data) {
			const {
				cartData,
				cartItems
			} = cartResults.data;
			dispatch(storeCartData(cartData));
			dispatch(storeCartItems(cartItems));
		}
	}, [cartResults])	
*/
	function logoutAction() {
		logout('');
	}

	return (
		<>						
			<CartContextProvider>
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
							fontFamily: 'Garamond, serif',
							fontSize: '1em',								
						}}>Afternoon </p>
						<p style={{
							display: 'inline',
							fontFamily: "'Brush Script MT', cursive",
							fontSize: '1.4em',
						}}>Divebar</p>
					</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							{ !localStorage.getItem('appUser') ?

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
									<li className="nav-item">
										<Link className="nav-link active" aria-current="page" to='/create'>Create</Link>
									</li>
								</ul>
							:  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
									<li className="nav-item">
										<Link className="nav-link active" aria-current="page" to='/userlist'>Roll Call</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link active" aria-current="page" to={`/profile/${localStorage.getItem('appUser')}`}>My Profile</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link active" aria-current="page" to='/' onClick={logoutAction}>Logout {localStorage.getItem('appUser')}</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link active" aria-current="page" to='/create'>Create</Link>
									</li>
								</ul> }
						</div>
						<div className="d-flex">
							<ul className="navbar-nav me-auto mb-lg-0">
								<li className="nav-item">													
									<CartIcon />
								</li>
							</ul>
						</div>
						<div className="d-flex flex-row-reverse bd-highlight">
								<ul className="navbar-nav me-auto mb-2 mb-lg-auto">
										<li className="nav-item">
												<Link className="nav-link active" aria-current="page" to="/darkmode">Darkmode</Link>
										</li>
								</ul>
						</div>
				</div>
			</nav>
			<Outlet />	
			</CartContextProvider>
		</>
	);
}

export default Navbar;
