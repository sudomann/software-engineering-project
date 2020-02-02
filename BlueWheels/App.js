import React from 'react';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  StyleService,
  useStyleSheet,
  Text,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping, dark as theme} from '@eva-design/eva';
import {GyroSteerView} from './expo-gryro-view';

const App = () => {
  const styles = useStyleSheet(StyleSheet);
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <Layout level="4" style={styles.container}>
          <Text style={styles.text} category="h1">
            Blue Wheels
          </Text>
          <GyroSteerView />
        </Layout>
      </ApplicationProvider>
    </>
  );
};

const StyleSheet = StyleService.create({
  container: {
    flex: 1,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    margin: 16,
  },
});

export default App;
