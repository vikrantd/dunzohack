import { IAppStoreState } from "../../../core-modules/app-store";

export function getRouterUrl(state: IAppStoreState) {
    let url = state.user.routerUrl;
    return url;
}

export function getSignUpState(state: IAppStoreState) {
    let flag = state.user.signUpState;
    return flag;
}