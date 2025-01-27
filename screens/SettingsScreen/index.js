import React, { useState, useEffect } from "react";
import { View, Keyboard, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, Text, Button, Divider, Input, Toggle } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import LoadingIndicator from "../../common/LoadingIndicator";
import PTRView from "react-native-pull-to-refresh";
import {
  DEFAULT_TIME,
  DEFAULT_OVERTIME,
  DEFAULT_PENALTY,
  DEFAULT_OPPOSITE_DIRECTION,
  DEFAULT_HAPTICS_ENABLED,
} from "../../utils/constants";
import { toBool } from "../../utils/utils";

const SettingsScreen = () => {
  const { height: screenHeight } = Dimensions.get("window");
  const [time, setTime] = useState(0);
  const [overtime, setOvertime] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isOppositeDirectionCards, setIsOppositeDirectionCards] = useState(true);
  const [isHapticsEnabled, setIsHapticsEnabled] = useState(true);

  useEffect(() => {
    _getSettingsFromStorage();
  }, []);

  const _getSettingsFromStorage = async () => {
    try {
      const [time, overtime, penalty, isOppositeDirectionCards, isHapticsEnabled] = await Promise.all([
        AsyncStorage.getItem("@time"),
        AsyncStorage.getItem("@overtime"),
        AsyncStorage.getItem("@penalty"),
        AsyncStorage.getItem("@isOppositeDirectionCards"),
        AsyncStorage.getItem("@isHapticsEnabled"),
      ]);

      time === null && _setDefaultsFirstTime("@time", DEFAULT_TIME);
      overtime === null && _setDefaultsFirstTime("@overtime", DEFAULT_OVERTIME);
      penalty === null && _setDefaultsFirstTime("@penalty", DEFAULT_PENALTY);
      isOppositeDirectionCards === null && _setDefaultsFirstTime("@isOppositeDirectionCards", DEFAULT_OPPOSITE_DIRECTION);
      isHapticsEnabled === null && _setDefaultsFirstTime("@isHapticsEnabled", DEFAULT_HAPTICS_ENABLED);

      setTime(time || DEFAULT_TIME);
      setOvertime(overtime || DEFAULT_OVERTIME);
      setPenalty(penalty || DEFAULT_PENALTY);
      setIsOppositeDirectionCards(isOppositeDirectionCards === null ? DEFAULT_OPPOSITE_DIRECTION : toBool(isOppositeDirectionCards));
      setIsHapticsEnabled(isHapticsEnabled === null ? DEFAULT_HAPTICS_ENABLED : toBool(isHapticsEnabled));

      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Could not load settings :(");
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

  const _setGameTime = async () => {
    if (validateTime(time)) {
      try {
        await AsyncStorage.setItem("@time", time.toString());
        alert("Successfully saved :)");
      } catch (error) {
        alert("Could not save game time :(");
      }
    }
  };

  const _setOverTimeLimit = async () => {
    if (validateTime(overtime)) {
      try {
        await AsyncStorage.setItem("@overtime", overtime.toString());
        alert("Successfully saved :)");
      } catch (error) {
        alert("Could not save overtime limit :(");
      }
    }
  };

  const _setPenaltyTime = async () => {
    if (validateTime(penalty)) {
      try {
        await AsyncStorage.setItem("@penalty", penalty.toString());
        alert("Successfully saved :)");
      } catch (error) {
        alert("Could not save penalty time :(");
      }
    }
  };

  const _setTimerDirections = async (status) => {
    try {
      await AsyncStorage.setItem("@isOppositeDirectionCards", status.toString());
      alert("Successfully saved :)");
    } catch (error) {
      alert("Could not save timer direction :(");
    }
  };

  const _setHapticsSettings = async (status) => {
    try {
      await AsyncStorage.setItem("@isHapticsEnabled", status.toString());
      alert("Successfully saved :)");
    } catch (error) {
      alert("Could not save haptics settings :(");
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

  const validateTime = (time) => {
    const parsedTime = Number(time);
    if (!isNaN(parsedTime) && Number.isInteger(parsedTime)) {
      return true;
    }
    alert("⚠️ Please enter a valid time");
  };

  const getParentLayoutStyles = () => {
    // Adjust the screen size when a safe area is present
    const screenStyles = {
      ...styles.pageContainer,
      minHeight: (parentScreenHeight / screenHeight) * 100 + "%",
      height: (parentScreenHeight / screenHeight) * 100 + "%",
    };
    return screenStyles;
  };

  return (
    <PTRView onRefresh={_getSettingsFromStorage} keyboardShouldPersistTaps="handled" style={{ height: "100%", backgroundColor: "#0c1d36" }}>
      <SafeAreaView style={styles.safeAreaContainer}>
        {!loading ? (
          <Layout style={styles.pageContainer}>
            <Text category="h1" style={styles.pageTitle}>
              SETTINGS
            </Text>
            <View>
              <View style={styles.settingContainer}>
                <Text category="h4" style={styles.settingTitle}>
                  Time
                </Text>
                <Text category="h6" style={styles.settingSubtitle}>
                  The number of minutes each player has at the beginning
                </Text>
              </View>
              <View style={styles.changeSettingContainer}>
                <View style={styles.changeSettingLeft} keyboardShouldPersistTaps="always">
                  <Input
                    size="large"
                    keyboardType="numeric"
                    placeholder="Time in minutes"
                    defaultValue={time.toString()}
                    style={styles.settingChangeInput}
                    onChangeText={(nextValue) => setTime(nextValue)}
                  />
                </View>
                <View style={styles.changeSettingRight}>
                  <Button size="small" style={styles.settingChangeButton} onPress={_setGameTime}>
                    Save
                  </Button>
                </View>
              </View>
              <Divider style={styles.divider} />
            </View>
            <View>
              <View style={styles.settingContainer}>
                <Text category="h4" style={styles.settingTitle}>
                  Overtime Limit
                </Text>
                <Text category="h6" style={styles.settingSubtitle}>
                  The maximum number of minutes of overtime before disqualification
                </Text>
              </View>
              <View style={styles.changeSettingContainer}>
                <View style={styles.changeSettingLeft}>
                  <Input
                    size="large"
                    keyboardType="numeric"
                    placeholder="Time in minutes"
                    defaultValue={overtime.toString()}
                    style={styles.settingChangeInput}
                    onChangeText={(nextValue) => setOvertime(nextValue)}
                  />
                </View>
                <View style={styles.changeSettingRight}>
                  <Button size="small" style={styles.settingChangeButton} onPress={_setOverTimeLimit}>
                    Save
                  </Button>
                </View>
              </View>
              <Divider style={styles.divider} />
            </View>
            <View>
              <View style={styles.settingContainer}>
                <Text category="h4" style={styles.settingTitle}>
                  Penalty
                </Text>
                <Text category="h6" style={styles.settingSubtitle}>
                  Point reduction per started minute of overtime
                </Text>
              </View>
              <View style={styles.changeSettingContainer}>
                <View style={styles.changeSettingLeft}>
                  <Input
                    size="large"
                    placeholder="Penalty per minute"
                    keyboardType="numeric"
                    defaultValue={penalty.toString()}
                    style={styles.settingChangeInput}
                    onChangeText={(nextValue) => setPenalty(nextValue)}
                  />
                </View>
                <View style={styles.changeSettingRight}>
                  <Button size="small" style={styles.settingChangeButton} onPress={_setPenaltyTime}>
                    {" "}
                    Save{" "}
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
                  <Toggle size="small" status="warning" checked={isOppositeDirectionCards} onChange={applyTimerDirectionSettings} />
                </View>
              </View>
              <View style={styles.changeSettingContainer}>
                <View style={styles.changeSettingLeft}>
                  <Text category="h5" style={styles.personalizationSettingsText}>
                    Haptics
                  </Text>
                </View>
                <View style={styles.changeSettingRight}>
                  <Toggle size="small" status="warning" checked={isHapticsEnabled} onChange={applyHapticsSettings} />
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
