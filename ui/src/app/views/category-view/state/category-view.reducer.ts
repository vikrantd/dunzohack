import * as _ from 'lodash';

import { CategoryViewActions } from './category-view.actions';
import { IAction } from '../../../core-modules/app-store/interfaces/IAction';
import { segregateCategoryAndProducts, buildData } from './category-view.helpers';


/** Interface and Initial State */
export interface ICategoryViewState {
    subCategoryList: any[];
    categoriesList: any[];
    selectedCategory: any;
    selectedCategoryId: number;
    routerUrl: string;
    addState: boolean;
    editState: boolean;
    addSubCategoryState: boolean;
    allSubCategoriesList: any[];
    subCategoryListOfCategory: any[];
    reloadData: any[];
    fetchCounter: number;
    fetchNextFlag: boolean;
}

export const DEFAULT_CATEGORYVIEW_STATE = {
    subCategoryList: [],
    categoriesList: [],
    selectedCategory: {},
    selectedCategoryId: 0,
    routerUrl: "",
    addState: false,
    editState: false,
    addSubCategoryState: false,
    allSubCategoriesList: [],
    subCategoryListOfCategory: [],
    reloadData: [],
    fetchCounter: 0,
    fetchNextFlag: false
};

/** Reducer */
export function categoryView(state: ICategoryViewState = DEFAULT_CATEGORYVIEW_STATE, action: IAction): ICategoryViewState {
    switch (action.type) {

        case CategoryViewActions.SUB_CATEGORIES_LIST_FETCHED:
            return handleSubCategoriesListFetched(state, action);

        case CategoryViewActions.CATEGORIES_LIST_FETCHED:
            return handleCategoriesListFetched(state, action);

        case CategoryViewActions.SET_SELECTED_CATEGORY:
            return handleSetSelectedCategory(state, action);

        case CategoryViewActions.SET_SELECTED_CATEGORY_ID:
            return handleSetSelectedCategoryId(state, action);

        case CategoryViewActions.SET_ROUTER_URL:
            return handleSetRouterUrl(state, action);

        case CategoryViewActions.SET_ADD_STATE:
            return handleSetAddState(state, action);

        case CategoryViewActions.SET_EDIT_STATE:
            return handleSetEditState(state, action);

        case CategoryViewActions.TRAVERSE_BACK:
            return handleTraverseBack(state, action);

        case CategoryViewActions.CATEGORY_SAVED:
            return handleCategorySaved(state, action);

        case CategoryViewActions.CATEGORY_EDITED:
            return handleCategoryEdited(state, action);

        case CategoryViewActions.SET_SUB_CATEGORY_ADD_STATE:
            return handleSetAddSubCategoryState(state, action);

        case CategoryViewActions.SUB_CATEGORY_SAVED:
            return handleSubCategorySaved(state, action);

        case CategoryViewActions.CATEGORY_DELETED:
            return handleCategoryDeleted(state, action);

        case CategoryViewActions.SUB_CATEGORY_DELETED:
            return handleSubCategoryDeleted(state, action);

        case CategoryViewActions.SET_RELOAD_DATA:
            return handleSetReloadData(state, action);

        case CategoryViewActions.FETCH_NEXT_LIST_OF_SUB_CATEGORY:
            return handleFetchNextSubCatgoryList(state, action);
       
        default:
            return state;
    }

}

/** Reducer Handlers */

function handleSubCategoriesListFetched(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState = _.cloneDeep(state);
    if(newState.subCategoryList.length == 0) {
        newState.subCategory = [];
        action.payload.products.forEach(data => {
            let result = segregateCategoryAndProducts(data, newState.subCategoryList);
            if(result.flag) {
                newState.subCategoryList[result.position].products.push(data);
            } else {
                newState.subCategoryList.push(buildData(data));
            }
        })
        // newState.subCategoryListOfCategory = _.cloneDeep(action.payload.);
        // newState.subCategoryList = newState.subCategoryListOfCategory.slice(newState.fetchCounter, 6);
        // newState.fetchCounter = newState.fetchCounter + 6;
        // newState.fetchNextFlag = newState.subCategoryListOfCategory.length < newState.fetchCounter ? false : true;
    }
    if(newState.reloadData[3] !== undefined && newState.reloadData[3] !== 'edit') {
        newState.addSubCategoryState = true;
    } else {
        if(newState.reloadData[3] !== undefined && newState.reloadData[3] == 'edit') newState.editState = true;
    }
    return newState;
}

function handleCategoriesListFetched(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState = _.cloneDeep(state);
    newState.categoriesList = action.payload;
    if(newState.selectedCategoryId !== 0) {
        newState.categoriesList.forEach(category => {
            if(category.storeId == newState.selectedCategoryId) {
                newState.selectedCategory = category;
            }
        });
    }
    return newState;
}

function handleSetSelectedCategory(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState = _.cloneDeep(state);
    newState.selectedCategory = action.payload;
    newState.selectedCategoryId = newState.selectedCategory.id !== undefined ? newState.selectedCategory.id : 0;
    newState.subCategoryList = [];
    newState.fetchCounter = 0;
    return newState;
}

function handleSetSelectedCategoryId(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState = _.cloneDeep(state);
    newState.selectedCategoryId = action.payload;
    newState.fetchCounter = 0;
    return newState;
}

function handleSetRouterUrl(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState = _.cloneDeep(state);
    newState.routerUrl = action.payload;
    return newState;
}

function handleSetAddState(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState = _.cloneDeep(state);
    newState.addState = action.payload;
    return newState;
}

function handleSetEditState(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState = _.cloneDeep(state);
    newState.editState = action.payload;
    return newState;
}

function handleTraverseBack(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState = _.cloneDeep(state);
    newState.addState = false;
    newState.editState = false;
    newState.addSubCategoryState = false;
    newState.routerUrl = newState.selectedCategoryId == 0 ? 'category' : 'category/' + newState.selectedCategoryId;
    return newState;
}

function handleCategorySaved(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState = _.cloneDeep(state);
    newState.categoriesList.push(action.payload);
    newState = handleTraverseBack(newState, action);
    return newState;
}

function handleCategoryEdited(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState = _.cloneDeep(state);
    newState.categoriesList.forEach(category => {
        if(category.id == action.payload.id) {
            Object.assign(category, action.payload);
        }
    });
    newState = handleTraverseBack(newState, action);
    return newState;
}

function handleSetAddSubCategoryState(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState = _.cloneDeep(state);
    newState.addSubCategoryState = action.payload;
    return newState;
}

function handleSubCategorySaved(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState = _.cloneDeep(state);
    newState.subCategoryList.push(action.payload);
    newState.routerUrl = 'category/' + newState.selectedCategoryId;
    newState.addSubCategoryState = false;
    return newState;
}

function handleCategoryDeleted(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState = _.cloneDeep(state);
    newState.categoriesList.forEach((category, index) => {
        if(category.id == action.payload) {
            newState.categoriesList.splice(index, 1);
        }
    });
    newState.routerUrl = "category";
    newState.selectedCategory = {};
    newState.selectedCategoryId = 0;
    return newState;
}

function handleSubCategoryDeleted(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState = _.cloneDeep(state);
    newState.subCategoryList.forEach((subCategory, index) => {
        if(subCategory.id == action.payload.id) {
            newState.subCategoryList.splice(index, 1);
        }
    });
    return newState;
}

function handleSetReloadData(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState =_.cloneDeep(state);
    newState.reloadData = action.payload;
    return newState;
}

function handleFetchNextSubCatgoryList(state: ICategoryViewState, action: IAction): ICategoryViewState {
    let newState = _.cloneDeep(state);
    if(newState.subCategoryListOfCategory.length > newState.fetchCounter) {
        newState.subCategoryList = newState.subCategoryList.concat(newState.subCategoryListOfCategory.slice(newState.fetchCounter, newState.fetchCounter + 6));
        newState.fetchCounter = newState.fetchCounter + 6;
        newState.fetchNextFlag = newState.subCategoryListOfCategory.length < newState.fetchCounter ? false : true;
        return newState;
    } else {
        return newState;
    }
}