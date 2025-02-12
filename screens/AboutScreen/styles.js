/*
 * Copyright (c) 2023 Suvin Kodituwakku
 *
 * This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * You may share and adapt this work, but only for non-commercial purposes, and with proper attribution.
 *
 * License details: https://creativecommons.org/licenses/by-nc/4.0/
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0c1d36',
    },
    textContainer: {
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    aboutScreenSubtitleText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'justify',
        fontWeight: 'normal',
    },
});

export default styles;
