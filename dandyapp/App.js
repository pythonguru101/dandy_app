// In App.js in a new project

import * as React from 'react';
import RootNavigator from './src/route/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store'
import { enableLatestRenderer } from 'react-native-maps';
import { createServer } from 'miragejs';

enableLatestRenderer();

// if (window.server) {
//   server.shutdown()
// }

// window.server = createServer({
//   routes() {
//     this.post("api/wifi/set", (schema, request) => {
//       let attrs = JSON.parse(request.requestBody)
//       console.log("mock api", attrs)
//       return {
//         success: true,
//         message: "Wifi credentials set"
//       }
//     })
//   },

//   routes() {
//     this.post("api/fencing/set", (schema, request) => {
//       let attrs = JSON.parse(request.requestBody)
//       console.log("mock api", attrs)
//       return {
//         success: true,
//         message: "fencing coordinates set",
//         data: attrs
//       }
//     })
//   },

//   routes() {
//     this.get("api/robot/", () => {
//       // debugger
//       return {
//         success: true,
//         message: "robot location get",
//         data: {
//           status: "connected",
//           battery: "100",
//           tankCapacity: "100",
//           coordinates: { latitude: 12.9, longitude: 77.6 }
//         }
//       }
//     })
//   },

// })

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