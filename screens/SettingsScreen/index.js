/*
 * Copyright (c) 2023 Suvin Kodituwakku
 *
 * This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * You may share and adapt this work, but only for non-commercial purposes, and with proper attribution.
 *
 * License details: https://creativecommons.org/licenses/by-nc/4.0/
 */

import React, { useState, useEffect } from 'react';
import { View, Keyboard, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, Text, Button, Divider, Input, Toggle } from '@ui-kitten/components';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PTRView from 'react-native-pull-to-refresh';
import styles from './styles';
import LoadingIndicator from '../../common/LoadingIndicator';
import {
    DEFAULT_TIME,
    DEFAULT_OVERTIME,
    DEFAULT_PENALTY,
    DEFAULT_OPPOSITE_DIRECTION,
    DEFAULT_HAPTICS_ENABLED,
    DEFAULT_STOP_ON_TIME_END,
} from '../../constants';
import { toBool } from '../../utils';

const SettingsScreen = () => {
    const { height: screenHeight } = Dimensions.get('window');
    const [timeMinutes, setTimeMinutes] = useState('');
    const [timeSeconds, setTimeSeconds] = useState('');
    const [overtimeMinutes, setOvertimeMinutes] = useState('');
    const [overtimeSeconds, setOvertimeSeconds] = useState('');
    const [penalty, setPenalty] = useState('');
    const [loading, setLoading] = useState(true);
    const [isOppositeDirectionCards, setIsOppositeDirectionCards] = useState(true);
    const [isHapticsEnabled, setIsHapticsEnabled] = useState(true);
    const [isStopOnTimeEnd, setIsStopOnTimeEnd] = useState(false);

    useEffect(() => {
        _getSettingsFromStorage();
    }, []);

    const totalSecondsToMinSec = (totalSeconds) => {
        const num = parseInt(totalSeconds, 10);
        const mins = Math.floor(num / 60);
        const secs = num % 60;
        return { mins: mins.toString(), secs: secs.toString() };
    };

    const _getSettingsFromStorage = async () => {
        try {
            const [time, overtime, penalty, isOppositeDirectionCards, isHapticsEnabled, stopOnTimeEnd] = await Promise.all([
                AsyncStorage.getItem('@time'),
                AsyncStorage.getItem('@overtime'),
                AsyncStorage.getItem('@penalty'),
                AsyncStorage.getItem('@isOppositeDirectionCards'),
                AsyncStorage.getItem('@isHapticsEnabled'),
                AsyncStorage.getItem('@stopOnTimeEnd'),
            ]);

            isOppositeDirectionCards === null &&
                _setDefaultsFirstTime('@isOppositeDirectionCards', DEFAULT_OPPOSITE_DIRECTION);
            isHapticsEnabled === null && _setDefaultsFirstTime('@isHapticsEnabled', DEFAULT_HAPTICS_ENABLED);
            stopOnTimeEnd === null && _setDefaultsFirstTime('@stopOnTimeEnd', DEFAULT_STOP_ON_TIME_END);
            penalty === null && _setDefaultsFirstTime('@penalty', DEFAULT_PENALTY);

            // Migrate old format (minutes) to new format (total seconds)
            const migrateToSeconds = (value, key, defaultVal) => {
                if (value === null) return defaultVal;
                const num = parseInt(value, 10);
                if (num < 60) {
                    const migrated = num * 60;
                    AsyncStorage.setItem(key, migrated.toString());
                    return migrated;
                }
                return num;
            };

            const timeVal = migrateToSeconds(time, '@time', DEFAULT_TIME);
            const overtimeVal = migrateToSeconds(overtime, '@overtime', DEFAULT_OVERTIME);
            const penaltyVal = penalty || DEFAULT_PENALTY.toString();

            const timeParts = totalSecondsToMinSec(timeVal.toString());
            setTimeMinutes(timeParts.mins);
            setTimeSeconds(timeParts.secs);

            const overtimeParts = totalSecondsToMinSec(overtimeVal.toString());
            setOvertimeMinutes(overtimeParts.mins);
            setOvertimeSeconds(overtimeParts.secs);

            setPenalty(penaltyVal);

            setIsOppositeDirectionCards(
                isOppositeDirectionCards === null ? DEFAULT_OPPOSITE_DIRECTION : toBool(isOppositeDirectionCards)
            );
            setIsHapticsEnabled(isHapticsEnabled === null ? DEFAULT_HAPTICS_ENABLED : toBool(isHapticsEnabled));
            setIsStopOnTimeEnd(stopOnTimeEnd === null ? DEFAULT_STOP_ON_TIME_END : toBool(stopOnTimeEnd));

            setLoading(false);
        } catch (error) {
            console.log(error);
            alert('Could not load settings :(');
            setLoading(false);
        }
    };

    const _setDefaultsFirstTime = async (key, value) => {
        Keyboard.dismiss();
        try {
            await AsyncStorage.setItem(key, value.toString());
        } catch (error) {
            console.log(error);
        }
    };

    const validateMinutesSeconds = (minutes, seconds, label) => {
        const mins = Number(minutes);
        const secs = Number(seconds);

        if (isNaN(mins) || !Number.isInteger(mins)) {
            alert(`Please enter a valid whole number for ${label} minutes`);
            return false;
        }
        if (isNaN(secs) || !Number.isInteger(secs)) {
            alert(`Please enter a valid whole number for ${label} seconds`);
            return false;
        }
        if (mins < 1) {
            alert(`${label} minutes must be at least 1`);
            return false;
        }
        if (secs < 0 || secs > 59) {
            alert(`${label} seconds must be between 0 and 59`);
            return false;
        }
        return true;
    };

    const validatePenalty = (value) => {
        const num = Number(value);
        if (isNaN(num)) {
            alert('Please enter a valid number for penalty');
            return false;
        }
        if (num < 0) {
            alert('Penalty cannot be negative');
            return false;
        }
        return true;
    };

    const _setGameTime = async () => {
        if (validateMinutesSeconds(timeMinutes, timeSeconds, 'Game time')) {
            Keyboard.dismiss();
            const totalSeconds = Number(timeMinutes) * 60 + Number(timeSeconds);
            try {
                await AsyncStorage.setItem('@time', totalSeconds.toString());
                alert('Successfully saved :)');
            } catch (error) {
                alert('Could not save game time :(');
            }
        }
    };

    const _setOverTimeLimit = async () => {
        if (validateMinutesSeconds(overtimeMinutes, overtimeSeconds, 'Overtime')) {
            Keyboard.dismiss();
            const totalSeconds = Number(overtimeMinutes) * 60 + Number(overtimeSeconds);
            try {
                await AsyncStorage.setItem('@overtime', totalSeconds.toString());
                alert('Successfully saved :)');
            } catch (error) {
                alert('Could not save overtime limit :(');
            }
        }
    };

    const _setPenaltyTime = async () => {
        if (validatePenalty(penalty)) {
            Keyboard.dismiss();
            try {
                await AsyncStorage.setItem('@penalty', penalty.toString());
                alert('Successfully saved :)');
            } catch (error) {
                alert('Could not save penalty time :(');
            }
        }
    };

    const _setTimerDirections = async (status) => {
        try {
            await AsyncStorage.setItem('@isOppositeDirectionCards', status.toString());
            alert('Successfully saved :)');
        } catch (error) {
            alert('Could not save timer direction :(');
        }
    };

    const _setHapticsSettings = async (status) => {
        try {
            await AsyncStorage.setItem('@isHapticsEnabled', status.toString());
            alert('Successfully saved :)');
        } catch (error) {
            alert('Could not save haptics settings :(');
        }
    };

    const applyTimerDirectionSettings = (isChecked) => {
        setIsOppositeDirectionCards(isChecked);
        _setTimerDirections(isChecked);
    };

    const applyHapticsSettings = (isChecked) => {
        console.log(isChecked);
        setIsHapticsEnabled(isChecked);
        _setHapticsSettings(isChecked);
    };

    const _setStopOnTimeEndSetting = async (status) => {
        try {
            await AsyncStorage.setItem('@stopOnTimeEnd', status.toString());
            alert('Successfully saved :)');
        } catch (error) {
            alert('Could not save setting :(');
        }
    };

    const applyStopOnTimeEnd = (isChecked) => {
        setIsStopOnTimeEnd(isChecked);
        _setStopOnTimeEndSetting(isChecked);
    };

    const showInfo = (title, message) => {
        Alert.alert(title, message);
    };

    const renderInfoIcon = (onPress) => (
        <TouchableOpacity onPress={onPress} style={styles.infoIconContainer}>
            <Ionicons name="information-circle-outline" size={22} color="#f9cc0b" />
        </TouchableOpacity>
    );

    return (
        <PTRView
            onRefresh={_getSettingsFromStorage}
            keyboardShouldPersistTaps="handled"
            style={{ height: '100%', backgroundColor: '#0c1d36' }}
        >
            <SafeAreaView style={styles.safeAreaContainer}>
                {!loading ? (
                    <Layout style={styles.pageContainer}>
                        <Text category="h1" style={styles.pageTitle}>
                            SETTINGS
                        </Text>
                        <View>
                            <View style={styles.settingContainer}>
                                <View style={styles.settingTitleRow}>
                                    <Text category="h4" style={styles.settingTitle}>
                                        Time
                                    </Text>
                                    {renderInfoIcon(() =>
                                        showInfo(
                                            'Game Time',
                                            'Enter the time each player has at the beginning.\n\nMinutes: Must be at least 1 (whole numbers only).\nSeconds: Must be between 0 and 59 (whole numbers only).'
                                        )
                                    )}
                                </View>
                                <Text category="h6" style={styles.settingSubtitle}>
                                    The number of minutes each player has at the beginning
                                </Text>
                            </View>
                            <View style={styles.changeSettingContainer}>
                                <View style={styles.changeSettingLeft} keyboardShouldPersistTaps="always">
                                    <View style={styles.dualInputLabels}>
                                        <Text style={styles.dualInputLabel}>Minutes</Text>
                                        <Text style={styles.dualInputLabel}>Seconds</Text>
                                    </View>
                                    <View style={styles.dualInputRow}>
                                        <Input
                                            size="large"
                                            keyboardType="numeric"
                                            placeholder="Min"
                                            value={timeMinutes}
                                            style={styles.dualInput}
                                            onChangeText={(val) => setTimeMinutes(val)}
                                        />
                                        <Text style={styles.inputSeparator}>:</Text>
                                        <Input
                                            size="large"
                                            keyboardType="numeric"
                                            placeholder="Sec"
                                            value={timeSeconds}
                                            style={styles.dualInput}
                                            onChangeText={(val) => setTimeSeconds(val)}
                                        />
                                    </View>
                                </View>
                                <View style={styles.changeSettingRight}>
                                    <Button size="small" style={styles.settingChangeButton} onPress={_setGameTime}>
                                        Save
                                    </Button>
                                </View>
                            </View>
                            <Divider style={styles.divider} />
                        </View>
                        <View style={isStopOnTimeEnd ? styles.disabledSection : null} pointerEvents={isStopOnTimeEnd ? 'none' : 'auto'}>
                            <View style={styles.settingContainer}>
                                <View style={styles.settingTitleRow}>
                                    <Text category="h4" style={styles.settingTitle}>
                                        Overtime Limit
                                    </Text>
                                    {renderInfoIcon(() =>
                                        showInfo(
                                            'Overtime Limit',
                                            'Enter the maximum overtime before disqualification.\n\nMinutes: Must be at least 1 (whole numbers only).\nSeconds: Must be between 0 and 59 (whole numbers only).'
                                        )
                                    )}
                                </View>
                                <Text category="h6" style={styles.settingSubtitle}>
                                    The maximum number of minutes of overtime before disqualification
                                </Text>
                            </View>
                            <View style={styles.changeSettingContainer}>
                                <View style={styles.changeSettingLeft}>
                                    <View style={styles.dualInputLabels}>
                                        <Text style={styles.dualInputLabel}>Minutes</Text>
                                        <Text style={styles.dualInputLabel}>Seconds</Text>
                                    </View>
                                    <View style={styles.dualInputRow}>
                                        <Input
                                            size="large"
                                            keyboardType="numeric"
                                            placeholder="Min"
                                            value={overtimeMinutes}
                                            style={styles.dualInput}
                                            onChangeText={(val) => setOvertimeMinutes(val)}
                                        />
                                        <Text style={styles.inputSeparator}>:</Text>
                                        <Input
                                            size="large"
                                            keyboardType="numeric"
                                            placeholder="Sec"
                                            value={overtimeSeconds}
                                            style={styles.dualInput}
                                            onChangeText={(val) => setOvertimeSeconds(val)}
                                        />
                                    </View>
                                </View>
                                <View style={styles.changeSettingRight}>
                                    <Button size="small" style={styles.settingChangeButton} onPress={_setOverTimeLimit}>
                                        Save
                                    </Button>
                                </View>
                            </View>
                            <Divider style={styles.divider} />
                        </View>
                        <View style={isStopOnTimeEnd ? styles.disabledSection : null} pointerEvents={isStopOnTimeEnd ? 'none' : 'auto'}>
                            <View style={styles.settingContainer}>
                                <View style={styles.settingTitleRow}>
                                    <Text category="h4" style={styles.settingTitle}>
                                        Penalty
                                    </Text>
                                    {renderInfoIcon(() =>
                                        showInfo(
                                            'Penalty',
                                            'Enter the point deduction per started minute of overtime.\n\nMust be 0 or a positive number. Decimal values are accepted (e.g. 1.5). Negative values are not allowed.'
                                        )
                                    )}
                                </View>
                                <Text category="h6" style={styles.settingSubtitle}>
                                    Point reduction per started minute of overtime
                                </Text>
                            </View>
                            <View style={styles.changeSettingContainer}>
                                <View style={styles.changeSettingLeft}>
                                    <Input
                                        size="large"
                                        placeholder="Penalty per minute"
                                        keyboardType="decimal-pad"
                                        value={penalty}
                                        style={styles.settingChangeInput}
                                        onChangeText={(nextValue) => setPenalty(nextValue)}
                                    />
                                </View>
                                <View style={styles.changeSettingRight}>
                                    <Button size="small" style={styles.settingChangeButton} onPress={_setPenaltyTime}>
                                        {' '}
                                        Save{' '}
                                    </Button>
                                </View>
                            </View>
                            <Divider style={styles.divider} />
                        </View>
                        <View>
                            <View style={styles.settingContainer}>
                                <Text category="h4" style={styles.settingTitle}>
                                    Personalization
                                </Text>
                                <Text category="h6" style={styles.settingSubtitle}>
                                    Customize the UI
                                </Text>
                            </View>
                            <View style={styles.changeSettingContainer}>
                                <View style={styles.changeSettingLeft}>
                                    <Text category="h5" style={styles.personalizationSettingsText}>
                                        Timers facing opposite direction
                                    </Text>
                                </View>
                                <View style={styles.changeSettingRight}>
                                    <Toggle
                                        size="small"
                                        status="warning"
                                        checked={isOppositeDirectionCards}
                                        onChange={applyTimerDirectionSettings}
                                    />
                                </View>
                            </View>
                            <View style={styles.changeSettingContainer}>
                                <View style={styles.changeSettingLeft}>
                                    <Text category="h5" style={styles.personalizationSettingsText}>
                                        Haptics
                                    </Text>
                                </View>
                                <View style={styles.changeSettingRight}>
                                    <Toggle
                                        size="small"
                                        status="warning"
                                        checked={isHapticsEnabled}
                                        onChange={applyHapticsSettings}
                                    />
                                </View>
                            </View>
                            <View style={styles.changeSettingContainer}>
                                <View style={styles.changeSettingLeft}>
                                    <Text category="h5" style={styles.personalizationSettingsText}>
                                        Stop game when time is over
                                    </Text>
                                </View>
                                <View style={styles.changeSettingRight}>
                                    <Toggle
                                        size="small"
                                        status="warning"
                                        checked={isStopOnTimeEnd}
                                        onChange={applyStopOnTimeEnd}
                                    />
                                </View>
                            </View>
                            <Divider style={styles.divider} />
                        </View>
                    </Layout>
                ) : (
                    <LoadingIndicator />
                )}
            </SafeAreaView>
        </PTRView>
    );
};

export default SettingsScreen;
