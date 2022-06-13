// In App.js in a new project

import * as React from 'react';
import RootNavigator from './src/route/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store'
import { enableLatestRenderer } from 'react-native-maps';
import { createServer } from 'miragejs';
import RNCalendarEvents from 'react-native-calendar-events';
enableLatestRenderer();



function App() {

  React.useEffect(() => {
    RNCalendarEvents.requestPermissions().then((res) => {
     console.log(res)
    }).catch(() => {
      console.log('Not Granted');
    });
  }, []);

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