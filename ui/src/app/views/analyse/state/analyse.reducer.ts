import * as _ from 'lodash';

import { AnalyseViewActions } from './analyse.actions';
import { IAction } from '../../../core-modules/app-store/interfaces/IAction';
import { createTabularItemData, extractBillHeaderData, assignExtractedHeaderDetails } from './analyse.helper';


/** Interface and Initial State */
export interface IAnalyseViewState {
    imageList: any[];
    analysedDataHeader: any;
    productArray: any[];
    newStoreId: number;
}
   

export const DEFAULT_ANALYSEVIEW_STATE = {
    imageList: [],
    analysedDataHeader: {},
    productArray: [],
    newStoreId: 0
};

/** Reducer */
export function analyseView(state: IAnalyseViewState = DEFAULT_ANALYSEVIEW_STATE, action: IAction): IAnalyseViewState {
    switch (action.type) {

       

        case AnalyseViewActions.IMAGE_LIST_FETCHED:
            return handleImageListFetched(state, action);

        case AnalyseViewActions.IMAGE_ANALYSED:
            return hanldeAnalysedData(state, action);

        case AnalyseViewActions.STORE_SAVED:
            return handleStoreSaved(state, action);
     
       
        default:
            return state;
    }

}

/** Reducer Handlers */

function handleImageListFetched(state: IAnalyseViewState, action: IAction): IAnalyseViewState {
    let newState = _.cloneDeep(state);
    newState.imageList = action.payload;
    return newState;
}

function hanldeAnalysedData(state: IAnalyseViewState, action: IAction): IAnalyseViewState {
    let newState = _.cloneDeep(state);
   
    let productArray: any[] = [];
    let topText: string = "";
    let topTextArray: any[] = [];
   
    // console.log(action.payload.responses);
    // console.log(action.payload.responses[0].textAnnotations[0].description);
    topTextArray = extractBillHeaderData(action.payload.responses[0].textAnnotations[0].description);
    newState.analysedDataHeader = assignExtractedHeaderDetails(topTextArray);
    // console.log(topTextArray);
    newState.productArray = createTabularItemData(action.payload.responses[0].textAnnotations);
    // console.log(text);
    return newState;
}

function handleStoreSaved(state: IAnalyseViewState, action: IAction): IAnalyseViewState {
    let newState = _.cloneDeep(state);
    newState.newStoreId = action.payload;
    return newState;
}
