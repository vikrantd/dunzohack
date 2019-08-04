import { IAppStoreState } from "../../../core-modules/app-store";

export function getImagelist(state: IAppStoreState) {
    let list = state.analyseView.imageList;
    return list;
}

export function getAnalysedHeader(state: IAppStoreState) {
    let analysedHeader = state.analyseView.analysedDataHeader;
    return analysedHeader;
}

export function getProductArray(state: IAppStoreState) {
    let productArray = state.analyseView.productArray;
    return productArray;
}

export function getNewStoreId(state: IAppStoreState) {
    let id = state.analyseView.newStoreId;
    return id;
}