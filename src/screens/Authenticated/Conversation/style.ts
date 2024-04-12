import { StyleSheet } from "react-native";
import { Colors, String, Fonts, height, FontSize, width } from "../../../utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.05,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    searchIcon: {

    },
    userContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        marginLeft: 10,
        alignItems: 'center',
    },
    headerText: {
        fontSize: FontSize.fontLarge,
        color: Colors.DARK,
        fontFamily: Fonts.medium,
    },
    userImage: {
        width: height * 0.05,
        height: height * 0.05,
        borderRadius: 25,
    },
    userStatus: {
        fontSize: FontSize.fontSmall,
        color: Colors.TEXT_LITE_GRAY,
        opacity: 0.7,
        fontFamily: Fonts.regular,
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    messageContainer: {
        marginVertical: 7,
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    senderName: {
        fontSize: FontSize.fontNormal,
        color: Colors.DARK,
        fontFamily: Fonts.medium,
    },
    message: {
        fontSize: FontSize.fontSmall,
        color: Colors.PRIMARY,
        fontFamily: Fonts.regular,
    },
    chatBubble: {
        backgroundColor: Colors.CHAT_BUBBLE,
        padding: 10,
        borderRadius: 15,
        marginTop: 1,
    },
    timestamp: {
        fontSize: FontSize.fontSmall,
        color: Colors.TEXT_LITE_GRAY,
        opacity: 0.5,
        fontFamily: Fonts.black,
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    inputField: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.INPUT_FIELD,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontFamily: Fonts.regular,
        fontSize: FontSize.fontSmall,
        color: Colors.DARK
    },
    sendButton: {
        padding: 11,
        borderRadius: 15,
        marginLeft: 10,
    },
    attachIcon: {
        transform: [{ rotate: '45deg' }],
    },
    headerRight: {
        flexDirection: 'row',
        gap: 15,
    },
    chatHeader: {
        fontSize: FontSize.fontSmall,
        color: Colors.TEXT_LITE_GRAY,
        fontFamily: Fonts.medium,
        opacity: 0.7,
        marginBottom: height * 0.01,
        textAlign: 'center',
    },
    dayHeaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayHeaderText: {
        color: Colors.TEXT_LITE_GRAY,
        fontFamily: Fonts.medium,
        padding: 5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.2
    },
    emptyText: {
        color: Colors.TEXT_LITE_GRAY,
        fontFamily: Fonts.regular,
        fontSize: FontSize.fontXLarge,
    }
})

export default styles;