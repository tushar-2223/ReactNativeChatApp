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
        transform: [{ translateX: -30 }]
    },
    headerText: {
        fontSize: FontSize.fontLarge,
        marginLeft: 20,
        textAlign: 'center',
        fontFamily: Fonts.medium,
        color:Colors.DARK
    },
    gobackIcon: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.PRIMARY,
        marginRight: 10
    }
})

export default styles;