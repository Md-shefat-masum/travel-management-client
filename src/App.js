import React, { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Nav from './components/Nav'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import About from './pages/About'
// import Services from './pages/Services'
import Index from './pages/Index';
import Contact from './components/Contact';
import Registration from './pages/Registration';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ServiceDetails from './pages/EventDetails';
import Events from './pages/Events';

import PrivateRoute from './private/PrivateRoute';
import { AuthProvider } from './context/authContex';

import { initializeApp } from "firebase/app";
import FireBaseConfig from './config/FireBaseConfig';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import ServiceDetailsCart from './pages/EventDetailsCart';
import MyOrders from './pages/MyOrders';
import ManageOrders from './pages/ManageOrders';
import ManageServices from './pages/ManageServices';
import axios from 'axios';

// Initialize Firebase
initializeApp(FireBaseConfig);


export default function App() {
    const [CartList, setCartList] = useState([]);
    const [MyCartList, setMyCartList] = useState([]);
    const [CheckAuth, setCheckAuth] = useState(false);
    const [authData, setAuthData] = useState({});
    const [AuthInfoLoaded, setAuthInfoLoaded] = useState(false);
    const [redirect_url, setredirect_url] = useState('');
    // const [ApiUrl,] = useState('http://localhost:5000');
    const [ApiUrl,] = useState('https://gory-witch-39696.herokuapp.com');

    const context_value = {
        CheckAuth,
        setCheckAuth,

        redirect_url,
        setredirect_url,

        authData,
        setAuthData,

        AuthInfoLoaded,
        setAuthInfoLoaded,

        CartList,
        setCartList,

        MyCartList,
        setMyCartList,

        ApiUrl
    }
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setAuthInfoLoaded(true);

            if (user) {
                setCheckAuth(true);
                setAuthData(user);
            } else {
                setCheckAuth(false);
                setAuthData({});
            }
        });
    }, [auth])

    useEffect(() => {
        if (CheckAuth) {
            axios.get(`${ApiUrl}/carts`)
                .then(res => {
                    setCartList(res.data);
                })
            axios.get(`${ApiUrl}/my-cart/${authData.email}`)
                .then(res => {
                    setMyCartList(res.data);
                })
        }
    }, [ApiUrl, authData, CheckAuth])

    return (
        <>
            <Router>
                <AuthProvider value={context_value}>
                    <Nav></Nav>
                    <Switch>
                        <Route path="/" exact>
                            <Index />
                        </Route>
                        <Route path="/about" exact>
                            <About />
                        </Route>
                        <Route path="/events" exact>
                            <Events />
                        </Route>
                        <Route path="/Contact" exact>
                            <Contact />
                        </Route>
                        <Route path="/login" exact>
                            <Login />
                        </Route>
                        <Route path="/registration" exact>
                            <Registration />
                        </Route>
                        <Route path="/tour-details/:id" exact>
                            <ServiceDetails />
                        </Route>
                        <PrivateRoute path="/tour-cart/:id" exact>
                            <ServiceDetailsCart />
                        </PrivateRoute>
                        <PrivateRoute path="/my-orders" exact>
                            <MyOrders />
                        </PrivateRoute>
                        <PrivateRoute path="/manage-orders" exact>
                            <ManageOrders />
                        </PrivateRoute>
                        <PrivateRoute path="/manage-service" exact>
                            <ManageServices />
                        </PrivateRoute>
                        <Route path="*">
                            <NotFound></NotFound>
                        </Route>
                    </Switch>
                    <Footer></Footer>
                </AuthProvider>
            </Router>
        </>
    )
}

