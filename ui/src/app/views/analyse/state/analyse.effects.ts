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


import { AnalyseViewActions as a } from './analyse.actions';
import { AppActions as b } from '../../../core-modules/app-store/state/app-store.actions';
import { error } from '../../../core-modules/app-store/state/app-store.effects';
import { IAction } from '../../../core-modules/app-store/interfaces/IAction';
import { IAppStoreState } from '../../../core-modules/app-store/state/app-store.reducer';
import { ApiService, AlertService } from '../../../services';

@Injectable()
export class AnalyseViewEffects {
    
    @Effect()
    eFetchCategoriesList = this.action$
        .ofType('[Analyse] FETCH_IMAGE_LIST')
        .withLatestFrom(this.store, (action, state) => ({state: state, action: action}))
        .mergeMap((pAction: IStateAction) => {
            return Observable.concat(
                Observable.of({type: b.SET_VIEW_LOADING, payload: true}),
                this._apiSvc
                        .get('receipts', true)
                        .switchMap((result: any) => {
                            return Observable.concat(
                                Observable.of({type: a.IMAGE_LIST_FETCHED, payload: result})
                            );
                        }).catch((e: Error) => {
                            let message: string = e.message == "" ? "Error" : e.message;
                            this._alertService.error(message, true);
                            return error(e)}
                        ),
                Observable.of({type: b.SET_VIEW_LOADING, payload: false}),
            );
        });

    @Effect()
    eImageAnalyse = this.action$
        .ofType('[Analyse] ANALYSE_IMAGE')
        .withLatestFrom(this.store, (action, state) => ({state: state, action: action}))
        .mergeMap((pAction: IStateAction) => {
            let data = { "image": pAction.action.payload }; 
            return Observable.concat(
                Observable.of({type: b.SET_VIEW_LOADING, payload: true}),
                this._apiSvc
                        .post('analyze', JSON.stringify(data), true)
                        .switchMap((result: any) => {
                            return Observable.concat(
                                Observable.of({type: a.IMAGE_ANALYSED, payload: result})
                            );
                        }).catch((e: Error) => {
                            let message: string = e.message == "" ? "Error" : e.message;
                            this._alertService.error(message, true);
                            return error(e)}
                        ),
                Observable.of({type: b.SET_VIEW_LOADING, payload: false}),
            );
        });


    // @Effect()
    // eSaveCategory = this.action$
    //     .ofType('[CategoryView] SAVE_CATEGORY')
    //     .switchMap((pAction: IAction) => {
    //             return this._apiSvc
    //                     .post('Categories', pAction.payload, true)
    //                     .switchMap((result: any) => {
    //                         this._alertService.success("Category Added Succesfully", true);
    //                         return Observable.concat(
    //                             Observable.of({type: a.CATEGORY_SAVED, payload: result})
    //                         );
    //                     }).catch((e: Error) => {
    //                         let message: string = e.message == "" ? "Error" : e.message;
    //                         this._alertService.error(message, true);
    //                         return error(e)}
    //                     )
    //     });

    
  

  

  
         
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
