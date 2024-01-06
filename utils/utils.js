import { BoolValues } from './constants';

export const toBool = (value) => {
    if (value === BoolValues.TRUE) {
        return true;
    } else if (value === BoolValues.FALSE) {
        return false;
    }
}