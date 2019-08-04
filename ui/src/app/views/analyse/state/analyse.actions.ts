import { Injectable } from '@angular/core';

import { ActionCreatorFactory } from '../../../core-modules/app-store/utils/action-creator.utils';

@Injectable()
export class AnalyseViewActions {

    /** ActionsList */
    static FETCH_IMAGE_LIST          = '[Analyse] FETCH_IMAGE_LIST';
    static IMAGE_LIST_FETCHED        = '[Analyse] IMAGE_LIST_FETCHED';
    static ANALYSE_IMAGE             = '[Analyse] ANALYSE_IMAGE';
    static IMAGE_ANALYSED            = '[Analyse] IMAGE_ANALYSED';
    

    fetchImageList                    = ActionCreatorFactory.create!(AnalyseViewActions.FETCH_IMAGE_LIST);
    imageListFetched                  = ActionCreatorFactory.create!(AnalyseViewActions.IMAGE_LIST_FETCHED);
    analyseImage                      = ActionCreatorFactory.create!(AnalyseViewActions.ANALYSE_IMAGE);
    imageAnalysed                     = ActionCreatorFactory.create!(AnalyseViewActions.IMAGE_ANALYSED);


}
