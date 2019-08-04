import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import { IAppStoreState } from './app-store.reducer';
import * as selector from './app-store.selectors';
import { AppActions } from './app-store.actions';

@Injectable()
export class AppStoreService implements OnDestroy {

    ngUnsubscribe: Subject<any> = new Subject<void>();
    globalActions = {};
    globalSelectors = {};

    /**
     * Registers ActionClass in globalActions
     *
     * Example:
     * globalActions = {
     *      ActionActions: {...pActionClass}
     * }
     *
     * @param pActionClass
     */

    registerActionClass(pActionClass: any) {
        const className: string = pActionClass.constructor.name;
        try {
            if(pActionClass && !this.globalActions[className]) {
                this.globalActions[className] = pActionClass;
            }
        } catch(e) {
            console.warn('registerActionClass', e);
        }
    }

    /**
     * Registers Selectors in globalSelectors
     *
     * Example:
     * globalSelectors = {
     *      ActionSelectors: * as selectors
     * }
     *
     * @param pRegisterName
     * @param pSelectors
     */
    registerSelectors(pRegisterName: string, pSelectors: any) {
        try {
            if(pSelectors && pRegisterName && !this.globalSelectors[pRegisterName]) {
                this.globalSelectors[pRegisterName] = pSelectors;
            }
        } catch(e) {
            console.warn('registerSelectors', e);
        }
    }

    /**
     * Takes any subject and executes its next and complete class methods,
     * in other words any open streams gets terminated
     *
     * @param pSubscription
     */
    unSubscribe(pSubscription: Subject<any>) {
        try {
            pSubscription.next();
            pSubscription.complete();
        } catch(e) {
            console.warn('unSubscribe', e);
        }
    }

    /**
     * dispatchers
     */

    dSearchTerm(pTerm) {
        this.store.dispatch(this.actions.fetchDataForSearch(pTerm));
    }

    dResetStore() {
        return this.store.dispatch(this.actions.resetAppStore());
    }

    dTraverseBackFromSearch() {
        this.store.dispatch(this.actions.traverseBackFromSearchPage());
    }

    dSetRouterUrl(pUrl) {
        this.store.dispatch(this.actions.setRouterUrl(pUrl));
    }

    /**
     * selectors
     */

    sGetViewLoading() {
        return this.store.select(selector.getViewLoading);
    }

    sGetListLoading() {
        return this.store.select(selector.getListLoading);
    }

    sGetModalState() {
        return this.store.select(selector.getModalState);
    }

    sGetRouterUrl() {
        return this.store.select(selector.getRouterUrl);
    }

    sGetSearchResults() {
        return this.store.select(selector.getSearchResults);
    }

    sGetSearchTerm() {
        return this.store.select(selector.getSearchTerm);
    }

    /**
     * Calls the unSubscribe method to terminate all open streams to
     * avoid memory leaks
     *
     * (Only useful if the service is not shared)
     */
    ngOnDestroy() {
        try {
            this.unSubscribe(this.ngUnsubscribe);
        } catch(e) {
            console.warn('ngOnDestroy', e);
        }
    }

    constructor(public store: Store<IAppStoreState>,
        public actions: AppActions
        ) {
        this.registerActionClass(actions);
        this.registerSelectors('AppSelectors', selector)
    }
}
