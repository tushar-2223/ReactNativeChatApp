import { StyleSheet } from "react-native";
import { height, width } from "../../../utils/Constant";

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
    },
    backgroundImage: {
        position: 'absolute',
        width: width,
        zIndex: -1,
        objectFit: 'cover',
    },
    gradiantImage: {
        position: 'absolute',
        width: width,
        transform:[{translateY: -height * 0.1}],
    }
});

export default styles;