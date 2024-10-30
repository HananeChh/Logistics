// import {Route, Redirect} from "react-router-dom"
// import { useSelector } from "react-redux"
// import { Component } from "react"


// export const TPrivateRoute=({component:Component, path, ...rest})=>{
//     const state=useSelector(state =>state.auth)
//     return <Route path={path}
//                   {...rest}
//                   render={(props)=>{
//                       if(state.isLoading){
//                           return <h3>Loading....</h3>
//                       }else if(!state.isAuthenticated &&  !state.isTransporteur){
//                           return <Redirect to="/login"/>
//                       }else{
//                           return <Component {...props}/>
//                       }
//                   }}/>
    
// }



// export const EPrivateRoute = ({component:Component, path, ...rest }) => {
//     const state=useSelector((state) => state.auth)
//     return <Route 
//       path={path}
//       {...rest}
//       render ={(props)=>{
//         if (state.isLoading){
//                return <h2>Loading ....</h2>
//         }else if(state.isAuthenticated && !state.isTransporteur){
//             return <Component {...props}/>
//         }else{    
//              return <Redirect to="/login" />
//         }

//     }
        
//     }/>
// }
import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTransporteurUser, getExpediteurUser } from "../actions/auth";

export const TPrivateRoute = ({ component: Component, path, ...rest }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.auth);

    useEffect(() => {
        if (!state.isAuthenticated && !state.isLoading) {
            dispatch(getTransporteurUser());
        }
    }, [dispatch, state.isAuthenticated, state.isLoading]);

    return (
        <Route
            path={path}
            {...rest}
            render={(props) => {
                if (state.isLoading) {
                    return <h3>Loading....</h3>;
                } else if (!state.isAuthenticated || !state.isTransporteur) {
                    return <Redirect to="/login" />;
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );
};

export const EPrivateRoute = ({ component: Component, path, ...rest }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.auth);

    useEffect(() => {
        if (!state.isAuthenticated && !state.isLoading) {
            dispatch(getExpediteurUser());
        }
    }, [dispatch, state.isAuthenticated, state.isLoading]);

    return (
        <Route
            path={path}
            {...rest}
            render={(props) => {
                if (state.isLoading) {
                    return <h2>Loading ....</h2>;
                } else if (state.isAuthenticated && !state.isTransporteur) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />
    );
};
