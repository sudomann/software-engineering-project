import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Layout, Spinner, Text, Button} from '@ui-kitten/components';
import {BleManager} from 'react-native-ble-plx';
import {Buffer} from 'buffer';
import {
  ArrowSteerDown,
  ArrowSteerLeft,
  ArrowSteerRight,
  ArrowSteerUp,
} from '../components/steer-buttons';

const VEHICLE_MAC = 'DA:BB:1D:A0:FA:FD';
const STOP = Buffer.from('0').toString('base64');
const MOVE_UP = Buffer.from('1').toString('base64');
const MOVE_DOWN = Buffer.from('2').toString('base64');
const MOVE_LEFT = Buffer.from('3').toString('base64');
const MOVE_RIGHT = Buffer.from('4').toString('base64');

const CTLR_SVC = '19B10000-E8F2-537E-4F6C-D104768A1214';
const CTLR_XTIC = '19B10001-E8F2-537E-4F6C-D104768A1214';

export const SteeringScreen = ({navigation: {goBack}}) => {
  const manager = new BleManager();
  const [isReady, setIsReady] = React.useState(false);
  const [btErrors, setBtErrors] = React.useState(undefined);
  const [debugMes, setDebugMes] = React.useState('');
  const [device, setDevice] = React.useState();
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

  const revealControls = device => {
    // Do work on device with services and characteristics

    setIsReady(true);
  };

  const onConnectErr = error => {
    // Handle errors
    setDebugMes('Device was found but connection failed');
    console.log('Device was found but connection failed:', error);
  };

  const getAllServicesAndCharacteristics = async device => {
    console.log('device connected and ready! Getting svcs and xtics');
    await device.discoverAllServicesAndCharacteristics();
    setDevice(device);
    device
      .writeCharacteristicWithResponseForService(CTLR_SVC, CTLR_XTIC, 'Cg==')
      .then(() => console.log('attempted to write 1'));
    device
      .writeCharacteristicWithResponseForService(CTLR_SVC, CTLR_XTIC, 'Cg==')
      .then(() => console.log('attempted to write 2'));
    device
      .writeCharacteristicWithResponseForService(CTLR_SVC, CTLR_XTIC, 'Cg==')
      .then(() => console.log('attempted to write 3'));
  };

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
          if (device.id === VEHICLE_MAC || device.name === 'Bluno') {
            // Stop scanning as it's not necessary if you are scanning for one device.
            manager.stopDeviceScan();

            // Proceed with connection.
            device
              .connect()
              .then(getAllServicesAndCharacteristics)
              .then(revealControls)
              .catch(onConnectErr);
          }
        });
        console.log('scanned devices', devices);
      };
      scanAndConnect();
      //return manager.destroy();
    }, []),
  );

  const moveUp = () => {
    console.log('move up pressed!');
    device
      .writeCharacteristicWithResponseForService(CTLR_SVC, CTLR_XTIC, MOVE_UP)
      .then(() => console.log('attempted to write'));
  };
  const moveDown = () => {
    device.writeCharacteristicWithResponseForService(
      CTLR_SVC,
      CTLR_XTIC,
      MOVE_DOWN,
    );
  };
  const moveLeft = () => {
    device.writeCharacteristicWithResponseForService(
      CTLR_SVC,
      CTLR_XTIC,
      MOVE_LEFT,
    );
  };
  const moveRight = () => {
    device.writeCharacteristicWithResponseForService(
      CTLR_SVC,
      CTLR_XTIC,
      MOVE_RIGHT,
    );
  };
  const stopMoving = () => {
    device.writeCharacteristicWithResponseForService(CTLR_SVC, CTLR_XTIC, STOP);
  };

  const cleanUp = () => {
    // the memoized callback will take care of destroying the manager
    device
      .cancelConnection()
      .then(goBack)
      .catch(error =>
        console.log('failed to close/cancel connection with device', error),
      );
  };

  return (
    <Layout style={styles.container}>
      {isReady ? (
        renderLoading()
      ) : (
        <View>
          <Text style={{textAlign: 'center', margin: 16}}>
            {`You are connected to device ID:
            ${VEHICLE_MAC}`}
          </Text>
          <Layout level="2" style={styles.buttonContainer}>
            <View>
              <ArrowSteerUp onPressIn={moveUp} onPressOut={stopMoving} />
            </View>
            <View style={styles.buttonsHorizontal}>
              <ArrowSteerLeft onPressIn={moveLeft} onPressOut={stopMoving} />
              <View style={{margin: 32}} />
              <ArrowSteerRight onPressIn={moveRight} onPressOut={stopMoving} />
            </View>
            <View>
              <ArrowSteerDown onPressIn={moveDown} onPressOut={stopMoving} />
            </View>
          </Layout>
          <Button style={styles.buttonDone} onPress={cleanUp}>
            I'm Done Driving
          </Button>
        </View>
      )}
      {/*    <LogView
        inverted={false}
        multiExpanded={true}
        timeStampFormat="HH:mm:ss"
      /> */}
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
  buttonDone: {
    margin: 16,
  },
});
