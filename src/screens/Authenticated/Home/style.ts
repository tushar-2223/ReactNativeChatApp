import { StyleSheet } from "react-native";
import { Colors, Fonts, FontSize, height, width } from "../../../utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: height * 0.07
    },
    searchIcon: {
        padding: 10,
        backgroundColor: Colors.SOCIAL_BUTTON,
        borderRadius: 100
    },
    userIcon: {
    },
    headerText: {
        fontSize: FontSize.fontXXLarge,
        color: Colors.PRIMARY,
        fontFamily: Fonts.medium
    },
    profilePicture: {
        width: 44,
        height: 44,
        borderRadius: 100,
    },
    chatContainer: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
    },
    topBar: {
        backgroundColor: Colors.LITE_GRAY,
        height: 3,
        margin: 10,
        width: width * 0.1,
        alignSelf: 'center'
    },
    statusContainer: {
        paddingVertical: height * 0.04,
    },
    storyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    storyImageContainer: {
        width: width * 0.15,
        height: width * 0.15,
        marginHorizontal: 10,
        borderRadius: 100,
        borderWidth: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
    },
    storyImage: {
        height: '100%',
        width: '100%',
        borderRadius: 100,
    },
    storyText: {
        color: Colors.PRIMARY,
        fontFamily: Fonts.regular,
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
    userDetailed: {
        flex: 1,
        marginLeft: 10,
    },

    userName: {
        color: Colors.DARK,
        fontFamily: Fonts.medium,
        fontSize: FontSize.fontXXLarge,
    },
    lastChat: {
        color: Colors.TEXT_LITE_GRAY,
        fontFamily: Fonts.regular,
        fontSize: FontSize.fontSmall,
        opacity: 0.5,
        lineHeight: 15
    },
    chatTimeContainer: {
        alignItems: 'flex-end',
        gap: 5,
    },
    chatTime: {
        color: Colors.TEXT_LITE_GRAY,
        fontFamily: Fonts.regular,
        fontSize: FontSize.fontSmall,
        opacity: 0.5,
    },
    chatNotification: {
        backgroundColor: Colors.NOTIFICATION_RIPPLE,
        height: 22,
        width: 22,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationText: {
        color: Colors.PRIMARY,
        fontFamily: Fonts.black,
        fontSize: FontSize.fontSmall,
    },

})

export default styles;