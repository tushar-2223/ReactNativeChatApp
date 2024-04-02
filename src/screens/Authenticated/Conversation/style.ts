import { StyleSheet } from "react-native";
import { Colors, String, Fonts, height, FontSize } from "../../../utils";

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
        padding: 20,
    },
    messageContainer: {
        marginVertical: 7,
        justifyContent: 'center',
    },
    senderName: {
        fontSize: FontSize.fontSmall,
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
    input: {
        flex: 1,
        backgroundColor: Colors.INPUT_FIELD,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontFamily: Fonts.regular,
        fontSize: FontSize.fontSmall,
        color:Colors.DARK,
    },
    sendButton: {
        padding: 11,
        borderRadius: 15,
        marginLeft: 10,
    },
    attachIcon: {
        transform: [{ rotate: '35deg' }],
    },
    headerRight: {
        flexDirection: 'row',
        gap: 15,
    },
})

export default styles;