import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import { StatusBar } from 'react-native';

import configureStore from './store/index';

import RootStack from './routes';

const { persistor, store } = configureStore();

console.disableYellowBox = true;

const App = () => (
  <Provider store={store}>
    {/* FIXME: Create loading component */}
    <PersistGate loading={null} persistor={persistor}>
      <StatusBar hidden />
      <RootStack />
    </PersistGate>
  </Provider>
);

export default App;
