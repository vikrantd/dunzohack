import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';

import {AppActions as a} from './app-store.actions';
import { IAction } from '../interfaces/IAction';
import { ApiService, AlertService } from '../../../services';

@Injectable()
export class ApplicationEffects {

    @Effect()
    eError$ = this.action$
        .ofType('ERROR')
        .switchMap((pAction: IAction) => {
                return Observable.empty();
            }
        );

        @Effect()
        eFetchDataForSearch = this.action$
            .ofType('[App] FETCH_DATA_FOR_SEARCH')
            .switchMap((pAction: IAction) => {
                return Observable.concat(
                    Observable.of({type: a.SET_LIST_LOADING, payload: true}),
                    this._apiSvc
                            .get('products/search/' + pAction.payload, true)
                            .switchMap((result1: any) => { 
                                return Observable.concat(
                                    Observable.of({type: a.DATA_FOR_SEARCH_FETCHED, payload: {parentData: result1, childData: null, term: pAction.payload}})
                                );
                            }).catch((e: Error) => {
                                let message: string = e.message == "" ? "Error" : e.message;
                                this._alertService.error(message, true);
                                return error(e)}
                            ),
                    Observable.of({type: a.SET_LIST_LOADING, payload: false}),
                );
            });

    constructor(private action$: Actions,
        private _apiSvc: ApiService,
        private _alertService: AlertService) {
    }
}


export const error = (e: any): Observable<any> => {
    return Observable.of({type: "ERROR", payload: e});
};
