import React from "react";
import { Image, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import SOC from "../../assets/Scrabble-o-Clock-long.png";
import styles from "./styles";

const AboutScreen = () => {
  return (
    <Layout style={styles.pageContainer}>
      {/* Add the SOC image */}
      <Image source={SOC} style={{ width: 300, height: 200 }} />
      <Text category="h6" style={styles.aboutScreenSubtitleText}>
        Version: 2.1.1
      </Text>
      <View style={styles.textContainer}>
        <Text category="h6" style={styles.aboutScreenSubtitleText}>
          The University of Colombo (UOC) is home to an avid Scrabble community, which comprises a plethora of skilled players. Over the
          years, UoC has dominated the University Scrabble arena, clinching numerous titles and accolades in various competitions. With a
          reputation for excellence and a robust player base, the University of Colombo is undoubtedly a hub of Scrabble expertise, where
          enthusiastic undergraduates of the game can engage in thrilling matches and hone their skills.
        </Text>
      </View>
    </Layout>
  );
};

export default AboutScreen;
