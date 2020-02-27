import { IAppAction, ActionType } from '../actions/Helpers';
import { Utility } from '../state/Utility';

export const UtilityReducer = (state: Utility = null, action: IAppAction): Utility => {
    switch (action.type) {
        case ActionType.TOGGLE_SIDEBAR:
            return { ...state, sideBarOpen: !state.sideBarOpen };
        default:
            return state;
    }
};
