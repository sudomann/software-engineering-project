import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Text, Button, List, ListItem} from '@ui-kitten/components';
import {BleManager} from 'react-native-ble-plx';

const renderDevice = ({item, index}) => <ListItem title={`Device ${index}`} />;
export const BTView = () => {
  const [isScanning, setScanning] = useState(false);
  const [data, updateData] = useState([]);
  const bleManager = new BleManager();
  const endScan = () => {
    console.log('scan stopped');
    bleManager.stopDeviceScan();
    setScanning(false);
  };

  const startScan = () => {
    console.log('scan started');
    setScanning(true);
    bleManager.startDeviceScan(null, {}, (error, scannedDevice) => {
      if (error == null) {
        console.log('The scanned device is:', scannedDevice);
        scannedDevice
          .connect()
          .then()
          .then(scannedDevice => {
            const results = scannedDevice.discoverAllServicesAndCharacteristics();
            console.log('device results', results);
            return results;
          })
          .catch(error => {
            console.log('error occured when trying to read device');
            endScan();
          });
        updateData(data.concat([scannedDevice]));
      } else {
        console.log('something went wrong', error);
        endScan();
      }
    });
  };

  return (
    <Layout style={styles.containers}>
      <Text>Bluetooth Devices</Text>
      {isScanning ? (
        <Button onPress={() => endScan()}>Stop Scan</Button>
      ) : (
        <Button onPress={() => startScan()}>Start Scan</Button>
      )}
      <List style={styles.list} renderItem={renderDevice} data={data} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {},
});
