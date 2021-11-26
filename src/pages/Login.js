import React, { useContext, useEffect, useState } from 'react'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import FireBaseConfig from '../config/FireBaseConfig';
import authContext from '../context/authContex';
import { Link, useHistory } from 'react-router-dom';

// Initialize Firebase
initializeApp(FireBaseConfig);
const googeleProvider = new GoogleAuthProvider();

function Login() {
    let history = useHistory();
    const auth = getAuth();
    const auth_info = useContext(authContext)
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            auth_info.setAuthInfoLoaded(true);
            if (user) {
                auth_info.setCheckAuth(true);
                auth_info.setAuthData(user);
                if(auth_info.redirect_url && auth_info.redirect_url.length > 0){
                    history.push(auth_info.redirect_url);
                }else{
                    history.push('/');
                }
            } else {
                auth_info.setCheckAuth(false);
                auth_info.setAuthData({});
            }
        });
    }, [auth_info,auth,history])

    const signInHandler = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                auth_info.setAuthData(user);
                auth_info.setredirect_url('');
                if(auth_info.redirect_url && auth_info.redirect_url.length > 0){
                    history.push(auth_info.redirect_url);
                }else{
                    history.push('/');
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                alert(errorCode);
            });
    }

    const googleSignup = () => {
        signInWithPopup(auth, googeleProvider)
            .then((result) => {
                if(auth_info.redirect_url && auth_info.redirect_url.length > 0){
                    history.push(auth_info.redirect_url);
                }else{
                    history.push('/');
                }
                auth_info.setredirect_url('');
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode+' '+errorMessage);
                auth_info.setCheckAuth(false);
            });
    }

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Login form</h4>
                            </div>
                            <div className="card-body">
                                <form action="#" onSubmit={(e) => signInHandler(e)}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" onKeyUp={(e) => { setEmail(e.target.value) }} className="form-control mb-3" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" onKeyUp={(e) => { setpassword(e.target.value) }} id="password" className="form-control mb-3" />
                                    </div>
                                    <button className="btn btn-success">Sign in</button>
                                    <p>
                                        don't have account? 
                                        <Link to="/registration">Register</Link>
                                    </p>
                                    <ul>
                                        <li>
                                            <a href="#/" onClick={() => { googleSignup() }}> 
                                                <i className="fab fa-google"></i> sign in with google
                                            </a>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
