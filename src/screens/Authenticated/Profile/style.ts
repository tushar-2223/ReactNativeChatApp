import { StyleSheet } from "react-native";
import { FontSize, Fonts, width, height, Colors } from "../../../utils";

const styles = StyleSheet.create({
    header: {
        padding: 20,
        marginTop: height * 0.05,
    },
    userDetailed: {
        alignItems: 'center',
    },
    profilePicture: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 100,
    },
    userName: {
        fontSize: FontSize.fontXXLarge,
        fontFamily: Fonts.bold,
        color: Colors.PRIMARY,
        marginTop: 10,
    },
    socialPanel: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    socialPanelItem: {
        backgroundColor: Colors.TEXT_LITE_GRAY,
        padding: 10,
        borderRadius: 100,
        backfaceVisibility: 'hidden',
    },
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        padding: 30,
        marginTop: 20,
    },
    textDetailItem: {
        marginTop: height * 0.02,
    },
    textLable: {
        fontFamily: Fonts.regular,
        color: Colors.TEXT_LITE_GRAY,
    },
    textDetail: {
        fontSize: FontSize.fontXLarge,
        fontFamily: Fonts.medium,
        color: Colors.DARK,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});

export default styles;