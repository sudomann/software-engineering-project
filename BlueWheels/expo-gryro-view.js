import React, {useState, useEffect} from 'react';
import {
  Layout,
  Icon,
  Button,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {View} from 'react-native';
import {Gyroscope} from 'expo-sensors';

const RadioIcon = style => <Icon {...style} name="radio-outline" />;

export const GyroSteerView = () => {
  const [data, setData] = useState({});
  const styles = useStyleSheet(Stylesheet);
  let _subscription = undefined;

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _subscribe = () => {
    _subscription = Gyroscope.addListener(gyroscopeData => {
      setData(gyroscopeData);
    });
  };

  const _unsubscribe = () => {
    _subscription && _subscription.remove();
    _subscription = null;
  };

  const _toggle = () => {
    if (_subscription) _unsubscribe();
    else _subscribe();
  };

  const _slow = () => {
    Gyroscope.setUpdateInterval(100);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(16);
  };

  let {x, y, z} = data;
  return (
    <View style={styles.sensor}>
      <Text style={styles.text} category="h1">
        Blue Wheels
      </Text>
      <Text style={styles.text} appearance="hint">
        This app will use your phone's bluetooth hardware and gryro sensors to
        broadcast steering instructions to a vehicle
      </Text>
      <Button style={styles.actionButton} icon={RadioIcon}>
        CONNECT AND START DRIVING
      </Button>
      <Text style={styles.text}>Gyroscope:</Text>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <View style={styles.buttonContainer}>
        <Button onPress={_toggle}>Toggle</Button>
        <Button onPress={_slow}>Grandma</Button>
        <Button onPress={_fast}>F1</Button>
      </View>
    </View>
  );
};

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const Stylesheet = StyleService.create({
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
});
