import * as _ from 'lodash';

import { UserActions } from './user.actions';
import { IAction } from '../../../core-modules/app-store/interfaces/IAction';


/** Interface and Initial State */
export interface IUserState {
    routerUrl: string;
    signUpState: boolean;
}

export const DEFAULT_USER_STATE = {
    routerUrl: "",
    signUpState: false
};

/** Reducer */
export function user(state: IUserState = DEFAULT_USER_STATE, action: IAction): IUserState {
    switch (action.type) {

        case UserActions.USER_VALIDATED:
            return handleUserValidated(state, action);

        case UserActions.USER_SIGNED_UP:
            return handleUserSignedUp(state, action);

        case UserActions.SET_SIGN_UP_STATE:
            return handleSetSignUpState(state, action);

        case UserActions.USER_DETAILS_FETCHED:
            return handleUserDetailsFetched(state, action);
       
        default:
            return state;
    }

}

/** Reducer Handlers */

function handleUserValidated(state: IUserState, action: IAction): IUserState {
    let newState = _.cloneDeep(state);
    localStorage.setItem('currentUserToken', JSON.stringify(action.payload.responseData.id));
    window.localStorage.setItem('environmentReady', "1");
    return newState;
}

function handleUserSignedUp(state: IUserState, action: IAction): IUserState {
    let newState = _.cloneDeep(state);
    newState.signUpState = false;
    return newState;
}

function handleSetSignUpState(state: IUserState, action: IAction): IUserState {
    let newState = _.cloneDeep(state);
    newState.signUpState = action.payload;
    return newState;
}

function handleUserDetailsFetched(state: IUserState, action: IAction): IUserState {
    let newState = _.cloneDeep(state);
    let name = action.payload.userName !== undefined && action.payload.userName !== "" ? action.payload.userName : "User Anony";
    localStorage.setItem('userName', JSON.stringify(name));
    newState.routerUrl = 'home';
    return newState;
}

