import { StyleSheet } from "react-native";
import { Colors, height } from "../../../utils";

const styles = StyleSheet.create({
    socialAuthentication: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.03,
    },
    socialButton: {
        height: height * 0.06,
        width: height * 0.06,
        borderRadius: 100,
        justifyContent: 'center',
        marginHorizontal: 10,
        alignItems: 'center',
    },
    socialIcon: {
        height: height * 0.045,
        width: height * 0.045,
        alignItems: 'center',
    },
});

export default styles;