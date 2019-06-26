import { createReducer, on } from '@ngrx/store';
import { ActionLoginType } from './store.action';

let initialState = sessionStorage.getItem('token') ? true : false;

export function reducer(state = initialState, action) {
    switch(action.type){
        case ActionLoginType.APP_LOGIN:
            return state = action.payload 

        default:
            return state 
    }    
}



