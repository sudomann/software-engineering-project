import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';

export const SetupScreen = ({navigation}) => {
  return (
    <Layout style={styles.container}>
      <Text>Hello</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
