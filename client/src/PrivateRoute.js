import React from "react";
import {Redirect, Route} from "react-router-dom";
import {getToken} from './api/localStorage.service';
import {parseJwt} from './Parser';

export const AuthRoute = ({component: Component, ...restOfProps}) => {

    let redirectTo = '/';
    const token = getToken();
    let tokenData = parseJwt(token);
    const isAuthenticated = token && tokenData

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                tokenData?.user?.role === "ROLE_CLIENT" ?  <Component {...props} />
                    : tokenData?.user?.role === "ROLE_ADMIN" ?   <Component {...props} />  :
                    tokenData?.user?.role === "ROLE_ASSISTANT" ?  <Component {...props} />  : <Redirect to={redirectTo}/>
            }
        />
    );
};

export const ClientRoute = ({component: Component, ...rest}) => {
        let redirectTo = '/';
        const token = getToken();
        let tokenData = parseJwt(token);
        const isAuthenticated = token && tokenData
        return (
            <
                Route
                {...
                    rest
                }
                render={(props) =>
                    tokenData?.user?.role === "ROLE_CLIENT" ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={redirectTo}/>
                    )
                }
            />
        )
            ;
    }
;

export const AssistantRoute = ({component: Component, ...rest}) => {
    let redirectTo = '/';
    const token = getToken();
    let tokenData = parseJwt(token);
    const isAuthenticated = token && tokenData
    return (
        <Route
            {...rest}
            render={(props) =>
                tokenData?.user?.role === "ROLE_ASSISTANT" ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={redirectTo}/>
                )
            }
        />
    );
};

export const AdminRoute = ({component: Component, ...rest}) => {
    let redirectTo = '/';
    const token = getToken();
    let tokenData = parseJwt(token);
    const isAuthenticated = token && tokenData
    return (
        <Route
            {...rest}
            render={(props) =>
                tokenData?.user?.role === "ROLE_ADMIN" ?
                    <Component {...props} />
                    :
                    <Redirect to={redirectTo}/>

            }
        />
    );
};
