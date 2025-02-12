/*
 * Copyright (c) 2023 Suvin Kodituwakku
 *
 * This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * You may share and adapt this work, but only for non-commercial purposes, and with proper attribution.
 *
 * License details: https://creativecommons.org/licenses/by-nc/4.0/
 */

import 'dotenv/config';

const getAssets = (variant) => {
    switch (variant) {
        case 'Android':
            return {
                icon: './assets/icon.png',
                splashImage: './assets/splash.png',
                adaptiveIcon: './assets/adaptive-icon.png',
                favicon: './assets/favicon.png',
                name: 'scrabble-clock',
                slug: 'scrabble-clock',
            };
        case 'iOS':
            return {
                icon: './assets/ios/icon-ios.png',
                splashImage: './assets/ios/splash-ios.png',
                adaptiveIcon: './assets/ios/adaptive-icon-ios.png',
                favicon: './assets/ios/favicon.png',
                name: 'tally',
                slug: 'tally',
            };
        default:
            return {
                icon: './assets/icon.png',
                splashImage: './assets/splash.png',
                adaptiveIcon: './assets/adaptive-icon.png',
                favicon: './assets/favicon.png',
                name: 'scrabble-clock',
                slug: 'scrabble-clock',
            };
    }
};

const APP_VARIANT = process.env.APP_VARIANT || 'Android';
const assets = getAssets(APP_VARIANT);

export default {
    expo: {
        name: assets.name,
        slug: assets.slug,
        version: '3.0.0',
        orientation: 'portrait',
        icon: assets.icon,
        userInterfaceStyle: 'light',
        newArchEnabled: true,
        splash: {
            image: assets.splashImage,
            resizeMode: 'contain',
            backgroundColor: '#0c1d36',
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true,
            bundleIdentifier: 'com.suvink.scrabbleclock',
        },
        android: {
            versionCode: 11,
            adaptiveIcon: {
                foregroundImage: assets.adaptiveIcon,
                backgroundColor: '#ffffff',
            },
            androidStatusBar: {
                backgroundColor: '#0c1d36',
                translucent: false,
            },
            package: 'com.suvink.scrabble_o_clock',
            targetSdkVersion: '34',
        },
        web: {
            favicon: assets.favicon,
        },
        extra: {
            eas: {
                projectId: 'e82fa1da-7d30-4148-94f7-a4bdbc11a789',
            },
        },
        plugins: [
            [
                'expo-build-properties',
                {
                    android: {
                        targetSdkVersion: 34,
                    },
                },
            ],
            'expo-font',
        ],
    },
};
