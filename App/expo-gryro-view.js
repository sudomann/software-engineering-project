import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {
  Layout,
  Icon,
  Button,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {useKeepAwake} from 'expo-keep-awake';
import {Gyroscope, MagnetometerUncalibrated, Accelerometer} from 'expo-sensors';

const RadioIcon = style => <Icon {...style} name="radio-outline" />;
const M_PI = 3.14159265358979323846;

const ArrowSteerLeft = () => (
  <Button
    appearance="outline"
    icon={style => <Icon {...style} name="arrow-left-outline" />}
  />
);

const ArrowSteerUp = () => (
  <Button
    appearance="outline"
    icon={style => <Icon {...style} name="arrow-up-outline" />}
  />
);
const ArrowSteerRight = () => (
  <Button
    appearance="outline"
    icon={style => <Icon {...style} name="arrow-right-outline" />}
  />
);
const ArrowSteerDown = () => (
  <Button
    appearance="outline"
    icon={style => <Icon {...style} name="arrow-down-outline" />}
  />
);

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
    _subscriptionM = MagnetometerUncalibrated.addListener(magnetometerData => {
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
    MagnetometerUncalibrated.setUpdateInterval(100);
    Accelerometer.setUpdateInterval(100);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(16);
    MagnetometerUncalibrated.setUpdateInterval(16);
    Accelerometer.setUpdateInterval(16);
  };

  const accelerationX = dataA.x;
  const accelerationY = dataA.y;
  const accelerationZ = dataA.z;

  const pitch =
    (180 *
      Math.atan(
        accelerationX /
          Math.sqrt(
            accelerationY * accelerationY + accelerationZ * accelerationZ,
          ),
      )) /
    M_PI;

  const roll =
    (180 *
      Math.atan(
        accelerationY /
          Math.sqrt(
            accelerationX * accelerationX + accelerationZ * accelerationZ,
          ),
      )) /
    M_PI;

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
        {/* <Layout style={styles.dataContainer}>
          <Text category="h4" style={styles.text}>
            Gyroscope:
          </Text>
          <Text style={styles.text}>x: {round(dataG.x)}</Text>
          <Text style={styles.text}>y: {round(dataG.y)}</Text>
          <Text style={styles.text}>z: {round(dataG.z)}</Text>
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
        <Layout style={styles.dataContainer}>
          <Text category="h4" style={styles.text}>
            Steering:
          </Text>
          <Text style={styles.text}>
            roll (clockwise/anti-clockwise): {roll}}
          </Text>
          <Text style={styles.text}>
            pitch (tilt forward/backward or up/down): {pitch}
          </Text>
        </Layout>
        <Layout>
          <Button onPress={_toggleG}>Toggle Subscription</Button>
          <Button onPress={_slow}>Grandma</Button>
          <Button onPress={_fast}>F1</Button>
        </Layout>
         */}
        <Layout level="2" style={styles.testButtonContainer}>
          <View>
            <ArrowSteerLeft />
          </View>
          <View>
            <ArrowSteerUp />
            <ArrowSteerDown />
          </View>
          <View>
            <ArrowSteerRight />
          </View>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
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
  dataContainer: {
    margin: 8,
    padding: 10,
    borderRadius: 8,
  },
  testButtonContainer: {
    //flex: 1,
    //alignItems: 'baseline',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
  },
});
