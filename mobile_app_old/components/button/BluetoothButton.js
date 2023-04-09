import {StyleSheet} from "react-native";
import IconButton from "../UI/IconButton";
import {Color} from "../../constant/color";

export default function BluetoothButton() {
    const wrapperStyle = {
        width: 150,
        padding: 10,
        backgroundColor: Color.elemBg
    }

    const textWrapperStyle = {
        marginRight: 5
    }

    const btnTextStyle = {
        color: Color.elemText
    }

    const icon = {
        name: 'bluetooth',
        size: 20,
        color: Color.icon
    }

    const text = 'Find device';

    function findDevice() {

    }

    return(
        <IconButton
            wrapperStyle={wrapperStyle}
            textStyle={btnTextStyle}
            textWrapperStyle={textWrapperStyle}
            icon={icon} text={text}
            onPress={findDevice}
        />
    );
}