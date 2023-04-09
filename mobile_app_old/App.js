import {ScrollView, StyleSheet, Text, View} from 'react-native';
import BluetoothButton from "./components/button/BluetoothButton";
import {Color} from "./constant/color";
import ScreenTitle from "./components/text/ScreenTitle";
import NormalText from "./components/text/NormalText";

export default function App() {

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}><ScreenTitle text='MegaSense'/></View>

      <View style={styles.bluetoothWrapper}><BluetoothButton /></View>

      <ScrollView style={styles.scrollView}>
          <View><NormalText text='List of devices...' /></View>
      </ScrollView>

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
        marginBottom: 20
    },

    bluetoothWrapper: {
        marginBottom: 10
    },

    scrollView: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: 'left',
    }
});
