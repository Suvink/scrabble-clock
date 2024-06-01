import { StyleSheet, Dimensions } from "react-native";
import Constants from 'expo-constants'


const styles = StyleSheet.create({
    pageContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: "#0c1d36",
    },
    textContainer: {
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    aboutScreenSubtitleText: {
        fontSize: 14,
        color: "white",
        textAlign: "justify",
        fontWeight: "normal",
    }
    
});

export default styles;