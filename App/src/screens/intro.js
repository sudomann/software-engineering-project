import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Layout, Text, Input, Button, Card} from '@ui-kitten/components';

const Header = () => (
  <View style={styles.card}>
    <Text category="h1">Blue Wheels</Text>
    <Text category="s1">Steer a toy vehicle using your phone</Text>
  </View>
);

export const IntroScreen = ({navigation: {navigate}}) => {
  return (
    <Layout style={styles.container} level="4">
      <Card style={styles.card} header={Header}>
        <Text>Project by ...</Text>
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
    flex: 1,
    margin: 8,
  },
});
