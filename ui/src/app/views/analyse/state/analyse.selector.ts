import { IAppStoreState } from "../../../core-modules/app-store";

export function getImagelist(state: IAppStoreState) {
    let list = state.analyseView.imageList;
    return list;
}