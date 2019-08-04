import { Injectable } from '@angular/core';

import { ActionCreatorFactory } from '../../../core-modules/app-store/utils/action-creator.utils';

@Injectable()
export class AnalyseViewActions {

    /** ActionsList */
    static FETCH_IMAGE_LIST            = '[Analyse] FETCH_IMAGE_LIST';
    static IMAGE_LIST_FETCHED          = '[Analyse] IMAGE_LIST_FETCHED';
    static ANALYSE_IMAGE               = '[Analyse] ANALYSE_IMAGE';
    static IMAGE_ANALYSED              = '[Analyse] IMAGE_ANALYSED';
    static SAVE_TO_INVENTORY           = '[Analyse] SAVE_TO_INVENTORY';
    static ADD_PRODUCT_TO_INVENTORY    = '[Analyse] ADD_PRODUCT_TO_INVENTORY';
    static SAVED_TO_INVENTORY          = '[Analyse] SAVED_TO_INVENTORY';
    static STORE_SAVED                 = '[Analyse] STORE_SAVED';
    

    fetchImageList                    = ActionCreatorFactory.create!(AnalyseViewActions.FETCH_IMAGE_LIST);
    imageListFetched                  = ActionCreatorFactory.create!(AnalyseViewActions.IMAGE_LIST_FETCHED);
    analyseImage                      = ActionCreatorFactory.create!(AnalyseViewActions.ANALYSE_IMAGE);
    imageAnalysed                     = ActionCreatorFactory.create!(AnalyseViewActions.IMAGE_ANALYSED);
    saveToInventory                   = ActionCreatorFactory.create!(AnalyseViewActions.SAVE_TO_INVENTORY);
    addProductToInventory             = ActionCreatorFactory.create!(AnalyseViewActions.ADD_PRODUCT_TO_INVENTORY);
    savedToInventory                  = ActionCreatorFactory.create!(AnalyseViewActions.SAVED_TO_INVENTORY);
    storeSaved                        = ActionCreatorFactory.create!(AnalyseViewActions.STORE_SAVED);


}
