import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';


import * as selector from './user.selectors';
import { IAppStoreState } from '../../../core-modules/app-store/state/app-store.reducer';
import { UserActions } from './user.actions';
import { AppStoreService } from '../../../core-modules/app-store/state/app-store.service';

@Injectable()
export class UserService {

    constructor(
        public store: Store<IAppStoreState>,
        public actions: UserActions,
        public appStoreSvc: AppStoreService
    ) {
        this.appStoreSvc.registerActionClass(actions);
        this.appStoreSvc.registerSelectors('UserSelectors', selector);
    }

    /**
     * Store Selectors
     */
    sGetRouterUrl() {
        return this.store.select(selector.getRouterUrl);
    }

    sGetSignUpState() {
        return this.store.select(selector.getSignUpState);
    }

    /**
     * Dispatch Actions
     */
    dLoginUser(pData) {
        this.store.dispatch(this.actions.loginUser(pData));
    } 
    
    dSetSignUpState(pValue) {
        this.store.dispatch(this.actions.setSignUpState(pValue));
    }

    dSignUpUser(pData) {
        this.store.dispatch(this.actions.signUpUser(pData));
    }
}

