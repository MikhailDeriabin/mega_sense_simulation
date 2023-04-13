import IconButton from "../UI/IconButton";
import {Color} from "../../constant/color";
import {Alert, PermissionsAndroid} from "react-native";
import {BLEManagerSingleton} from "../../util/BLEManagerSingleton";


const bleManager = BLEManagerSingleton.getInstance();

export default function BluetoothButton({addFoundDevice, resetFoundDevices}) {
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

    function stopScan() {
        bleManager.stopDeviceScan();
        console.log('BLE scan completed');
    }

    async function findDevice() {
        try {
            //No need to request bluetooth permission
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                resetFoundDevices();
                bleManager.stopDeviceScan();

                bleManager.startDeviceScan(null, {allowDuplicates: false},  (e, device) => {
                    if(e){
                        console.log('error', e);
                        bleManager.stopDeviceScan();
                    }

                    if(device.id){
                        addFoundDevice(device);
                    }
                });

                setTimeout(stopScan, 3000);
            } else {
                Alert.alert('Location required', 'Please allow the app use your location');
            }
        } catch (err) {
            console.warn(err);
        }
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