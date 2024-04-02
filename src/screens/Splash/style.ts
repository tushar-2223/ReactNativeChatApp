import { StyleSheet } from "react-native";
import { Colors, Fonts, height, width } from "../../utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appLogoContainer: {
        position: 'relative',
        width: width,
        height: height * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageBox: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    appName: {
        fontSize: width * 0.17,
        color: Colors.PRIMARY,
        fontFamily: Fonts.acmeRegular,
        transform: [{ translateY: -height * 0.05 }],
    }
})

export default styles;