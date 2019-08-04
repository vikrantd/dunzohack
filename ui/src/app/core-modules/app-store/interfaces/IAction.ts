import {Action} from '@ngrx/store';
/**
 * Payload property has been removed in NGRX-4.0, so we temporarily add it here.
 * A better solution through the Action Creator will be provided at a later point in development.
 */
export class IAction implements Action {
    type: '';
    payload?: any;
}
