import {FlatList, StyleSheet, Text, View} from 'react-native';
import BluetoothButton from "./components/button/BluetoothButton";
import {Color} from "./constant/color";
import ScreenTitle from "./components/text/ScreenTitle";
import NormalText from "./components/text/NormalText";
import {useState} from "react";
import FoundDeviceItem from "./components/BLE/FoundDeviceItem";

export default function App() {
    let syncDevices = [];

    const [foundDevices, setFoundDevices] = useState([]);

    function resetFoundDevices() {
        syncDevices = [];
        setFoundDevices([]);
    }
    async function addFoundDevice(newDevice) {
        //Can not use foundDevices arr due to async state
        const alreadyAdded = syncDevices.find(dev => dev.id === newDevice.id);

        if(!alreadyAdded){
            syncDevices.push(newDevice);

            setFoundDevices((prevState) => ([
                ...prevState,
                newDevice
            ]));
        }
    }

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}><ScreenTitle text='MegaSense'/></View>

      <View style={styles.bluetoothWrapper}><BluetoothButton addFoundDevice={addFoundDevice} resetFoundDevices={resetFoundDevices} /></View>

      <View style={styles.flatListWrapper}>
          <FlatList
              keyExtractor={ (item) => item.id }
              data={foundDevices}
              style={styles.flatList}
              renderItem={ deviceData => {
                  return (
                      <FoundDeviceItem
                          id={deviceData.item.id}
                          device={deviceData.item}
                      />
                  );
              } }
          />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        backgroundColor: Color.screenBg,
    },

    titleWrapper: {
        flex: 1
    },

    bluetoothWrapper: {
        flex: 1
    },

    flatListWrapper: {
        flex: 5,
        width: '100%'
    },

    flatList: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10
    }
});
