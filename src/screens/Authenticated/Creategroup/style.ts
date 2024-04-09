import { StyleSheet } from "react-native";
import { width, height, FontSize, Fonts, String, Colors } from "../../../utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: height * 0.07
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateX: -40 }]
    },
    headerText: {
        fontSize: FontSize.fontLarge,
        marginLeft: 20,
        textAlign: 'center',
        fontFamily: Fonts.medium,
        color: Colors.DARK
    },
    gobackIcon: {
        paddingVertical: 10,
        paddingRight: 40,
        marginRight: 10
    },

    groupContainer: {
        flex: 1,
        padding: 20,
    },
    groupInputField: {
        // marginVertical: 20
    },
    groupDesc: {
        fontSize: FontSize.fontLarge,
        fontFamily: Fonts.medium,
        color: Colors.TEXT_LITE_GRAY
    },
    groupSubLine: {
        fontFamily: Fonts.medium,
        color: Colors.DARK,
        fontSize: width * 0.1,
    },
    groupName: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        color: Colors.DARK,
        fontFamily: Fonts.medium,
        backgroundColor: Colors.LITE_GRAY
    },
    groupUserContainer: {
    },
    invitedMember: {
        fontSize: FontSize.fontLarge,
        fontFamily: Fonts.medium,
        color: Colors.TEXT_LITE_GRAY,
        marginTop: height * 0.03
    },
    groupUserList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: height * 0.01
    },
    groupUserItem: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        margin: 5,
        
    },
    groupUserImage: {
        width: width * 0.16,
        height: width * 0.16,
        borderRadius: 100,
        margin: 5,
    },
    createButton: {
        marginHorizontal: 20,
        marginBottom: 20
    },
    plusIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 100,
        padding: 1.5
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 100,
        padding: 2
    },
    cameraIcon: {
    },
    profilePictureSelected: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    profilePicture: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 100,
        margin: 5
    },
    pictureSelected: {
        
    }
})

export default styles;