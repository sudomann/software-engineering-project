import React from 'react';
import {View} from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping, dark as theme} from '@eva-design/eva';

const RadioIcon = style => <Icon {...style} name="radio-outline" />;

const App = () => {
  const styles = useStyleSheet(StyleSheet);
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <Layout style={styles.container}>
          <Text style={styles.text} category="h1">
            Blue Wheels
          </Text>
          <Text style={styles.text} appearance="hint">
            This app will use your phone's bluetooth hardware and gryro sensors
            to broadcast steering instructions to a vehicle
          </Text>
          <Button style={styles.actionButton} icon={RadioIcon}>
            CONNECT AND START DRIVING
          </Button>
        </Layout>
      </ApplicationProvider>
    </>
  );
};

const StyleSheet = StyleService.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    margin: 16,
  },
  actionButton: {
    marginVertical: 16,
  },
});

export default App;
