import React, { useState, useEffect } from 'react';
import { View, Pressable, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';
import { Layout, Text, Button, Card, Modal, ButtonGroup } from '@ui-kitten/components';
import styles from './styles';
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from 'expo-status-bar';
import CountDown from '../../packages/CountdownTimer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PTRView from "react-native-pull-to-refresh";
import * as Haptics from 'expo-haptics';
import { 
    DEFAULT_TIME, 
    DEFAULT_OVERTIME, 
    DEFAULT_PENALTY, 
    DEFAULT_OPPOSITE_DIRECTION, 
    DEFAULT_HAPTICS_ENABLED } from '../../utils/constants';

const ClockScreen = ({ navigation }) => {

    const [clockTopRunning, setClockTopRunning] = useState(false);
    const [clockBottomRunning, setClockBottomRunning] = useState(false);
    const [isGamePaused, setIsGamePaused] = useState(true);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [resetModalVisible, setResetModalVisible] = useState(false);
    const [runningTaskByPause, setRunningTaskByPause] = useState("");
    const [isOppositeDirectionCards, setIsOppositeDirectionCards] = useState(true);
    const [isHapticsEnabled, setIsHapticsEnabled] = useState(true);

    //Game settings
    const [gameTime, setGameTime] = useState(13);
    const [gameOvertime, setGameOvertime] = useState(5);
    const [gamePenalty, setGamePenalty] = useState(2);

    //Reset Params
    const [topClockId, setTopClockId] = useState("100");
    const [bottomClockId, setBottomClockId] = useState("1000");

    //penalty
    const [topPenalty, setTopPenalty] = useState("0");
    const [bottomPenalty, setBottomPenalty] = useState("0");
    const [topTimeEnded, setTopTimeEnded] = useState(false);
    const [bottomTimeEnded, setBottomTimeEnded] = useState(false);

    const getSettings = async () => {
        try {
            const keys = ['@time', '@overtime', '@penalty', '@isOppositeDirectionCards', '@isHapticsEnabled'];
            const [time, overtime, penalty, oppositeCardDirection, hapticsEnabled] = await AsyncStorage.multiGet(keys);

            setGameTime(time[1] ? parseInt(time[1]) : DEFAULT_TIME);
            setGameOvertime(overtime[1] ? parseInt(overtime[1]) : DEFAULT_OVERTIME);
            setGamePenalty(penalty[1] ? parseInt(penalty[1]) : DEFAULT_PENALTY);
            setIsOppositeDirectionCards(oppositeCardDirection[1] ? oppositeCardDirection[1] === "true" : DEFAULT_OPPOSITE_DIRECTION);
            setIsHapticsEnabled(hapticsEnabled[1] ? hapticsEnabled[1] === "true" : DEFAULT_HAPTICS_ENABLED);

            // Reset the timer UIs
            setClockTopRunning(false);
            setClockBottomRunning(false);
            setIsGamePaused(true);
            setBottomClockId(Math.random().toString());
            setTopClockId(Math.random().toString());
        } catch (error) {
            console.log(error);
            alert("Could not load settings :(");
        }
    };


    useEffect(() => {
        getSettings();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getSettings();
        });

        return unsubscribe;
    }, [navigation]);

    const handlePlayPause = () => {
        isHapticsEnabled && Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Warning
        );
        if (!isGameStarted) {
            setIsGamePaused(false);
            setIsGameStarted(true);
            setClockBottomRunning(true);
        } else {
            if (isGamePaused) {
                setIsGamePaused(false);
                if (runningTaskByPause == "top") {
                    setClockTopRunning(true);
                } else {
                    setClockBottomRunning(true);
                }
            } else {
                setIsGamePaused(true);
                if (clockTopRunning) {
                    setRunningTaskByPause("top");
                } else {
                    setRunningTaskByPause("bottom");
                }
                setClockTopRunning(false);
                setClockBottomRunning(false);
            }
        }
    }

    const handleBackgroundState = (state) => {
        //user leaves the game
        if (state === "pause") {
            if (isGameStarted && !isGamePaused) {
                setClockTopRunning(false);
                setClockBottomRunning(false);
                setIsGamePaused(true);
                const runningClock = clockTopRunning ? "top" : "bottom";
                setRunningTaskByPause(runningClock);
            }
            //User comes back to the game
        } else {
            if (isGameStarted && isGamePaused) {
                if (runningTaskByPause == "top") {
                    setClockTopRunning(true);
                } else {
                    setClockBottomRunning(true);
                }
                setIsGamePaused(false);
            }
        }
    }

    const handleBottomTap = () => {
        
        // Start the game if it hasn't started yet
        if (!isGameStarted) {
            isHapticsEnabled && Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
            );
            setIsGameStarted(true);
            setIsGamePaused(false);
            setClockTopRunning(true); // Second player triggers first player's timer
            return;
        }
        // If the game is started and not paused, switch the clocks
        if (isGameStarted && !isGamePaused) {
            isHapticsEnabled && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            setClockBottomRunning(false);
            setClockTopRunning(true);
        }
    }

    const handleTopTap = () => {
        
        // Start the game if it hasn't started yet
        if (!isGameStarted) {
            isHapticsEnabled && Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
            );
            setIsGameStarted(true);
            setIsGamePaused(false);
            setClockBottomRunning(true); // Second player triggers first player's timer
            return;
        }
        // If the game is started and not paused, switch the clocks
        if (isGameStarted && !isGamePaused) {
            isHapticsEnabled && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            setClockTopRunning(false);
            setClockBottomRunning(true);
        }
    }

    const resetGame = () => {
        setClockTopRunning(false);
        setClockBottomRunning(false);
        setRunningTaskByPause("");
        setIsGamePaused(true);
        setIsGameStarted(false);
        setBottomClockId(Math.random().toString());
        setTopClockId(Math.random().toString());
        setTopTimeEnded(false);
        setBottomTimeEnded(false);
        setTopPenalty("0");
        setBottomPenalty("0");
        setResetModalVisible(false);
    }

    const handleTopPenalty = (elapsed) => {
        if (topTimeEnded) {
            const topMins = Math.floor(elapsed / 60);
            const topSecs = Math.floor(elapsed % 60);
            const _topPenalty = (topMins * gamePenalty) + (topSecs > 0 ? gamePenalty : 0);

            if (topMins >= gameOvertime) {
                setTopPenalty("Disqualified");
            } else {
                setTopPenalty("Penalty: " + _topPenalty.toString());
            }
        }
    }

    const handleBottomPenalty = (elapsed) => {
        if (bottomTimeEnded) {
            const bottomMins = Math.floor(elapsed / 60);
            const bottomSecs = Math.floor(elapsed % 60);
            const _bottomPenalty = (bottomMins * gamePenalty) + (bottomSecs > 0 ? gamePenalty : 0);

            if (bottomMins >= gameOvertime) {
                setBottomPenalty("Disqualified");
            } else {
                setBottomPenalty("Penalty: " + _bottomPenalty.toString());
            }
        }
    }

    const getTopClockStyles = () => {
        const isActive = topTimeEnded || clockTopRunning;
        const baseStyles = isOppositeDirectionCards ? styles.topClockInverse : {};

        return isActive ? { ...baseStyles, ...styles.clockActive } : { ...baseStyles, ...styles.clockView };
    };


    return (
        <PTRView onRefresh={getSettings} style={{ height: "100%", backgroundColor: "#0c1d36" }}>
            <SafeAreaView style={styles.pageContainer}>
                <Layout style={styles.pageContainer}>
                    <Pressable
                        style={
                            topTimeEnded ? styles.clockActivePenalty
                                : (clockTopRunning ? styles.clockActive : styles.clockView)
                        }
                        onPress={handleTopTap}>
                        <View
                            style={
                                getTopClockStyles()
                            }
                        >
                            {(gameTime && gameOvertime && gamePenalty) && <CountDown
                                until={gameTime * 60}
                                onFinish={() => setTopTimeEnded(true)}
                                timeToShow={['M', 'S']}
                                size={80}
                                digitStyle={{ backgroundColor: 'transparent' }}
                                digitTxtStyle={{ color: '#222B45', fontSize: 120 }}
                                timeLabels={{}}
                                showSeparator={true}
                                separatorStyle={{ padding: 0, margin: 0 }}
                                running={clockTopRunning}
                                id={topClockId || 456}
                                onChange={handleTopPenalty}
                                onAppBackground={handleBackgroundState}
                                isGameStarted={isGameStarted}
                            />}
                            {topTimeEnded && <Text category='h2'>{topPenalty}</Text>}
                        </View>
                    </Pressable>
                    <View style={styles.settingsBar}>
                        <Pressable style={styles.settingsButton} onPress={() => {
                            navigation.navigate("Settings");
                        }}>
                            <Ionicons name="time" size={50} color="white" style={{ padding: 0 }} />
                        </Pressable>
                        <Pressable style={styles.settingsButton} onPress={handlePlayPause}>
                            {isGamePaused ? <Ionicons name="play" size={50} color="white" style={{ padding: 0 }} /> :
                                <Ionicons name="pause" size={50} color="white" style={{ padding: 0 }} />}
                        </Pressable>
                        <Pressable style={styles.settingsButton} onPress={() => setResetModalVisible(true)}>
                            <Ionicons name="refresh" size={50} color="white" style={{ padding: 0 }} />
                        </Pressable>
                    </View>
                    <Pressable
                        style={
                            bottomTimeEnded ? styles.clockActivePenalty
                                : (clockBottomRunning ? styles.clockActive : styles.clockView)
                        }
                        onPress={handleBottomTap}>
                        <View
                            style={
                                bottomTimeEnded ? styles.clockActivePenalty
                                    : (clockBottomRunning ? styles.clockActive : styles.clockView)
                            }
                        >
                            <CountDown
                                until={gameTime * 60}
                                onFinish={() => setBottomTimeEnded(true)}
                                timeToShow={['M', 'S']}
                                size={80}
                                digitStyle={{ backgroundColor: 'transparent' }}
                                digitTxtStyle={{ color: '#222B45', fontSize: 120 }}
                                timeLabels={{}}
                                showSeparator={true}
                                separatorStyle={{ padding: 0, margin: 0 }}
                                running={clockBottomRunning}
                                id={bottomClockId || 123}
                                onChange={handleBottomPenalty}
                                onAppBackground={handleBackgroundState}
                                isGameStarted={isGameStarted}
                            />
                            {bottomTimeEnded && <Text category='h2'>{bottomPenalty}</Text>}
                        </View>
                    </Pressable>
                </Layout>
                <StatusBar hidden={false} backgroundColor="#000000" style="dark" />
                <Modal
                    visible={resetModalVisible}
                    backdropStyle={styles.backdrop}
                // onBackdropPress={() => setVisible(false)}
                >
                    <Card disabled={true} style={styles.modalCard}>
                        <Text category='h6'>
                            Are you sure you want to reset the timer?
                        </Text>
                        <Layout level='1' style={styles.modalButtons}>
                            <Button appearance='filled' status='danger' style={styles.modalButton} onPress={resetGame}>
                                Yes
                            </Button>
                            <Button appearance='outline' status='basic' style={styles.modalButton} onPress={() => setResetModalVisible(false)}>
                                No
                            </Button>
                        </Layout>
                    </Card>
                </Modal>
            </SafeAreaView>
        </PTRView>
    );
}


export default ClockScreen;