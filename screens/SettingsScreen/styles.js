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
    },
    pageContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#0c1d36',
        padding: 30,
    },
    pageTitle: {
        color: 'white',
    },
    settingContainer: {
        marginVertical: 20,
    },
    settingTitle: {
        color: 'white',
    },
    settingSubtitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'normal',
    },
    changeSettingContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    changeSettingLeft: {
        width: '70%',
    },
    changeSettingRight: {
        width: '30%',
        paddingLeft: 20,
    },
    settingChangeButton: {
        padding: 0,
        height: 50,
        backgroundColor: '#f9cc0b',
        color: 'black',
        borderColor: '#f9cc0b',
    },
    settingChangeInput: {
        height: 50,
    },
    divider: {
        backgroundColor: 'white',
        alignSelf: 'stretch',
    },
    personalizationSettingsText: {
        color: 'white',
        fontSize: 15,
    },
    settingTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoIconContainer: {
        marginLeft: 8,
        padding: 4,
    },
    infoIcon: {
        width: 22,
        height: 22,
    },
    dualInputLabels: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    dualInputLabel: {
        flex: 1,
        color: '#aaa',
        fontSize: 11,
    },
    dualInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dualInput: {
        flex: 1,
        height: 50,
    },
    inputSeparator: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 6,
    },
});

export default styles;
