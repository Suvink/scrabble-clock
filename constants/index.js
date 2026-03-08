/*
 * Copyright (c) 2023 Suvin Kodituwakku
 *
 * This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * You may share and adapt this work, but only for non-commercial purposes, and with proper attribution.
 *
 * License details: https://creativecommons.org/licenses/by-nc/4.0/
 */

// Default values for the timer settings
const DEFAULT_TIME = 1500; // 25 minutes in seconds
const DEFAULT_OVERTIME = 300; // 5 minutes in seconds
const DEFAULT_PENALTY = 2;
const DEFAULT_OPPOSITE_DIRECTION = true;
const DEFAULT_HAPTICS_ENABLED = true;
const DEFAULT_STOP_ON_TIME_END = false;
const DEFAULT_AUDIO_ALERT_ENABLED = false;

const BoolValues = {
    TRUE: 'true',
    FALSE: 'false',
};

// Build platform constants
const PLATFORM_IOS = 'iOS';

export {
    DEFAULT_TIME,
    DEFAULT_OVERTIME,
    DEFAULT_PENALTY,
    DEFAULT_OPPOSITE_DIRECTION,
    DEFAULT_HAPTICS_ENABLED,
    DEFAULT_STOP_ON_TIME_END,
    DEFAULT_AUDIO_ALERT_ENABLED,
    BoolValues,
    PLATFORM_IOS,
};
