import React, { useState, useEffect } from 'react';
import { View, Pressable, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';
import { Layout, Text, Button, Card, Modal, ButtonGroup } from '@ui-kitten/components';
import styles from './styles';
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from 'expo-status-bar';
import CountDown from 'react-native-countdown-component';

const ClockScreen = () => {

    const [clockTopRunning, setClockTopRunning] = useState(false);
    const [clockBottomRunning, setClockBottomRunning] = useState(false);
    const [isGamePaused, setIsGamePaused] = useState(true);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [clockTime, setClockTime] = useState(30);
    const [resetModalVisible, setResetModalVisible] = useState(false);
    const [runningTaskByPause, setRunningTaskByPause] = useState("");

    //Reset Params
    const [topClockId, setTopClockId] = useState("100");
    const [bottomClockId, setBottomClockId] = useState("1000");

    //penalty
    const [topPenalty, setTopPenalty] = useState(0);
    const [bottomPenalty, setBottomPenalty] = useState(0);

    const handlePlayPause = () => {
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

    const handleBottomTap = () => {
        if (isGameStarted && !isGamePaused) {
            setClockBottomRunning(false);
            setClockTopRunning(true);
        }
    }

    const handleTopTap = () => {
        if (isGameStarted && !isGamePaused) {
            setClockTopRunning(false);
            setClockBottomRunning(true);
        }
    }

    const resetGame = () => {
        setClockTopRunning(false);
        setClockBottomRunning(false);
        setClockTime(30);
        setBottomClockId(Math.random().toString());
        setTopClockId(Math.random().toString());
        setResetModalVisible(false);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={styles.pageContainer}>
                <Pressable style={clockTopRunning ? styles.clockActive : styles.clockView} onPress={handleTopTap}>
                    <View style={clockTopRunning ? styles.clockActive : styles.clockView}>
                        <CountDown
                            until={clockTime}
                            onFinish={() => alert('finished')}
                            timeToShow={['M', 'S']}
                            size={80}
                            digitStyle={{ backgroundColor: 'transparent' }}
                            digitTxtStyle={{ color: '#222B45', fontSize: 120 }}
                            timeLabels={{}}
                            showSeparator={true}
                            separatorStyle={{ padding: 0, margin: 0 }}
                            running={clockTopRunning}
                            id={topClockId}
                        />
                        {topPenalty > 0 && <Text category='h1'>Penalty: {topPenalty}</Text>}
                    </View>
                </Pressable>
                <View style={styles.settingsBar}>
                    <Pressable style={styles.settingsButton} onPress={() => { }}>
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
                <Pressable style={clockBottomRunning ? styles.clockActive : styles.clockView} onPress={handleBottomTap}>
                    <View style={clockBottomRunning ? styles.clockActive : styles.clockView}>
                        <CountDown
                            until={clockTime}
                            onFinish={() => alert('finished')}
                            timeToShow={['M', 'S']}
                            size={80}
                            digitStyle={{ backgroundColor: 'transparent' }}
                            digitTxtStyle={{ color: '#222B45', fontSize: 120 }}
                            timeLabels={{}}
                            showSeparator={true}
                            separatorStyle={{ padding: 0, margin: 0 }}
                            running={clockBottomRunning}
                            id={bottomClockId}
                        />
                        {bottomPenalty > 0 && <Text category='h1'>Penalty: {bottomPenalty}</Text>}
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
    );
}


export default ClockScreen;