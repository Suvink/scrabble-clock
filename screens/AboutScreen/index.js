/*
 * Copyright (c) 2023 Suvin Kodituwakku
 *
 * This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * You may share and adapt this work, but only for non-commercial purposes, and with proper attribution.
 *
 * License details: https://creativecommons.org/licenses/by-nc/4.0/
 */

import React from 'react';
import { Image, View, Linking, TouchableOpacity } from 'react-native';
import * as Device from 'expo-device';
import { Layout, Text } from '@ui-kitten/components';
import SOCLogo from '../../assets/Scrabble-o-Clock-long.png';
import SOCLogoIos from '../../assets/ios/Scrabble-o-Clock-long-ios.png';
import BMCLogo from '../../assets/bmc-logo.png';
import styles from './styles';
import { PLATFORM_IOS } from '../../constants';

const AboutScreen = () => {
    const isIos = Device.osName === PLATFORM_IOS;

    return (
        <Layout style={styles.pageContainer}>
            {/* Add the SOC image for Android and Tally image for iOS */}
            {isIos ? (
                <Image source={SOCLogoIos} style={{ width: 300, height: 200 }} />
            ) : (
                <Image source={SOCLogo} style={{ width: 300, height: 200 }} />
            )}
            <Text category="h6" style={styles.aboutScreenSubtitleText}>
                Version: 3.2.0
            </Text>
            <View style={styles.textContainer}>
                {isIos ? (
                    <Text category="h6" style={styles.aboutScreenSubtitleText}>
                        The University of Colombo (UOC) is home to an avid word game community, comprising a plethora of
                        skilled players. Over the years, UOC has dominated university-level word game competitions,
                        clinching numerous titles and accolades in various tournaments. With a reputation for excellence
                        and a robust player base, the University of Colombo is undoubtedly a hub for competitive
                        wordplay, where enthusiastic undergraduates can engage in thrilling matches and hone their
                        skills.
                    </Text>
                ) : (
                    <Text category="h6" style={styles.aboutScreenSubtitleText}>
                        The University of Colombo (UOC) is home to an avid Scrabble community, which comprises a
                        plethora of skilled players. Over the years, UOC has dominated the University Scrabble arena,
                        clinching numerous titles and accolades in various competitions. With a reputation for
                        excellence and a robust player base, the University of Colombo is undoubtedly a hub of Scrabble
                        expertise, where enthusiastic undergraduates of the game can engage in thrilling matches and
                        hone their skills.
                    </Text>
                )}
            </View>
            <View style={styles.supportContainer}>
                <Text category="h6" style={styles.supportText}>
                    This app is free, always has been, always will be. No ads. No subscriptions. No mysterious "premium
                    tier" that unlocks the letter Q. Just one developer, an unreasonable coffee habit, and a dream. If
                    this app has ever saved a game night or helped you absolutely destroy your friends at the table, a
                    coffee would mean the world and will almost certainly be metabolized directly into new features :)
                </Text>
                <TouchableOpacity
                    onPress={() => Linking.openURL('https://buymeacoffee.com/suvink')}
                    activeOpacity={0.8}
                >
                    <Image source={BMCLogo} style={styles.bmcLogo} resizeMode="contain" />
                </TouchableOpacity>
            </View>
        </Layout>
    );
};

export default AboutScreen;
