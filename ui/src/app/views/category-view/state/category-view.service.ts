import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';


import * as selector from './category-view.selectors';
import { IAppStoreState } from '../../../core-modules/app-store/state/app-store.reducer';
import { CategoryViewActions } from './category-view.actions';
import { AppStoreService } from '../../../core-modules/app-store/state/app-store.service';

@Injectable()
export class CategoryViewService {

    constructor(
        public store: Store<IAppStoreState>,
        public actions: CategoryViewActions,
        public appStoreSvc: AppStoreService
    ) {
        this.appStoreSvc.registerActionClass(actions);
        this.appStoreSvc.registerSelectors('CategoryViewtSelectors', selector);
    }

    /**
     * Store Selectors
     */
    sGetSubCategoriesList() {
        return this.store.select(selector.getAllSubCategoriesList);
    }

    sGetCategoriesList() {
        return this.store.select(selector.getAllCategoriesList);
    }

    sGetSelectedCategoryId() {
        return this.store.select(selector.getSelectedCategoryId);
    }

    sGetSelectedCategory() {
        return this.store.select(selector.getSelectedCategory);
    }

    sGetRouterUrl() {
        return this.store.select(selector.getRouterUrl);
    }

    sGetAddState() {
        return this.store.select(selector.getAddState);
    }

    sGetEditState() {
        return this.store.select(selector.getEditState);
    }

    sGetAddSubCategoryState() {
        return this.store.select(selector.getAddSubCategoryState);
    }

    sGetFetchNextFlag() {
        return this.store.select(selector.getFetchNextFlag);
    }

    /**
     * Dispatch Actions
     */
    dFetchSubCategoryList() {
        this.store.dispatch(this.actions.fetchSubCategoriesList());
    }

    dFetchCategoriesList() {
        this.store.dispatch(this.actions.fetchCategoriesList());
    }

    dSetSelectedCategory(pData) {
        this.store.dispatch(this.actions.setSelectedCategory(pData));
    }

    dSetSelectedCategoryId(pId) {
        this.store.dispatch(this.actions.setSelectedCategoryId(pId));
    }

    dSetRouterUrl(pUrl) {
        this.store.dispatch(this.actions.setRouterUrl(pUrl));
    }

    dSetAddState(pFlag) {
        this.store.dispatch(this.actions.setAddState(pFlag));
    }

    dSetEditState(pFlag) {
        this.store.dispatch(this.actions.setEditState(pFlag));
    }

    dSetAddSubCategoryState(pFlag) {
        this.store.dispatch(this.actions.setSubCategoryAddState(pFlag));
    }

    dTraverseBack() {
        this.store.dispatch(this.actions.traverseBack());
    }

    dSaveCategory(pData) {
        this.store.dispatch(this.actions.saveCategory(pData));
    }

    dEditCategory(pData) {
        this.store.dispatch(this.actions.editcategory(pData));
    }

    dSaveSubCategory(pData) {
        this.store.dispatch(this.actions.saveSubCategory(pData));
    }

    dDeleteCategory() {
        this.store.dispatch(this.actions.deleteCategory());
    }

    dDeleteSubCategory(pData) {
        this.store.dispatch(this.actions.deleteSubCategory(pData));
    } 
    
    dSetReloadData(pData) {
        this.store.dispatch(this.actions.setReloadData(pData));
    }

    dFetchNextDataList() {
        this.store.dispatch(this.actions.fetchNextListOfSubcategory());
    }
}

