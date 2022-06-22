import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  TouchableOpacity,
  View,
  Image,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import { checkSoftwareUpdate, startUpdate } from '../../services/services';
import { useSelector } from 'react-redux';

const CheckUpdate = () => {
  const seralNo = useSelector(state => state.connection.seralNo);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false);

  const checkUpdate = async () => {
    console.log("checkUpdate");
    setIsLoading(true);
    try {
      const response = await checkSoftwareUpdate(seralNo);
      console.log(response.data);
      setStatus(response.data.is_available_update);

    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }

  const startUpdateProcess = async () => {
    setIsLoading(true);
    try {
      const response = await startUpdate(seralNo, { is_update_available: true });
      if (response.status == 200) {
        setStatus(false);
        ToastAndroid.show('Update started', ToastAndroid.LONG);
      }
      else {
        ToastAndroid.show('Update failed', ToastAndroid.LONG);
      }
    }
    catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }




  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={{ uri: "https://img.icons8.com/nolan/96/installing-updates.png" }} />
      <Text style={styles.title}>Check for latest Software Update</Text>
      <Text style={styles.description}>Software updates increases stability and performance. Keep your device upto date with the latest software</Text>
      <View style={styles.updateButton}>
        {!status && <TouchableOpacity onPress={checkUpdate}>
          <View
            style={{
              ...styles.button,
              backgroundColor: isLoading ? "#4caf50" : "#8bc34a",
            }}
          >
            {isLoading && <ActivityIndicator size="large" color="yellow" />}
            <Text style={styles.buttonText}>
              {isLoading ? "Stop Checking" : "Check for Update"}
            </Text>
          </View>
        </TouchableOpacity>}
        {status && <TouchableOpacity onPress={startUpdateProcess}>
          <View
            style={{
              ...styles.button,
              backgroundColor: isLoading ? "#4caf50" : "#8bc34a",
            }}
          >
            {isLoading && <ActivityIndicator size="large" color="yellow" />}
            <Text style={styles.buttonText}>
              Start Update
            </Text>
          </View>
        </TouchableOpacity>}
      </View>
    </View>
  )
}

export default CheckUpdate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    paddingTop: 50,
  },
  icon: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 22,
    color: "#5F6D7A"
  },
  description: {
    marginTop: 20,
    textAlign: 'center',
    color: "#A9A9A9",
    fontSize: 16,
    margin: 40,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,

  },
  loginButton: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  // button position at the bottom of the screen
  updateButton: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#EEEEEE',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 240,
    height: 70,
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  },
});

