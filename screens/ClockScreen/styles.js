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
    safeAreaContainer: {
        backgroundColor: '#0c1d36',
        minHeight: '100%',
    },
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyItems: 'center',
        backgroundColor: '#0c1d36',
    },
    settingsBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        height: '10%',
        marginTop: 8,
        marginBottom: 8,
    },
    clockView: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#90a4ae',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '40%',
        borderRadius: 20,
        padding: 20,
    },
    clockActive: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9cc0b',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '40%',
        borderRadius: 20,
        padding: 20,
    },
    clockActivePenalty: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ef4444',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '43%',
        borderRadius: 20,
        padding: 20,
    },
    settingsButton: {
        marginLeft: 25,
        marginRight: 25,
    },
    clockText: {
        fontSize: 120,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    modalButton: {
        marginLeft: 10,
        marginRight: 10,
        width: 100,
    },
    modalCard: {
        width: '95%',
        alignItems: 'center',
        marginLeft: 10,
    },
    modalDangerButton: {
        backgroundColor: '#ef4444',
    },
    topClockInverse: {
        transform: 'rotate(180deg)',
    },
});

export default styles;
