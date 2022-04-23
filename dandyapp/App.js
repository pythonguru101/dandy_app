// In App.js in a new project

import * as React from 'react';
import RootNavigator from './src/route/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store'

function App() {
  return (
    <>
      <NavigationContainer>
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <RootNavigator />
          </Provider>
        </PersistGate>
      </NavigationContainer>
    </>
  );
}

export default App;