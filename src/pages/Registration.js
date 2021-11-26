import React, { useContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import FireBaseConfig from '../config/FireBaseConfig';
import authContext from '../context/authContex';
import { Link, useHistory } from 'react-router-dom';

initializeApp(FireBaseConfig);


function Registration() {
    let history = useHistory();
    const auth = getAuth();
    const auth_info = useContext(authContext)
    // console.log(auth_info);

    useEffect(() => {
        if(auth_info.authInfo){
            history.push('/');
        }
    }, [auth_info.authInfo, history])

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // const uid = user.uid;
            localStorage.setItem('authInfo', JSON.stringify(user));
        } else {

        }
    });

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [passwordConfirm, setpasswordConfirm] = useState('');

    const signUpHandler = (e) => {
        e.preventDefault();
        // console.log(email, password, passwordConfirm);
        if (password === passwordConfirm) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    auth_info.setAuthInfo(user);
                    // console.log(user);
                    if(auth_info.redirect_url && auth_info.redirect_url.length > 0){
                        history.push(auth_info.redirect_url);
                    }else{
                        history.push('/');
                    }
                    auth_info.setredirect_url('');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    alert(errorCode);
                    // const errorMessage = error.message;
                    // console.log(errorCode);
                    // console.log(errorMessage);
                });
        } else {
            alert('password not matched');
        }
    }

    

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Registration form</h4>
                            </div>
                            <div className="card-body">
                                <form action="#" onSubmit={(e) => signUpHandler(e)}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" onKeyUp={(e) => { setEmail(e.target.value) }} className="form-control mb-3" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" onKeyUp={(e) => { setpassword(e.target.value) }} id="password" className="form-control mb-3" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password_confirm">Password Confirm</label>
                                        <input type="password" onKeyUp={(e) => { setpasswordConfirm(e.target.value) }} id="password_confirm" className="form-control mb-3" />
                                    </div>
                                    <button className="btn btn-success">Submit</button>
                                    <p>
                                        Already have account?
                                        <Link to="/login">Register</Link>
                                    </p>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration
