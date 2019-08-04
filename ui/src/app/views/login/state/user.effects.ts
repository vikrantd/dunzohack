import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/mergeMap';
import { Store } from "@ngrx/store";


import { UserActions as a } from './user.actions';
import { AppActions as b } from '../../../core-modules/app-store/state/app-store.actions';
import { error } from '../../../core-modules/app-store/state/app-store.effects';
import { IAction } from '../../../core-modules/app-store/interfaces/IAction';
import { IAppStoreState } from '../../../core-modules/app-store/state/app-store.reducer';
import { ApiService, AlertService } from '../../../services';

@Injectable()
export class UserEffects {
    
    @Effect()
    eLoginUser = this.action$
        .ofType('[User] LOGIN_USER')
        .switchMap((pAction: IAction) => {
                return this._apiSvc
                        .post('Users/login',  pAction.payload, true)
                        .switchMap((result: any) => {
                            localStorage.setItem('currentUser', JSON.stringify(pAction.payload.email));
                            localStorage.setItem('currentUserToken', JSON.stringify(result.id));
                            return Observable.concat(
                                Observable.of({type: a.USER_VALIDATED, payload: {userData: pAction.payload, responseData: result}}),
                                Observable.of({type: a.GET_USER_DETAILS, payload: {id: result.userId, token: result.id}})
                            );
                        }).catch((e: Error) => {
                            let message: string = e.message == "" ? "Incorrect Credentials" : e.message;
                            this._alertService.error(message, true);
                            return error(e)}
            );
        });

    @Effect()
    eSignUpUser = this.action$
        .ofType('[User] SIGN_UP_USER')
        .switchMap((pAction: IAction) => {
                return this._apiSvc
                        .post('Users',  pAction.payload, true)
                        .switchMap((result: any) => {
                            this._alertService.success("User Successfully Added", true);
                            return Observable.concat(
                                Observable.of({type: a.USER_SIGNED_UP, payload: {userData: pAction.payload, responseData: result}})
                            );
                        }).catch((e: Error) => {
                            let message: string = e.message == "" ? "Could not add User" : e.message;
                            this._alertService.error(message, true);
                            return error(e)}
            );
        });

    @Effect()
    eGetUserDetails = this.action$
        .ofType('[User] GET_USER_DETAILS')
        .switchMap((pAction: IAction) => {
            return this._apiSvc
            .get('Users/'+ pAction.payload.id +'?access_token='+ pAction.payload.token, true)
            .switchMap((result: any) => {
                return Observable.concat(
                    Observable.of({type: a.USER_DETAILS_FETCHED, payload: result})
                );
            }).catch((e: Error) => {
                let message: string = e.message == "" ? "Could not add User" : e.message;
                this._alertService.error(message, true);
                return error(e)}
            );
        })
         
    constructor(
        private action$: Actions,
        private _apiSvc: ApiService,
        private _alertService: AlertService,
        public store: Store<IAppStoreState>
    ) {
     }
}

export interface IStateAction {
    action: IAction;
    state: IAppStoreState;
}
