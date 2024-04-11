import { StyleSheet } from "react-native";
import { height, width } from "../../../utils/Constant";

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        zIndex: -1,
        objectFit: 'cover',
    },
    gradiantImage: {
        position: 'absolute',
        width: '100%',
        transform:[{translateY: -height * 0.1}],
    }
});

export default styles;