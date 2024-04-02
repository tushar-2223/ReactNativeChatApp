import { StyleSheet } from "react-native";
import { Colors, Fonts, height, width } from "../../../utils";

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: height * 0.04,
    },
    lable: {
        fontFamily: Fonts.medium
    },
    input: {
        borderBottomWidth: 1,
        fontSize: width * 0.04,
        paddingVertical: 5,
        color:Colors.INPUT_TEXT
    },
    errorText: {
        color: Colors.ERROR_TEXT,
        fontFamily: Fonts.light,
        fontSize: width * 0.03,
        marginTop: 5,
        textAlign: 'right'
    },
})

export default styles