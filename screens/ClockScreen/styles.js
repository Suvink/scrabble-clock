import { StyleSheet } from "react-native";
import Constants from 'expo-constants'

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        justifyItems: "center",
        height: "100%",
        marginTop: Constants.statusBarHeight,
        backgroundColor: "#0c1d36"
    },
    settingsBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        height: 70,
        marginTop: 8,
        marginBottom: 8
    },
    clockView: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#90a4ae',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: "43%",
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
        height: "43%",
        borderRadius: 20,
        padding: 20,
    },
    clockActivePenalty: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f90b42',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: "43%",
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
        width: '100%',
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
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    topClockInverse: {
        transform: "rotate(180deg)"
    }
});

export default styles;