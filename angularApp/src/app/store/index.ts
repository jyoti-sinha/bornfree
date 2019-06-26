import { reducer } from './store.reducer';
import { ActionReducerMap } from '@ngrx/store';

export const appReducer:ActionReducerMap<any> = { 
    logState: reducer 
}