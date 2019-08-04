import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';


import * as selector from './analyse.selector';
import { IAppStoreState } from '../../../core-modules/app-store/state/app-store.reducer';
import { AnalyseViewActions } from './analyse.actions';
import { AppStoreService } from '../../../core-modules/app-store/state/app-store.service';

@Injectable()
export class AnalyseViewService {

    constructor(
        public store: Store<IAppStoreState>,
        public actions: AnalyseViewActions,
        public appStoreSvc: AppStoreService
    ) {
        this.appStoreSvc.registerActionClass(actions);
        this.appStoreSvc.registerSelectors('AnalyseViewtSelectors', selector);
    }

    /**
     * Store Selectors
     */

    sGetImageList() {
        return this.store.select(selector.getImagelist);
    }

    /**
     * Dispatch Actions
     */

    dFetchImageList() {
        this.store.dispatch(this.actions.fetchImageList());
    }

    dAnalyzeImage(pUrl) {
        this.store.dispatch(this.actions.analyseImage(pUrl));
    }
}

