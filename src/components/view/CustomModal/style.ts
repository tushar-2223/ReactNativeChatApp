import { StyleSheet } from "react-native";
import { Colors, Fonts, FontSize, width } from "../../../utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.MODAL_BACKGROUND
    },
    modalContainer: {
        backgroundColor: Colors.PRIMARY,
        padding: 20,
        borderRadius: 10,
        width: width - 60,
    },
    title: {
        fontSize: width * 0.05,
        color: Colors.DARK,
        fontFamily: Fonts.semiBold
    },
    message: {
        fontSize: width * 0.04,
        color: Colors.TEXT_LITE_GRAY,
        fontFamily: Fonts.medium,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 20
    },
    button: {
        width: width * 0.2,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: Colors.CHAT_BUBBLE
    },
    buttonText: {
        color: Colors.PRIMARY,
        fontFamily: Fonts.semiBold
    }
});

export default styles;