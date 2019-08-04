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


import { CategoryViewActions as a } from './category-view.actions';
import { AppActions as b } from '../../../core-modules/app-store/state/app-store.actions';
import { error } from '../../../core-modules/app-store/state/app-store.effects';
import { IAction } from '../../../core-modules/app-store/interfaces/IAction';
import { IAppStoreState } from '../../../core-modules/app-store/state/app-store.reducer';
import { ApiService, AlertService } from '../../../services';

@Injectable()
export class CategoryViewEffects {
    
    @Effect()
    eFetchCategoriesList = this.action$
        .ofType('[CategoryView] FETCH_CATEGORIES_LIST')
        .withLatestFrom(this.store, (action, state) => ({state: state, action: action}))
        .mergeMap((pAction: IStateAction) => {
            return Observable.concat(
                Observable.of({type: b.SET_VIEW_LOADING, payload: true}),
                this._apiSvc
                        .get('stores', true)
                        .switchMap((result: any) => {
                            return Observable.concat(
                                Observable.of({type: a.CATEGORIES_LIST_FETCHED, payload: result})
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
    eFetchSubCategoriesList = this.action$
        .ofType('[CategoryView] FETCH_SUB_CATEGORIES_LIST')
        .withLatestFrom(this.store, (action, state) => ({state: state, action: action}))
        .mergeMap((pAction: IStateAction) => {
            if(pAction.state.categoryView.selectedCategoryId > 0) {
                return Observable.concat(
                    Observable.of({type: b.SET_VIEW_LOADING, payload: true}),
                    this._apiSvc
                            .get('stores/' + pAction.state.categoryView.selectedCategoryId, true)
                            .switchMap((result: any) => {
                                    return Observable.concat(
                                            Observable.of({type: a.SUB_CATEGORIES_LIST_FETCHED, payload: result})
                                    );
                            }).catch((e: Error) => {
                                let message: string = e.message == "" ? "Error" : e.message;
                                this._alertService.error(message, true);
                                return error(e)}
                            ),
                    Observable.of({type: b.SET_VIEW_LOADING, payload: false}),
                );
            } else {
                return Observable.of();
            }
        });

    @Effect()
    eSaveCategory = this.action$
        .ofType('[CategoryView] SAVE_CATEGORY')
        .switchMap((pAction: IAction) => {
                return this._apiSvc
                        .post('Categories', pAction.payload, true)
                        .switchMap((result: any) => {
                            this._alertService.success("Category Added Succesfully", true);
                            return Observable.concat(
                                Observable.of({type: a.CATEGORY_SAVED, payload: result})
                            );
                        }).catch((e: Error) => {
                            let message: string = e.message == "" ? "Error" : e.message;
                            this._alertService.error(message, true);
                            return error(e)}
                        )
        });

    @Effect()
    eEditCategory = this.action$
        .ofType('[CategoryView] EDIT_CATEGORY')
        .withLatestFrom(this.store, (action, state) => ({state: state, action: action}))
        .mergeMap((pAction: IStateAction) => {
            return this._apiSvc
                    .put('Categories/' + pAction.state.categoryView.selectedCategoryId, pAction.action.payload, true)
                    .switchMap((result: any) => {
                        this._alertService.success("Category Edited Succesfully", true);
                        return Observable.concat(
                            Observable.of({type: a.CATEGORY_EDITED, payload: result})
                        );
                    }).catch((e: Error) => {
                        let message: string = e.message == "" ? "Error" : e.message;
                        this._alertService.error(message, true);
                        return error(e)}
                    )        
        });

    @Effect()
    eSubCategorySave = this.action$
        .ofType('[CategoryView] SAVE_SUB_CATEGORY')
        .withLatestFrom(this.store, (action, state) => ({state: state, action: action}))
        .mergeMap((pAction: IStateAction) => {
                return this._apiSvc
                        .get('products/search/' + pAction.action.payload, true)
                        .switchMap((result: any) => {
                            this._alertService.success("Sub-category Saved Successfully", true);
                            return Observable.concat(
                                Observable.of({type: a.SUB_CATEGORY_SAVED, payload: result})
                            );
                        }).catch((e: Error) => {
                            let message: string = e.message == "" ? "Error" : e.message;
                            this._alertService.error(message, true);
                            return error(e)}
                        )
        });

    @Effect()
    eDeleteCategory = this.action$
        .ofType('[CategoryView] DELETE_CATEGORY')
        .withLatestFrom(this.store, (action, state) => ({state: state, action: action}))
        .mergeMap((pAction: IStateAction) => {
                return this._apiSvc
                        .delete('Categories/' + pAction.state.categoryView.selectedCategoryId, true)
                        .switchMap((result: any) => {
                            this._alertService.success('Category Deleted Successfully', true);
                            return Observable.concat(
                                Observable.of({type: a.CATEGORY_DELETED, payload: pAction.state.categoryView.selectedCategoryId})
                            );
                        }).catch((e: Error) => {
                            let message: string = e.message == "" ? "Error" : e.message;
                            this._alertService.error(message, true);
                            return error(e)}
                        )
        });

    @Effect()
    eDeleteSubCategory = this.action$
        .ofType('[CategoryView] DELETE_SUB_CATEGORY')
        .switchMap((pAction: IAction) => {
                return this._apiSvc
                        .delete('Sub-categories/' + pAction.payload.id, true)
                        .switchMap((result: any) => {
                            this._alertService.success('Subcategory Deleted Successfully', true);
                            return Observable.concat(
                                Observable.of({type: a.SUB_CATEGORY_DELETED, payload: pAction.payload})
                            );
                        }).catch((e: Error) => {
                            let message: string = e.message == "" ? "Error" : e.message;
                            this._alertService.error(message, true);
                            return error(e)}
                        )
        });
         
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
