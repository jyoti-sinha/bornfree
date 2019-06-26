import { Action } from '@ngrx/store';


export enum ActionLoginType {
    APP_LOGIN = 'APP_LOGIN' 
}

export class AppLogin implements Action {
    readonly type = ActionLoginType.APP_LOGIN;
    constructor(private payload?: any){}
}


export type AppActions = AppLogin;



