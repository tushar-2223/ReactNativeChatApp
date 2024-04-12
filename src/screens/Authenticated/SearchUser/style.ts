import { StyleSheet } from "react-native";
import { Colors, Fonts, FontSize, height, width } from "../../../utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.PRIMARY
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: height * 0.07,
        marginHorizontal: width * 0.05,
        alignItems: 'center',
        gap: 10
    },
    inputField: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: Colors.INPUT_FIELD,
        borderRadius: 12,
    },
    input: {
        flex: 1,
        padding: 5,
        marginLeft: 10,
        fontSize: FontSize.fontSmall,
        color:Colors.DARK
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: width * 0.05,
        marginTop: height * 0.04
    },
    userImage: {
        width: width * 0.14,
        height: width * 0.14,
        borderRadius: 100
    },
    userInfo: {
        marginLeft: 10
    },
    userName: {
        fontSize: FontSize.fontXLarge,
        fontFamily:Fonts.medium,
        color: Colors.DARK
    },
    userBio: {
        fontSize: FontSize.fontSmall,
        fontFamily:Fonts.regular,
        color: Colors.TEXT_LITE_GRAY,
        opacity: 0.7
    },

    groupText: {
        fontSize: FontSize.fontLarge,
        fontFamily: Fonts.medium,
        color: Colors.DARK,
        marginHorizontal: width * 0.05,
        marginTop: height * 0.05
    }
})

export default styles;