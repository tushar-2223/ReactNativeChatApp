import { StyleSheet } from "react-native";
import { FontSize } from "../../../utils";

const styles = StyleSheet.create({
    button: {
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
    },
    text: {
        fontSize: FontSize.fontLarge,
        opacity: 0.9,
    }
});

export default styles;