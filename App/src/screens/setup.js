import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Layout,
  Text,
  Button,
  Input,
  TabView,
  Tab,
  Spinner,
} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';

export const SetupScreen = ({navigation}) => {
  const [conStatus, setStatus] = useState('Disconnected');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [connected, setConnected] = useState(false);
  const [searching, setSearching] = useState(false);
  const [customMac, setCustomMac] = useState();
  return (
    <Layout style={styles.container}>
      <Layout level="2" style={styles.statusBox}>
        <Text>Connection Status</Text>
      </Layout>
      <TabView
        style={styles.tabView}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}>
        <Tab title="DEFAULT">
          <Text>
            This app by default searches for a vehicle with the MAC Address:
            xx:xx:xx:xx:xx
          </Text>
          <Text>
            Use the CUSTOM tab if you need to specify your own vehicle
          </Text>
          {searching && <Spinner />}
        </Tab>
        <Tab title="CUSTOM">
          <Input
            placeholder="Custom MAC Address"
            caption="Provide your own vehicle to control"
          />
          <Button>Find and Connect</Button>
        </Tab>
      </TabView>
      <View>
        {!connected && (
          <Text>
            This button becomes available when you successfully connect to a
            vehicle above
          </Text>
        )}
        <Button
          disabled={!connected}
          onPress={() => navigation.navigate('steer')}>
          Start Driving
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'space-between',
  },
  statusBox: {
    flex: 1,
  },
  tabView: {
    flex: 1,
  },
});
