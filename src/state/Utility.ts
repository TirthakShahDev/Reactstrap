import { Model } from './Helpers';

export interface IUtility {
    sideBarOpen?: boolean;
}

export const UtilityModel = Model<IUtility>({
    sideBarOpen: true,
});

export class Utility extends UtilityModel {
    public static SIDEBAR_OPEN = 'sideBarOpen';

    public sideBarOpen: boolean;
}
