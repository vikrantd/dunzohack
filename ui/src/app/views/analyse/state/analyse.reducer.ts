import * as _ from 'lodash';

import { AnalyseViewActions } from './analyse.actions';
import { IAction } from '../../../core-modules/app-store/interfaces/IAction';
import { createTabularItemData, extractBillHeaderData, assignExtractedHeaderDetails } from './analyse.helper';


/** Interface and Initial State */
export interface IAnalyseViewState {
    imageList: any[];
    analysedData: any;
}
   

export const DEFAULT_ANALYSEVIEW_STATE = {
    imageList: [],
    analysedData: {}
};

/** Reducer */
export function analyseView(state: IAnalyseViewState = DEFAULT_ANALYSEVIEW_STATE, action: IAction): IAnalyseViewState {
    switch (action.type) {

       

        case AnalyseViewActions.IMAGE_LIST_FETCHED:
            return handleImageListFetched(state, action);

        case AnalyseViewActions.IMAGE_ANALYSED:
            return hanldeAnalysedData(state, action);

     
       
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
    assignExtractedHeaderDetails(topTextArray);
    // console.log(topTextArray);
    productArray = createTabularItemData(action.payload.responses[0].textAnnotations);
    // console.log(text);
    return newState;
}
