import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from '../utils/action-creator.utils';

@Injectable()
export class AppActions {

    /** ActionsList */
    static SET_VIEW_LOADING                  = '[App] SET_VIEW_LOADING';
    static SET_LIST_LOADING                  = '[App] SET_LIST_LOADING';  
    static SET_MODAL_STATE                   = '[App] SET_MODAL_STATE';
    static RESET_APP_STORE                   = '[App] RESET_APP_STORE';
    static SET_ROUTER_URL                    = '[App] SET_ROUTER_URL';
    static FETCH_DATA_FOR_SEARCH             = '[App] FETCH_DATA_FOR_SEARCH';
    static DATA_FOR_SEARCH_FETCHED           = '[App] DATA_FOR_SEARCH_FETCHED';
    static TRAVERSE_BACK_FROM_SEARCH_PAGE    = '[App] TRAVERSE_BACK_FROM_SEARCH_PAGE';

    setViewLoading                           = ActionCreatorFactory.create!(AppActions.SET_VIEW_LOADING);
    setListLoading                           = ActionCreatorFactory.create!(AppActions.SET_LIST_LOADING);
    setModalState                            = ActionCreatorFactory.create!(AppActions.SET_MODAL_STATE);
    resetAppStore                            = ActionCreatorFactory.create!(AppActions.RESET_APP_STORE);
    setRouterUrl                             = ActionCreatorFactory.create!(AppActions.SET_ROUTER_URL);
    fetchDataForSearch                       = ActionCreatorFactory.create!(AppActions.FETCH_DATA_FOR_SEARCH);
    dataForSearchFetched                     = ActionCreatorFactory.create!(AppActions.DATA_FOR_SEARCH_FETCHED);
    traverseBackFromSearchPage               = ActionCreatorFactory.create!(AppActions.TRAVERSE_BACK_FROM_SEARCH_PAGE);
}
