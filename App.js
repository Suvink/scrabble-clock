/*
 * Copyright (c) 2023 Suvin Kodituwakku
 *
 * This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * You may share and adapt this work, but only for non-commercial purposes, and with proper attribution.
 *
 * License details: https://creativecommons.org/licenses/by-nc/4.0/
 */
import React from 'react';
import { Platform } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import Constants from 'expo-constants';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

//screens
import ClockScreen from './screens/ClockScreen';
import AboutScreen from './screens/AboutScreen';
import SettingsScreen from './screens/SettingsScreen';
import { GameStateProvider, useGameState } from './contexts/GameStateContext';

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();
    const { isGameStarted } = useGameState();

    return (
        <Tab.Navigator
            initialRouteName="Clock"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'About') {
                        iconName = focused ? 'information-circle' : 'information-circle-outline';
                    } else if (route.name === 'Clock') {
                        iconName = focused ? 'time' : 'time-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={'#f9cc0b'} />;
                },
                tabBarStyle: {
                    backgroundColor: '#0c1d36',
                    borderColor: '#0c1d36',
                    activeTintColor: '#f9cc0b',
                    borderTopWidth: 0,
                    display: isGameStarted ? 'none' : 'flex',
                },
                headerShown: false,
            })}
        >
            <Tab.Screen
                name="About"
                component={AboutScreen}
                options={{
                    title: '',
                    headerMode: 'none',
                    headerShown: false,
                    tabBarLabel: 'About',
                    tabBarLabelStyle: { fontSize: 14, marginBottom: 5, color: '#f9cc0b' },
                    headerStyle: { marginTop: Constants.statusBarHeight },
                }}
            />
            <Tab.Screen
                name="Clock"
                component={ClockScreen}
                options={{
                    title: '',
                    headerShown: false,
                    tabBarLabel: 'Clock',
                    tabBarLabelStyle: { fontSize: 14, marginBottom: 5, color: '#f9cc0b' },
                    headerStyle: { marginTop: Constants.statusBarHeight },
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: '',
                    headerShown: false,
                    tabBarLabel: 'Settings',
                    tabBarLabelStyle: { fontSize: 14, marginBottom: 5, color: '#f9cc0b' },
                    headerStyle: { marginTop: Constants.statusBarHeight },
                }}
            />
        </Tab.Navigator>
    );
};

const App = () => {
    const [loaded] = useFonts({
        Roboto_400Regular,
    });

    const customFontMapping = {
        ...eva.mapping,
        strict: {
            ...eva.mapping.strict,
            ...Platform.select({
                ios: {
                    'text-font-family': 'System',
                },
                android: {
                    'text-font-family': loaded ? 'Roboto_400Regular' : 'System',
                },
            }),
        },
    };

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light} mapping={customFontMapping}>
                <GameStateProvider>
                    <NavigationContainer>
                        <TabNavigator />
                    </NavigationContainer>
                </GameStateProvider>
            </ApplicationProvider>
        </>
    );
};

export default App;
