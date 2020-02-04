import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {
  Layout,
  Icon,
  Button,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {useKeepAwake} from 'expo-keep-awake';
import {Gyroscope, Magnetometer, Accelerometer} from 'expo-sensors';

const RadioIcon = style => <Icon {...style} name="radio-outline" />;

export const GyroSteerView = () => {
  const [dataG, setDataG] = useState({});
  const [dataM, setDataM] = useState({});
  const [dataA, setDataA] = useState({});
  const styles = useStyleSheet(Stylesheet);
  let _subscriptionG, _subscriptionM, _subscriptionA;

  useEffect(() => {
    _toggleG();
    _toggleM();
    _toggleA();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribeG();
      _unsubscribeM();
      _unsubscribeA();
    };
  }, []);
  useKeepAwake();
  const _subscribeG = () => {
    _subscriptionG = Gyroscope.addListener(gyroscopeData => {
      setDataG(gyroscopeData);
    });
  };

  const _subscribeM = () => {
    _subscriptionM = Magnetometer.addListener(magnetometerData => {
      setDataM(magnetometerData);
    });
  };

  const _subscribeA = () => {
    _subscriptionA = Accelerometer.addListener(accelerometerData => {
      setDataA(accelerometerData);
    });
  };

  const _unsubscribeG = () => {
    _subscriptionG && _subscriptionG.remove();
    _subscriptionG = null;
  };

  const _unsubscribeM = () => {
    _subscriptionM && _subscriptionM.remove();
    _subscriptionM = null;
  };

  const _unsubscribeA = () => {
    _subscriptionA && _subscriptionA.remove();
    _subscriptionA = null;
  };

  const _toggleG = () => {
    if (_subscriptionG) {
      _unsubscribeG();
    } else {
      _subscribeG();
    }
  };

  const _toggleM = () => {
    if (_subscriptionM) {
      _unsubscribeM();
    } else {
      _subscribeM();
    }
  };

  const _toggleA = () => {
    if (_subscriptionA) {
      _unsubscribeA();
    } else {
      _subscribeA();
    }
  };

  const _slow = () => {
    Gyroscope.setUpdateInterval(100);
    Magnetometer.setUpdateInterval(100);
    Accelerometer.setUpdateInterval(100);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(16);
    Magnetometer.setUpdateInterval(16);
    Accelerometer.setUpdateInterval(16);
  };

  return (
    <Layout level="3" style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text} status="warning">
          Beware, this app never sleeps
        </Text>

        <Text style={styles.text} appearance="hint">
          This app will use your phone's bluetooth and sensor hardware to
          measure and broadcast steering actions
        </Text>
        <Button style={styles.actionButton} icon={RadioIcon}>
          CONNECT AND START DRIVING
        </Button>
        <Layout style={styles.dataContainer}>
          <Text category="h4" style={styles.text}>
            Gyroscope:
          </Text>
          <Text style={styles.text}>x: {dataG.x}</Text>
          <Text style={styles.text}>y: {dataG.y}</Text>
          <Text style={styles.text}>z: {dataG.z}</Text>
          <Text style={styles.text}></Text>
        </Layout>
        <Layout style={styles.dataContainer}>
          <Text category="h4" style={styles.text}>
            Magnetometer:
          </Text>
          <Text style={styles.text}>x: {dataM.x}</Text>
          <Text style={styles.text}>y: {dataM.y}</Text>
          <Text style={styles.text}>z: {dataM.z}</Text>
        </Layout>

        <Layout style={styles.dataContainer}>
          <Text category="h4" style={styles.text}>
            Accelerometer:
          </Text>
          <Text style={styles.text}>x: {dataA.x}</Text>
          <Text style={styles.text}>y: {dataA.y}</Text>
          <Text style={styles.text}>z: {dataA.z}</Text>
        </Layout>
        <Layout style={styles.buttonContainer}>
          <Button onPress={_toggleG}>Toggle Subscription</Button>
          <Button onPress={_slow}>Grandma</Button>
          <Button onPress={_fast}>F1</Button>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n);
}

const Stylesheet = StyleService.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
    //padding: 8,
    borderRadius: 8,
  },
  dataContainer: {
    margin: 8,
    padding: 10,
    borderRadius: 8,
  },

  text: {
    textAlign: 'center',
  },
});
