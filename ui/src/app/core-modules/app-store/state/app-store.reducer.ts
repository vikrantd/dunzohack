import * as fromRouter from '@ngrx/router-store';
import * as _ from 'lodash';

import { AppActions } from './app-store.actions';
import { IAction } from '../interfaces/IAction';
import { ICategoryViewState, DEFAULT_CATEGORYVIEW_STATE } from '../../../views/category-view/state/category-view.reducer';
import { IUserState, DEFAULT_USER_STATE } from '../../../views/login/state/user.reducer';
import { IAnalyseViewState, DEFAULT_ANALYSEVIEW_STATE } from '../../../views/analyse/state/analyse.reducer';


export interface IAppStoreState {
    viewLoading: boolean;
    listLoading: boolean;
    modalState: boolean;
    categoryView: ICategoryViewState;
    analyseView: IAnalyseViewState;
    user: IUserState;
    searchResults: any[];
    routerUrl: string;
    searchTerm: string;
}

export const DEFAULT_APP_STORE_STATE = { 
    viewLoading: false,
    listLoading: false,
    modalState: false,
    categoryView: DEFAULT_CATEGORYVIEW_STATE,
    analyseView : DEFAULT_ANALYSEVIEW_STATE,
    user: DEFAULT_USER_STATE,
    searchResults: [],
    routerUrl: "",
    searchTerm: ""
};

/** Reducer */
export function appstore(state: IAppStoreState = DEFAULT_APP_STORE_STATE, action: any) {
    switch (action.type) {

        case AppActions.SET_VIEW_LOADING:
            return handleViewLoading(state, action);

        case AppActions.SET_LIST_LOADING:
            return handleListLoading(state, action);

        case AppActions.SET_MODAL_STATE:
            return handleModalState(state, action);

        case AppActions.DATA_FOR_SEARCH_FETCHED:
            return handleDataForSearchFetched(state, action);

        case AppActions.TRAVERSE_BACK_FROM_SEARCH_PAGE:
            return handleTraverseBackFromSearchPage(state, action);

        case AppActions.SET_ROUTER_URL:
            return handleSetRouterUrl(state, action);

        default:
            return state;
    }
}


export const MainReducer = {
    routerReducer: fromRouter.routerReducer,
    appStore: appstore
};

export function handleViewLoading(state: IAppStoreState, action: IAction): IAppStoreState {
    let newState = _.cloneDeep(state);
    newState.viewLoading = action.payload;
    return newState;
}

export function handleListLoading(state: IAppStoreState, action: IAction): IAppStoreState {
    let newState = _.cloneDeep(state);
    newState.listLoading = action.payload;
    return newState;
}

export function handleModalState(state: IAppStoreState, action: IAction): IAppStoreState {
    let newState = _.cloneDeep(state);
    newState.modalState = action.payload;
    return newState;
}

export function handleDataForSearchFetched(state: IAppStoreState, action: IAction): IAppStoreState {
    let newState = _.cloneDeep(state);
    let searchResult: any[] = [];
    let parentCategories = _.cloneDeep(action.payload.parentData);
    let childCategories = _.cloneDeep(action.payload.childData);
    parentCategories.forEach(category => {
        Object.keys(category).forEach(function(key) {
            if (category[key].toString().toLowerCase() == action.payload.term.toLowerCase()) {
                searchResult.push(category);
            }
        });
    });
    childCategories.forEach(subCategory => {
        Object.keys(subCategory).forEach(function(key) {
            if (subCategory[key].toString().toLowerCase() == action.payload.term.toLowerCase()) {
                subCategory['parentType'] = subCategory['parent-type'];
                searchResult.push(subCategory);
            }
        });
    });
    newState.searchResults = searchResult;
    newState.searchTerm = action.payload.term;
    newState.routerUrl = "searchResults";
    return newState;
}

export function handleTraverseBackFromSearchPage(state: IAppStoreState, action: IAction): IAppStoreState {
    let newState = _.cloneDeep(state);
    if(newState.categoryView == undefined) {
        newState.routerUrl = "home";
    } else {
        if(newState.categoryView.selectedCategoryId == 0) {
            newState.routerUrl = "category";
        } else {
            newState.routerUrl = "category" + newState.categoryView.selectedCategoryId;
        }
    }
    return newState;
}

export function handleSetRouterUrl(state: IAppStoreState, action: IAction): IAppStoreState {
    let newState =_.cloneDeep(state);
    newState.routerUrl = action.payload;
    newState.user.routerUrl = '';
    return newState;
}
