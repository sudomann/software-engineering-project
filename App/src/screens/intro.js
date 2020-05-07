import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Layout, Text, Input, Button, Card} from '@ui-kitten/components';

const Header = () => (
  <View style={styles.card}>
    <Text category="h1">Blue Wheels</Text>
    <Text category="s1">
      Controller for steering a bluetooth-enabled vehicle through an Arduino
    </Text>
  </View>
);

export const IntroScreen = ({navigation: {navigate}}) => {
  return (
    <Layout style={styles.container} level="4">
      <Card style={styles.card} header={Header}>
        <Text category="p1">Development Team</Text>
        <View style={styles.devs}>
          <Text style={styles.devItem} category="c1">
            Casey J Hardell
          </Text>
          <Text style={styles.devItem} category="c1">
            Linus E Drissel
          </Text>
          <Text style={styles.devItem} category="c1">
            Matthew D Mckenzie
          </Text>
          <Text style={styles.devItem} category="c1">
            Willy F Njundong
          </Text>
        </View>
      </Card>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
      />
      <Text style={{margin: 16, textAlign: 'center'}} category="s1">
        You will need bluetooth turned on to use this app. Let's get started
      </Text>
      <Button style={styles.button} onPress={() => navigate('steer')}>
        CONNECT AND DRIVE
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    //margin: 32,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 16,
  },
  card: {
    margin: 8,
    justifyContent: 'center',
  },
  devs: {},
  devItem: {
    borderRadius: 8,
    marginVertical: 8,
    padding: 8,
    backgroundColor: 'gray',
  },
});
