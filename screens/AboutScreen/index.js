import React from 'react';
import { Image, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import SOC from "../../assets/Scrabble-o-Clock-long.png";
import styles from './styles';

const AboutScreen = () => {
    return (

        <Layout style={styles.pageContainer}>
            {/* Add the SOC image */}
            <Image source={SOC} style={{ width: 300, height: 200 }} />
            <View style={styles.textContainer}>
                <Text category='h6' style={styles.aboutText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </View>
        </Layout>
    );
}

export default AboutScreen;