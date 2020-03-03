import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Layout, Text, Icon, Button} from '@ui-kitten/components';

const ArrowSteerLeft = () => (
  <Button
    appearance="outline"
    size="giant"
    icon={style => <Icon {...style} name="arrow-left-outline" />}
  />
);

const ArrowSteerUp = () => (
  <Button
    appearance="outline"
    size="giant"
    icon={style => <Icon {...style} name="arrow-up-outline" />}
  />
);
const ArrowSteerRight = () => (
  <Button
    appearance="outline"
    size="giant"
    icon={style => <Icon {...style} name="arrow-right-outline" />}
  />
);
const ArrowSteerDown = () => (
  <Button
    appearance="outline"
    size="giant"
    icon={style => <Icon {...style} name="arrow-down-outline" />}
  />
);

export const SteeringScreen = ({navigation}) => {
  return (
    <Layout style={styles.container}>
      <Layout level="2" style={styles.buttonContainer}>
        <View>
          <ArrowSteerUp />
        </View>
        <View style={styles.buttonsHorizontal}>
          <ArrowSteerLeft />
          <ArrowSteerRight />
        </View>
        <View>
          <ArrowSteerDown />
        </View>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 20,
    flex: 1,
    width: '100%',
  },
  buttonsHorizontal: {
    margin: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsVertical: {
    flex: 1,
    margin: 20,
  },
});
