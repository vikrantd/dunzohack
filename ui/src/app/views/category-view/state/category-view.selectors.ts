import { IAppStoreState } from '../../../core-modules/app-store/state/app-store.reducer';

export function getAllSubCategoriesList(state: IAppStoreState) {
    let list = state.categoryView.subCategoryList;
    return list;
}

export function getAllCategoriesList(state: IAppStoreState) {
    let list = state.categoryView.categoriesList;
    return list;
}

export function getSelectedCategoryId(state: IAppStoreState) {
    let id = state.categoryView.selectedCategoryId;
    return id;
}

export function getSelectedCategory(state: IAppStoreState) {
    let category = state.categoryView.selectedCategory;
    return category;
}

export function getRouterUrl(state: IAppStoreState) {
    let url = state.categoryView.routerUrl;
    return url;
}

export function getAddState(state: IAppStoreState) {
    let flag = state.categoryView.addState;
    return flag;
}

export function getEditState(state: IAppStoreState) {
    let flag = state.categoryView.editState;
    return flag;
}

export function getAddSubCategoryState(state: IAppStoreState) {
    let flag = state.categoryView.addSubCategoryState;
    return flag;
}

export function getFetchNextFlag(state: IAppStoreState) {
    let flag = state.categoryView.fetchNextFlag;
    return flag;
}