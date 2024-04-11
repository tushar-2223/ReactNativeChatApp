import { StyleSheet } from "react-native";
import { Colors, Fonts, FontSize, height, width } from "../../../utils";

const styles = StyleSheet.create({
    header: {
        padding: 20,
        marginTop: height * 0.05,
    },
    groupDetailed: {
        alignItems: 'center',
    },
    profilePicture: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 100,
    },
    groupName: {
        fontSize: FontSize.fontXXLarge,
        fontFamily: Fonts.bold,
        color: Colors.PRIMARY,
        marginTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        marginTop: 20,
    },
    userInfo: {
        marginLeft: 10,
    },
    userName: {
        fontSize: FontSize.fontXLarge,
        fontFamily: Fonts.medium,
        color: Colors.DARK,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: Colors.TEXT_LITE_GRAY,
        fontFamily: Fonts.regular,
        fontSize: FontSize.fontXLarge,
    },
    chatContainerBox: {
        flexDirection: 'row',
        paddingHorizontal: width * 0.05,
        marginVertical: height * 0.02,
    },
    chatUserImage: {
        width: width * 0.14,
        height: width * 0.14,
        borderRadius: 100,
    },
    groupuserHeader: {
        fontSize: FontSize.fontXXLarge,
        fontFamily: Fonts.semiBold,
        color: Colors.TEXT_LITE_GRAY,
        marginTop: height * 0.02,
        textAlign: 'center',
    }
});

export default styles;