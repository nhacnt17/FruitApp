import { StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";

export const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.white
    },

    content: {
        flex: 1,
        backgroundColor: appColors.white,
        margin: 16
    }
})
