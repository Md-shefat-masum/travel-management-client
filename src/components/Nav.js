import React, { useContext, useEffect, useState } from 'react'
import {
    Link,
    useHistory
} from "react-router-dom";
import authContext from '../context/authContex';

import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import FireBaseConfig from '../config/FireBaseConfig';

// Initialize Firebase
initializeApp(FireBaseConfig);

export default function Nav() {
    let history = useHistory();
    const context_data = useContext(authContext)
    const [toggleNav, setToggleNav] = useState(false)

    const auth = getAuth();
    let window_width = window.innerWidth;
    useEffect(() => {
        if (window_width >= 992) {
            setToggleNav(true);
        }
    }, [window_width])

    // console.log(context_data);

    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            context_data.setCheckAuth(false)
            history.push("/login");
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <div className="logo">
                            <Link to="/">
                                <h1>Travel <span>Master</span></h1>
                            </Link>
                        </div>
                        <div className="nav_body">
                            <i onClick={() => setToggleNav(!toggleNav)} className="fa fa-align-left text-dark d-sm-block d-lg-none"></i>
                            {
                                toggleNav &&
                                <div className="nav_links">
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/about">About</Link></li>
                                        <li><Link to="/events">Events</Link></li>
                                        <li><Link to="/contact">Contact</Link></li>
                                        {
                                            context_data.CheckAuth && 
                                            <li>
                                                <Link to="#/">Dashboard</Link>
                                                <ul>
                                                    <li><Link to="/my-orders">My Orders ({context_data.MyCartList.length})</Link></li>
                                                    <li><Link to="/manage-orders">Manage Orders ({context_data.CartList.length})</Link></li>
                                                    <li><Link to="/manage-service">Manage Service</Link></li>
                                                </ul>
                                            </li>
                                        }

                                        {
                                            !context_data.CheckAuth ?
                                                <li><Link to="/login">Login</Link></li>
                                                :
                                                <li>
                                                    <Link to="#/" onClick={() => logOut()}>Logout</Link>
                                                    {
                                                        context_data && context_data.authData.photoURL ?
                                                            <img src={context_data.authData.photoURL} alt="user url" style={{ height: '25px', borderRadius: '50%' }} />
                                                            : ''
                                                    }
                                                </li>
                                        }
                                    </ul>
                                </div>
                            }
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}
