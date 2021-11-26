import { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "../context/authContex";


function PrivateRoute({ children, ...rest }) {
    // let auth = false;
    const context_data = useContext(authContext);
    
    useEffect(() => {
        // console.log(context_data.redirect_url, window.location.pathname, context_data);
        context_data.setredirect_url(arguments[0].location.pathname);
    }, [context_data])

    return (
        <Route
            {...rest}
            render={({ location }) =>
                context_data.AuthInfoLoaded && (
                    context_data.CheckAuth ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                )
            }
        />
    );
}

export default PrivateRoute;