import { Spinner } from "@ui-kitten/components";
import { View } from "react-native";
import styles from "./styles";

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="giant" status="warning" />
  </View>
);

export default LoadingIndicator;