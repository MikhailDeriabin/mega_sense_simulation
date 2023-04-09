import {StyleSheet, Text} from "react-native";
import {Color} from "../../constant/color";

export default function NormalText({text}) {
    return (
        <Text style={styles.text}>{text}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        color: Color.text
    },
});