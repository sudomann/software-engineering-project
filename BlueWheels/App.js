import React from 'react';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  StyleService,
  useStyleSheet,
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
        <Layout style={styles.container}>
          <GyroSteerView />
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
