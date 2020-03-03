import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';

export const IntroScreen = ({navigation}) => {
  return (
    <Layout level="4" style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        <Text category="h1">Blue Wheels</Text>
        <Text>Project by</Text>
        <Text>Casey, Linus, Matthew, Will</Text>
        <Text>
          You can connect to a compatible vehicle's control system via bluetooth
          and steer using a capable phone.
        </Text>
      </ScrollView>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate('setup')}>
        GET STARTED
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    margin: 32,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 16,
  },
});
