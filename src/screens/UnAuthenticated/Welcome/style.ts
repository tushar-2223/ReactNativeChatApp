import { StyleSheet } from "react-native";
import { Colors, Fonts, FontSize, height, width } from "../../../utils";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: width * 0.07,
    },
    title: {
        fontSize: 68,
        color: Colors.PRIMARY,
        fontFamily: Fonts.regular,
        marginTop: height * 0.09,
    },
    subText: {
        fontSize: FontSize.fontLarge,
        color: Colors.PRIMARY,
        fontFamily: Fonts.regular,
        marginTop: height * 0.03,
        opacity: 0.5,
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.03,
    },
    line: {
        height: 0.5,
        backgroundColor: Colors.PRIMARY,
        width: width,
        opacity: 0.3,
    },
    orText: {
        fontSize: FontSize.fontNormal,
        color: Colors.PRIMARY,
        fontFamily: Fonts.black,
        marginHorizontal: 10,
    },
    otherAuth: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: height * 0.04,
    },
    otherAuthText: {
        fontSize: FontSize.fontNormal,
        color: Colors.PRIMARY,
        fontFamily: Fonts.regular,
    },
    otherAuthButton: {
        fontSize: FontSize.fontNormal,
        color: Colors.PRIMARY,
        fontFamily: Fonts.bold,
        marginLeft: 5,
    },
});

export default styles;