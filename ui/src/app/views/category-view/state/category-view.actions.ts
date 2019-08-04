import { Injectable } from '@angular/core';

import { ActionCreatorFactory } from '../../../core-modules/app-store/utils/action-creator.utils';

@Injectable()
export class CategoryViewActions {

    /** ActionsList */
    static FETCH_SUB_CATEGORIES_LIST          = '[CategoryView] FETCH_SUB_CATEGORIES_LIST';
    static SUB_CATEGORIES_LIST_FETCHED        = '[CategoryView] SUB_CATEGORIES_LIST_FETCHED';
    static FETCH_CATEGORIES_LIST              = '[CategoryView] FETCH_CATEGORIES_LIST';
    static CATEGORIES_LIST_FETCHED            = '[CategoryView] CATEGORIES_LIST_FETCHED';
    static SET_SELECTED_CATEGORY              = '[CategoryView] SET_SELECTED_CATEGORY';
    static SET_SELECTED_CATEGORY_ID           = '[CategoryView] SET_SELECTED_CATEGORY_ID';
    static SET_ROUTER_URL                     = '[CategoryView] SET_ROUTER_URL';
    static SET_ADD_STATE                      = '[CategoryView] SET_ADD_STATE ';
    static SET_EDIT_STATE                     = '[CategoryView] SET_EDIT_STATE ';
    static SET_SUB_CATEGORY_ADD_STATE         = '[CategoryView] SET_SUB_CATEGORY_ADD_STATE';
    static TRAVERSE_BACK                      = '[CategoryView] TRAVERSE_BACK';
    static SAVE_CATEGORY                      = '[CategoryView] SAVE_CATEGORY';
    static CATEGORY_SAVED                     = '[CategoryView] CATEGORY_SAVED';
    static EDIT_CATEGORY                      = '[CategoryView] EDIT_CATEGORY';
    static CATEGORY_EDITED                    = '[CategoryView] CATEGORY_EDITED';
    static SAVE_SUB_CATEGORY                  = '[CategoryView] SAVE_SUB_CATEGORY';
    static SUB_CATEGORY_SAVED                 = '[CategoryView] SUB_CATEGORY_SAVED';
    static DELETE_CATEGORY                    = '[CategoryView] DELETE_CATEGORY';
    static CATEGORY_DELETED                   = '[CategoryView] CATEGORY_DELETED';
    static DELETE_SUB_CATEGORY                = '[CategoryView] DELETE_SUB_CATEGORY';
    static SUB_CATEGORY_DELETED               = '[CategoryView] SUB_CATEGORY_DELETED';
    static SET_RELOAD_DATA                    = '[CategoryView] SET_RELOAD_DATA';
    static FETCH_NEXT_LIST_OF_SUB_CATEGORY    = '[CategoryView] FETCH_NEXT_LIST_OF_SUB_CATEGORY';

    fetchSubCategoriesList                    = ActionCreatorFactory.create!(CategoryViewActions.FETCH_SUB_CATEGORIES_LIST);
    subCategoriesListFetched                  = ActionCreatorFactory.create!(CategoryViewActions.SUB_CATEGORIES_LIST_FETCHED);
    fetchCategoriesList                       = ActionCreatorFactory.create!(CategoryViewActions.FETCH_CATEGORIES_LIST);
    categoriesListFetched                     = ActionCreatorFactory.create!(CategoryViewActions.CATEGORIES_LIST_FETCHED);
    setSelectedCategory                       = ActionCreatorFactory.create!(CategoryViewActions.SET_SELECTED_CATEGORY);
    setSelectedCategoryId                     = ActionCreatorFactory.create!(CategoryViewActions.SET_SELECTED_CATEGORY_ID);
    setRouterUrl                              = ActionCreatorFactory.create!(CategoryViewActions.SET_ROUTER_URL);
    setAddState                               = ActionCreatorFactory.create!(CategoryViewActions.SET_ADD_STATE);
    setEditState                              = ActionCreatorFactory.create!(CategoryViewActions.SET_EDIT_STATE);
    traverseBack                              = ActionCreatorFactory.create!(CategoryViewActions.TRAVERSE_BACK);
    saveCategory                              = ActionCreatorFactory.create!(CategoryViewActions.SAVE_CATEGORY);
    categorySaved                             = ActionCreatorFactory.create!(CategoryViewActions.CATEGORY_SAVED);
    editcategory                              = ActionCreatorFactory.create!(CategoryViewActions.EDIT_CATEGORY);
    categoryEdited                            = ActionCreatorFactory.create!(CategoryViewActions.CATEGORY_EDITED);
    setSubCategoryAddState                    = ActionCreatorFactory.create!(CategoryViewActions.SET_SUB_CATEGORY_ADD_STATE);
    saveSubCategory                           = ActionCreatorFactory.create!(CategoryViewActions.SAVE_SUB_CATEGORY);
    subCategorySaved                          = ActionCreatorFactory.create!(CategoryViewActions.SUB_CATEGORY_SAVED);
    deleteCategory                            = ActionCreatorFactory.create!(CategoryViewActions.DELETE_CATEGORY);
    categoryDeleted                           = ActionCreatorFactory.create!(CategoryViewActions.CATEGORY_DELETED);
    deleteSubCategory                         = ActionCreatorFactory.create!(CategoryViewActions.DELETE_SUB_CATEGORY);
    subCategoryDeleted                        = ActionCreatorFactory.create!(CategoryViewActions.SUB_CATEGORY_DELETED);
    setReloadData                             = ActionCreatorFactory.create!(CategoryViewActions.SET_RELOAD_DATA);
    fetchNextListOfSubcategory                = ActionCreatorFactory.create!(CategoryViewActions.FETCH_NEXT_LIST_OF_SUB_CATEGORY);

}
