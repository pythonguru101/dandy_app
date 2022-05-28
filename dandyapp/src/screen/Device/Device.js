import {
  Text,
  View,
  PermissionsAndroid,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import WifiManager from 'react-native-wifi-reborn';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import CircularButton from '../../components/CircularButton/CircularButton';
import styles from './Style';
import Card from '../../components/Card/Card';
import devices from '../../data/devices';
import { useDispatch, useSelector } from 'react-redux';
import { currentConnection, connectToWifi, getRobotData } from '../../redux/Actions/index';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import axios from 'axios';
import { setWifiCreds } from '../../services/services'

const Device = () => {
  const [ssid, setSsid] = useState('');
  const [wifiId, setWifiId] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [deviceList, setWifiList] = useState([]);
  const [wifiStatus, setWifiStatus] = useState('');
  const [permission, setPermission] = useState('');
  const [wifiConnected, setWifiConnected] = useState(false);
  const [wifiConnecting, setWifiConnecting] = useState(false);
  const [isWifiEnabled, setIsWifiEnabled] = useState(false);
  const dispatch = useDispatch();
  const current_connection = useSelector(state => state.connection);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const robotInfo = useSelector(state => state.robot);


  const findPassword = ssid => {
    let password = '';
    devices.map(device => {
      if (device.SSID === ssid) {
        password = device.password;
      }
    });
    return password;
  };

  const connectToWifi = async id => {
    setWifiConnecting(true);
    const pass = await findPassword(id);
    if (Platform.OS === 'android') {
      WifiManager.connectToProtectedSSID(id, pass, false)
        .then(wifi => {
          setWifiConnecting(false);
          setWifiConnected(true);
          getWifiStatus();
          dispatch(currentConnection(id));
        })
        .catch(error => {
          console.log(error);
          setWifiConnecting(false);
          setWifiConnected(false);
          getWifiStatus();
        });
    } else {
      WifiManager.connectToProtectedSSIDPrefix(id, pass, false)
        .then(wifi => {
          setWifiConnecting(false);
          setWifiConnected(true);
          getWifiStatus();
        })
        .catch(error => {
          console.log(error);
          setWifiConnecting(false);
          setWifiConnected(false);
          getWifiStatus();
        });
    }
  };

  const getWifiStatus = () => {
    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        console.log('Your current connected wifi SSID is ' + ssid);
        setWifiConnected(true);
        setWifiStatus('Connected to ' + ssid);
        setSsid(ssid);
      },
      () => {
        console.log('Cannot get current SSID!');
      },
    );
  };
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission is required for WiFi connections',
            message:
              'This app needs location permission as this is required  ' +
              'to scan for wifi networks.',
            buttonNegative: 'DENY',
            buttonPositive: 'ALLOW',
          },
        );

        setPermission(granted);
      } catch (err) {
        console.warn(err);
      }
    } else {
      request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
        setPermission(result);
      });
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              break;
            case RESULTS.LIMITED:
              console.log(
                'The permission is limited: some actions are possible',
              );
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        })
        .catch(error => {
          console.log('Permission error', error);
        });
    }
  };

  useEffect(() => {
    dispatch(getRobotData())
    getPermission();
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state);
      console.log('Is connected?', state.isConnected);
      setIsWifiEnabled(state.isWifiEnabled);
    });
    unsubscribe();
    if (
      permission === PermissionsAndroid.RESULTS.GRANTED ||
      permission === RESULTS.GRANTED
    ) {
      getWifiStatus();
    } else {
      console.log('Permission denied');
    }

    if (!isWifiEnabled) {
      WifiManager.setEnabled(true);
    }
  }, [permission, wifiStatus, isWifiEnabled]);

  const disconnect = () => {
    WifiManager.disconnect()
      .then(wifi => {
        console.log(wifi);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onChangePassword = password => {
    setWifiPassword(password);
  };

  const onChangeSSID = ssid => {
    setWifiId(ssid);
  };


  const onSubmitFunction = async (values) => {
    console.log("Values", values)
    setWifiCreds(values).then(res => {
      console.log("Response", res)
      if (res.status === 200) {
        navigation.navigate('Home');
      }
    }
    ).catch(err => {
      console.log("Error", err)
    }
    )



  };


  return (
    <SafeAreaView style={styles.container}>
      <Card
        name={
          `${current_connection.wifi}`.includes('DANDY')
            ? `${current_connection.wifi}`
            : 'No Dandy connected'
        }
        count={100}
        onTap={() =>
          current_connection.wifi === ssid
            ? disconnect()
            : connectToWifi(current_connection.wifi)
        }
        onWHoleTap={() => navigation.navigate('Device')}
        buttonText={current_connection.wifi === ssid ? 'Disconnect' : 'Connect'}
      />
      <KeyboardAvoidingView style={{ alignItems: 'center' }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <Formik
              initialValues={{ ssid: '', password: '' }}
              onSubmit={values => {
                onSubmitFunction(values);
                ToastAndroid.show(
                  `Connecting to${values.ssid}`,
                  ToastAndroid.SHORT,
                );
                setTimeout(() => {
                  ToastAndroid.show(
                    `Connected to${values.ssid}`,
                    ToastAndroid.LONG,
                  );
                  setModalVisible(!modalVisible);
                }, 1000);
              }}>
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Connect To Wifi</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('ssid')}
                    onBlur={handleBlur('ssid')}
                    value={values.ssid}
                    placeholder="SSID"
                    keyboardType="default"
                  />
                  <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="Password"
                    keyboardType="default"
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Pressable
                      style={[styles.button, styles.buttonConnect]}
                      onPress={handleSubmit}>
                      <Text style={styles.textStyle}>Connect</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonCancel]}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </Modal>
        <View>
          <CircularButton
            buttonText={'Connect WiFi'}
            onTap={() => setModalVisible(!modalVisible)}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('AreaSelector')}>
            <Text style={styles.textStyle}>AreaSelector</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Device;
