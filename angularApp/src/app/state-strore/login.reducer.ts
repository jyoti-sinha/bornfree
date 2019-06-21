import { createReducer, on } from '@ngrx/store';
import { actionTrue, actionFalse } from './login.action';

export const stateTrue = sessionStorage.getItem('token') ? false : true;

export const loginReducer = createReducer(stateTrue, 
    on(actionTrue, s => s = true),
    on(actionFalse, s => s = false)
);