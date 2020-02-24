import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';

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
