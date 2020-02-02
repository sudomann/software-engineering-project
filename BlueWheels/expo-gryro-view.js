import React, {useState, useEffect} from 'react';
import {
  Layout,
  Icon,
  Button,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {useKeepAwake} from 'expo-keep-awake';
import {Gyroscope, Magnetometer} from 'expo-sensors';

const RadioIcon = style => <Icon {...style} name="radio-outline" />;

export const GyroSteerView = () => {
  const [dataG, setDataG] = useState({});
  const [dataM, setDataM] = useState({});
  const styles = useStyleSheet(Stylesheet);
  let _subscriptionG,
    _subscriptionM = undefined;

  useEffect(() => {
    _toggleG();
    _toggleM();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribeG();
      _unsubscribeM();
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

  const _unsubscribeG = () => {
    _subscriptionG && _subscriptionG.remove();
    _subscriptionG = null;
  };

  const _unsubscribeM = () => {
    _subscriptionM && _subscriptionM.remove();
    _subscriptionM = null;
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

  const _slow = () => {
    Gyroscope.setUpdateInterval(100);
    Magnetometer.setUpdateInterval(100);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(16);
    Magnetometer.setUpdateInterval(16);
  };

  let {x, y, z} = dataG;
  let xx = dataM.x;
  let yy = dataM.y;
  let zz = dataM.z;

  return (
    <Layout level="3" style={styles.container}>
      <Text style={styles.text} status="warning">
        Beware, this app never sleeps
      </Text>

      <Text style={styles.text} appearance="hint">
        This app will use your phone's bluetooth and sensor hardware to measure
        and broadcast steering actions
      </Text>
      <Button style={styles.actionButton} icon={RadioIcon}>
        CONNECT AND START DRIVING
      </Button>
      <Layout style={styles.dataContainer}>
        <Text style={styles.text}>Gyroscope:</Text>
        <Text style={styles.text}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
      </Layout>
      <Layout style={styles.dataContainer}>
        <Text style={styles.text}>Magnetometer:</Text>
        <Text style={styles.text}>
          x: {round(xx)} y: {round(yy)} z: {round(zz)}
        </Text>
      </Layout>
      <Layout style={styles.buttonContainer}>
        <Button onPress={_toggleG}>Toggle Subscription</Button>
        <Button onPress={_slow}>Grandma</Button>
        <Button onPress={_fast}>F1</Button>
      </Layout>
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
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
    padding: 8,
    borderRadius: 8,
  },
  dataContainer: {
    padding: 10,
    borderRadius: 8,
  },

  text: {
    textAlign: 'center',
  },
});
