
import {
    TRANSPORTEUR_USER_LOADED,
    TRANSPORTEUR_USER_FAILED,
    EXPEDITEUR_USER_LOADED,
    _USER_FAILED,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_TUSER_SUCCESS,
    REGISTER_EUSER_FAILED,
    REGISTER_EUSER_SUCCESS,
    REGISTER_TUSER_FAILED,
    EXPEDITEUR_USER_FAILED } from "../actions/types"



    const initialState={
        token:localStorage.getItem('token'),
        isAuthenticated:false,
        isTransporteur:null,
        isLoading:false,
        user:null
    }

export const authReducer=(state=initialState, action)=>{
    switch(action.type){
        case REGISTER_TUSER_SUCCESS:
        case REGISTER_EUSER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated:false,
                isTransporteur:action.payload.is_transporteur,
                isLoading:false
            }
        case TRANSPORTEUR_USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                isTransporteur:true,
                user:action.payload
            }
            case EXPEDITEUR_USER_LOADED:
                return {
                    ...state,
                    isAuthenticated:true,
                    isLoading:false,
                    isTransporteur:false,
                    user:action.payload
                }

        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false,
                isTransporteur:action.payload.is_transporteur,
                
            }

        case REGISTER_TUSER_FAILED:
        case REGISTER_EUSER_FAILED:
        case LOGIN_FAILED:
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                isTransporteur:null,
                isAuthenticated:false,
                isLoading:false
            }

            case TRANSPORTEUR_USER_FAILED:
            case EXPEDITEUR_USER_FAILED:
            case LOGOUT_SUCCESS:
                localStorage.removeItem('token')
                return {
                    ...state,
                    token:null,
                    isTransporteur:null,
                    isAuthenticated:false,
                    isLoading:false,
                }
    }
    return state;
}

