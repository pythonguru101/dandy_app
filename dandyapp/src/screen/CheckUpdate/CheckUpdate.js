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
import { checkSoftwareUpdate, startDownloadingUpdate } from '../../services/services';
import { useSelector } from 'react-redux';

const ButtonComponent = ({ onPress, isLoading, textNext, textPrev }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          ...styles.button,
          backgroundColor: isLoading ? "#4caf50" : "#8bc84a",
        }}
      >
        {isLoading && <ActivityIndicator size="large" color="yellow" />}
        <Text style={styles.buttonText}>
          {isLoading ? textNext : textPrev}
        </Text>
      </View>
    </TouchableOpacity>
  );
}


const CheckUpdate = () => {
  const serialNo = useSelector(state => state.connection.serialNo);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(1);

  const checkUpdate = async () => {
    console.log("checkUpdate");
    setIsLoading(true);
    try {
      const response = await checkSoftwareUpdate(serialNo);
      response.status == 200 ? setIsLoading(false) : setIsLoading(true);
      console.log(response);
      setStatus(2);
      ToastAndroid.show('Checking for Updates', ToastAndroid.SHORT);
    } catch (error) {
      setError(error);
    }
  }
  const downloadfunction = async () => {
    setTimeout(() => {
      setIsLoading(false);
      setStatus(3);
      ToastAndroid.show('Downloaded Update', ToastAndroid.SHORT);
    }
      , 5000);
  }

  const updating = async () => {
    setTimeout(() => {
      setIsLoading(false);
      setStatus(1);
      ToastAndroid.show('Update Completed', ToastAndroid.SHORT);
    }
      , 5000);
  }
  const startDownloadUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await startDownloadingUpdate(serialNo, { is_update_available: true });
      if (response.status == 200) {
        downloadfunction()
        ToastAndroid.show('Download started', ToastAndroid.SHORT);

      }
      else {
        ToastAndroid.show('Download failed', ToastAndroid.SHORT);
      }
    }
    catch (error) {
      setError(error);
    }
  }


  const startUpdateProcess = async () => {
    setIsLoading(true);
    try {
      const response = await startDownloadingUpdate(serialNo, { is_update_available: true });
      if (response.status == 200) {
        updating()
        ToastAndroid.show('Update started', ToastAndroid.SHORT);
      }
      else {
        ToastAndroid.show('Update failed', ToastAndroid.SHORT);
      }
    }
    catch (error) {
      setError(error);
    }
  }




  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={{ uri: "https://img.icons8.com/nolan/96/installing-updates.png" }} />
      <Text style={styles.title}>Check for latest Software Update</Text>
      <Text style={styles.description}>Software updates increases stability and performance. Keep your device upto date with the latest software</Text>
      <View style={styles.updateButton}>

        {status == 1 &&
          <ButtonComponent
            onPress={checkUpdate}
            isLoading={isLoading}
            textNext="Stop Checking"
            textPrev="Check for Update"
          />}
        {status == 2 &&
          <ButtonComponent
            onPress={startDownloadUpdate}
            isLoading={isLoading}
            textNext="Downloading"
            textPrev="Download Update"
          />
        }
        {status == 3 &&
          <ButtonComponent
            onPress={startUpdateProcess}
            isLoading={isLoading}
            textNext="Updateing"
            textPrev="Start Update"
          />
        }
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

