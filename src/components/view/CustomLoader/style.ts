import { StyleSheet } from "react-native";
import { Colors } from "../../../utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.MODAL_BACKGROUND,
    },
    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 10,
    }
});

export default styles;