import { IAppStoreState } from "./state/app-store.reducer";
import { Action } from "@ngrx/store";

export function flush(reducer) {
    return function(state: IAppStoreState | undefined, action: Action) {
       
        if (action.type == '[App] RESET_APP_STORE') {
            return reducer(undefined, action);
        }
        return reducer(state, action);
    }
}