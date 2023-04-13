import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import NormalText from "../text/NormalText";
import {Color} from "../../constant/color";
import {BLEManagerSingleton} from "../../util/BLEManagerSingleton";
import base64 from 'react-native-base64'

export default function FoundDeviceItem({device}) {
    const deviceLocalName = 'ESP32';
    const bleManager = BLEManagerSingleton.getInstance();

    async function connectToDevice() {
        if(device.localName === deviceLocalName){
            const devId = device.id;
            const esp = await bleManager.connectToDevice(devId);

            if(esp){
                const deviceChars = await bleManager.discoverAllServicesAndCharacteristicsForDevice(esp.id);
                const services = await deviceChars.services();
                const serviceUUIDs = services.map(service => service.uuid);
                console.log(serviceUUIDs);

                const characteristics = await deviceChars.characteristicsForService("90aa77d2-bb5d-4f49-adc3-70c6a0a5e763");
                const characteristicUUIDs = characteristics.map(characteristic => characteristic.uuid);
                console.log(characteristicUUIDs);

                await bleManager.monitorCharacteristicForDevice(
                    esp.id,
                    "90aa77d2-bb5d-4f49-adc3-70c6a0a5e763",
                    "cba1d466-344c-4be3-ab3f-189f80dd7518",
                    (e, characteristic) => {
                        if(e)
                            console.log(e);

                        const value = characteristic.value;
                        const parsedValue = base64.decode(value);
                        console.log('value', value);
                        console.log('parsedValue', parsedValue);
                    }
                );


            }
        }
    }

    const textContent = device.localName ? device.localName : device.id;
    return(
        <TouchableOpacity onPress={connectToDevice}>
            <View style={styles.textWrapper} >
                <NormalText style={styles.text} text={textContent} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    textWrapper: {
        borderWidth: 1,
        borderColor: Color.elemBorder,
        paddingVertical: 15,
        marginBottom: 10
    },

    text: {
        textAlign: 'center'
    }
});