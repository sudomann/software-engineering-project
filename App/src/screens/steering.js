import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Layout, Spinner, Text} from '@ui-kitten/components';
import {BleManager} from 'react-native-ble-plx';
import {
  ArrowSteerDown,
  ArrowSteerLeft,
  ArrowSteerRight,
  ArrowSteerUp,
} from '../components/steer-buttons';

const VEHICLE_MAC = 'C4:BE:84:26:58:03';

export const SteeringScreen = () => {
  const manager = new BleManager();
  const [isReady, setIsReady] = React.useState(false);
  const [btErrors, setBtErrors] = React.useState(undefined);
  const [debugMes, setDebugMes] = React.useState('');
  const renderLoading = () => (
    <View style={styles.container}>
      {btErrors == undefined ? (
        <>
          <Spinner size="giant" />
          <Text>Working to connect to vehicle</Text>
          <Text status="warning" category="c1">
            If this takes too long with no result, go back and try again
          </Text>
          <Text>Target MAC: {VEHICLE_MAC}</Text>
          <Text>Debug message (if any): {debugMes}</Text>
        </>
      ) : (
        <>
          <Text status="danger">
            Bluetooth manager object is in errored state. Details:
          </Text>
        </>
      )}
    </View>
  );
  useFocusEffect(
    React.useCallback(() => {
      const scanAndConnect = () => {
        const devices = [];
        manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            // Handle error (scanning will be stopped automatically)
            console.log('bt manager error. scanning stopped because:', error);
            return;
          }

          devices.push(device);

          // Check if it is a device you are looking for based on advertisement data
          // or other criteria.
          if (device.id === VEHICLE_MAC) {
            // Stop scanning as it's not necessary if you are scanning for one device.
            manager.stopDeviceScan();

            // Proceed with connection.
            device
              .connect()
              .then(device => {
                return device.discoverAllServicesAndCharacteristics();
              })
              .then(device => {
                // Do work on device with services and characteristics
                setIsReady(true);
              })
              .catch(error => {
                // Handle errors
                setDebugMes('Device was found but connection failed');
              });
          }
        });
        console.log('scanned devices', devices);
      };
      scanAndConnect();
    }, []),
  );
  return (
    <Layout style={styles.container}>
      {!isReady ? (
        renderLoading()
      ) : (
        <View>
          <Text style={{textAlign: 'center'}}>
            If you hit this screen, it means you are connected to device id:{' '}
            {VEHICLE_MAC}
          </Text>
          <Layout level="2" style={styles.buttonContainer}>
            <View>
              <ArrowSteerUp onPressIn={() => {}} onPressOut={() => {}} />
            </View>
            <View style={styles.buttonsHorizontal}>
              <ArrowSteerLeft onPressIn={() => {}} onPressOut={() => {}} />
              <View style={{margin: 32}} />
              <ArrowSteerRight onPressIn={() => {}} onPressOut={() => {}} />
            </View>
            <View>
              <ArrowSteerDown onPressIn={() => {}} onPressOut={() => {}} />
            </View>
          </Layout>
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    padding: 20,
    flex: 1,
    width: '100%',
  },
  buttonsHorizontal: {
    flex: 1 / 2,
    margin: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonsVertical: {
    flex: 1,
    margin: 20,
  },
});
