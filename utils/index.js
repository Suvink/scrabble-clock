/*
 * Copyright (c) 2023 Suvin Kodituwakku
 *
 * This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * You may share and adapt this work, but only for non-commercial purposes, and with proper attribution.
 *
 * License details: https://creativecommons.org/licenses/by-nc/4.0/
 */

import { BoolValues } from '../constants';

export const toBool = (value) => {
    if (value === BoolValues.TRUE) {
        return true;
    } else if (value === BoolValues.FALSE) {
        return false;
    }
};
