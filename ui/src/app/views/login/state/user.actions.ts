import { Injectable } from '@angular/core';

import { ActionCreatorFactory } from '../../../core-modules/app-store/utils/action-creator.utils';

@Injectable()
export class UserActions {

    /** ActionsList */
    static LOGIN_USER              = '[User] LOGIN_USER';
    static USER_VALIDATED          = '[User] USER_VALIDATED';
    static SIGN_UP_USER            = '[User] SIGN_UP_USER';
    static USER_SIGNED_UP          = '[User] USER_SIGNED_UP'
    static SET_SIGN_UP_STATE       = '[User] SET_SIGN_UP_STATE';
    static GET_USER_DETAILS        = '[User] GET_USER_DETAILS';
    static USER_DETAILS_FETCHED    = '[User] USER_DETAILS_FETCHED';

    loginUser                      = ActionCreatorFactory.create!(UserActions.LOGIN_USER);
    userValidated                  = ActionCreatorFactory.create!(UserActions.USER_VALIDATED);
    signUpUser                     = ActionCreatorFactory.create!(UserActions.SIGN_UP_USER);
    userSignedUp                   = ActionCreatorFactory.create!(UserActions.USER_SIGNED_UP);
    setSignUpState                 = ActionCreatorFactory.create!(UserActions.SET_SIGN_UP_STATE);
    getUserDetails                 = ActionCreatorFactory.create!(UserActions.GET_USER_DETAILS);
    userDetailsFetched             = ActionCreatorFactory.create!(UserActions.USER_DETAILS_FETCHED);
}
