import { StyleSheet } from "react-native";
import { Colors, Fonts, width, height, FontSize } from "../../../utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: width * 0.06,
    },
    formContainer: {
        flexGrow: 1,
    },
    backAction: {
        marginTop: height * 0.06,
    },
    header: {
        marginTop: height * 0.06,
    },
    title: {
        color: Colors.TITLE_TEXT,
        fontFamily: Fonts.bold,
        fontSize: FontSize.fontXLarge,
        textAlign: 'center',
    },
    subText: {
        color: Colors.TEXT_LITE_GRAY,
        fontFamily: Fonts.regular,
        textAlign: 'center',
        marginTop: height * 0.01,
    },
    socialAuthentication: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.04,
    },
    socialButton: {
        height: height * 0.06,
        width: height * 0.06,
        backgroundColor: Colors.PRIMARY,
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
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.04,
    },
    line: {
        height: 0.5,
        backgroundColor: Colors.TEXT_LITE_GRAY,
        width: width - 100,
        opacity: 0.2,
    },
    orText: {
        color: Colors.TEXT_LITE_GRAY,
        fontFamily: Fonts.black,
        marginHorizontal: 10,
    },
    button: {
        marginVertical: 20,
    },
    forgotPassword: {
        flexDirection: 'row',
        textAlign: 'center',
        fontFamily: Fonts.regular,
        color: Colors.TITLE_TEXT,
        marginTop: 10,
    },
})

export default styles;