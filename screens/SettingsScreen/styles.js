import { StyleSheet, Dimensions } from "react-native";
import Constants from 'expo-constants'


const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: Constants.statusBarHeight,
        backgroundColor: "#0c1d36",
        padding: 30,
        height: "100%"
    },
    pageTitle: {
        color: "white",
    },
    settingContainer:{
        marginVertical: 20,
    },
    settingTitle:{
        color: "white",
    },
    settingSubtitle: {
        color: "white",
        fontSize: 14
    },
    changeSettingContainer:{
        display: "flex",
        flexDirection: "row",
        marginBottom: 20
    },
    changeSettingLeft: {
        width: "70%",
        alignSelf: "center",
    },
    changeSettingRight: {
        width: "30%",
        paddingLeft: 20
    },
    settingChangeButton: {
        padding: 0,
        height: 48,
        backgroundColor: '#f9cc0b',
        color: "#0c1d36",
        borderColor: '#f9cc0b',
        
    },
    settingChangeInput: {
        height: 50
    },
    divider:{
        backgroundColor: "white",
        alignSelf: "stretch"
    },
    personalizationSettingsText: {
        color: "white",
        fontSize: 15
    }
    
});

export default styles;