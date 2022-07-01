import {
    Text,
    View,
    PermissionsAndroid,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Modal,
    Pressable,
    ToastAndroid
} from 'react-native'
import { Input } from 'react-native-elements'
import React, { useState, useEffect, useCallback } from 'react'
import WifiManager from "react-native-wifi-reborn";
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import CircularButton from '../../components/CircularButton/CircularButton';
import styles from './Style'
import Card from '../../components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { currentConnection } from '../../redux/Actions/index'
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native';
import { getRobotData, connectedTo, setHomeSSID } from '../../redux/Actions/index';
import { setRobotData } from '../../redux/Actions/robotActions';
import { Formik } from 'formik';
import { setWifiCreds, pingToServer } from '../../services/services'
import Icon from 'react-native-vector-icons/FontAwesome5';
import DeviceInfo from 'react-native-device-info';


const devicePrefix = 'dandy';
const Home = () => {

    const dispatch = useDispatch();
    const current_connection = useSelector(state => state.connection);
    const serialNo = useSelector(state => state.connection.seralNo);
    const robotInfo = useSelector(state => state.connection);
    const networkInfo = useSelector(state => state.network.connectionStatus);
    const robots = useSelector(state => state.robot.robots);
    const navigation = useNavigation();
    const [ssid, setSsid] = useState('');
    const [deviceList, setWifiList] = useState([]);
    const [wifiStatus, setWifiStatus] = useState('');
    const [permission, setPermission] = useState('');
    const [wifiConnected, setWifiConnected] = useState(false);
    const [wifiConnecting, setWifiConnecting] = useState(false);
    const [isWifiEnabled, setIsWifiEnabled] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState(false);
    const [connectionsStatus, setConnectionsStatus] = useState(false);
    const [passwordShow, setPasswordShow] = useState(false);
    const [availableDevices, setAvailableDevices] = useState([]);
    const [listVisible, setListVisible] = useState(false);
    const homeWifi = useSelector(state => state.connection.homeSSID)
    console.log(homeWifi)

    const getNumbers = (str) => {
        return str.replace(/[^0-9]/g, '');
    }

    const connectToWifi = async (id) => {
        setWifiConnecting(true);
        const serial = getNumbers(id);
        if (Platform.OS === 'android') {
            WifiManager.connectToProtectedSSID(id, "dandypassword", false)
                .then(wifi => {
                    setWifiConnecting(false);
                    setWifiConnected(true);
                    getWifiStatus()
                    dispatch(currentConnection(id, serial));
                    setModalVisible(true);
                    console.log("connected to", wifi)
                })
                .catch(error => {
                    console.log(error);
                    setWifiConnecting(false);
                    setWifiConnected(false);
                    getWifiStatus()
                });
        }
        else {
            WifiManager.connectToProtectedSSIDPrefix("dandy", "dandypassword", false).then(wifi => {
                setWifiConnecting(false);
                setWifiConnected(true);
                getWifiStatus()

            }
            ).catch(error => {
                console.log(error);
                setWifiConnecting(false);
                setWifiConnected(false);
                getWifiStatus()

            }
            );
        }
    };

    //disconnect from wifi
    // const disconnectFromWifi = (ssid) => {

    //     if (Platform.OS === 'ios') {

    //         WifiManager.disconnectFromSSID(ssid)
    //             .then(wifi => {
    //                 console.log(wifi)
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             });
    //     }

    //     else {
    //         WifiManager.disconnect()
    //     }
    // };

    //get device list
    const getDeviceList = async () => {
        setAvailableDevices([]);
        if (Platform.OS === 'android') {
            await DeviceInfo.getAvailableLocationProviders().then(providers => {
                if (providers.gps == true) {
                    WifiManager.loadWifiList().then(wifiList => {
                        setWifiList(wifiList);
                        console.log("wifi list", wifiList)
                    });
                }
            })

        }
        else {
            DeviceInfo.getAvailableLocationProviders().then(providers => {
                if (providers.locationServicesEnabled == true) {
                    connectToWifi()

                }
                else {
                    alert('Please enable location services')
                }
            })
        }

    };

    //get wifi status
    const getWifiStatus = () => {
        DeviceInfo.getAvailableLocationProviders().then(providers => {
            if (providers.locationServicesEnabled == true) {
                WifiManager.getCurrentWifiSSID().then(
                    ssid => {
                        console.log("Your current connected wifi SSID is " + ssid);
                        setWifiConnected(true);
                        setWifiStatus("Connected to " + ssid);
                        setSsid(ssid);
                    },
                    () => {
                        console.log("Cannot get current SSID!");
                    }
                );
            }
            else {
                alert('Please enable location services')
            }
        })
    };

    //get permission to access wifi
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

                setPermission(granted)

            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
                setPermission(result)

            });
            check(PERMISSIONS.IOS.LOCATION_ALWAYS)
                .then((result) => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log('This feature is not available (on this device / in this context)');
                            break;
                        case RESULTS.DENIED:
                            console.log('The permission has not been requested / is denied but requestable');
                            break;
                        case RESULTS.LIMITED:
                            console.log('The permission is limited: some actions are possible');
                            break;
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            break;
                        case RESULTS.BLOCKED:
                            console.log('The permission is denied and not requestable anymore');
                            break;
                    }
                })
                .catch((error) => {
                    console.log("Permission error", error)
                });
        }
    };


    // go through an array and check with every item by using pingToServer with the serial_number 
    const pingAll = async () => {
        setWifiList([])
        let arr = [];
        robots.map((robot) => {
            arr.push(pingToServer(robot.data.device.serial_number))
        })
        await Promise.all(arr).then(res => {
            console.log("ping", res)
            setAvailableDevices(res)
            setListVisible(true)
        }
        ).catch(err => {
            console.log("ping error", err)
        }
        )

    }

    const saveWifi = async () => {
        DeviceInfo.getAvailableLocationProviders().then(providers => {
            if (providers.locationServicesEnabled == true) {
                WifiManager.getCurrentWifiSSID().then(
                    ssid => {
                        console.log("Home SSID " + ssid);
                        dispatch(setHomeSSID(ssid));

                    }
                );
            }
            else {
                alert('Please enable location services')
            }
        })

    }

    useEffect(() => {
        dispatch(getRobotData())
        getPermission()
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsWifiEnabled(state.isWifiEnabled)
        });
        unsubscribe()
        if (permission === PermissionsAndroid.RESULTS.GRANTED || permission === RESULTS.GRANTED) {
            getWifiStatus();
        } else {
            console.log("Permission denied");
        }

        if (!isWifiEnabled) {
            DeviceInfo.getAvailableLocationProviders().then(providers => {
                if (providers.locationServicesEnabled == true) {
                    WifiManager.setEnabled(true);
                }
                else {
                    alert('Please enable location services')
                }
            })
        }
    }, [permission, wifiStatus, isWifiEnabled, networkInfo]);

    const disconnect = () => {
        WifiManager.disconnect()
            .then(wifi => {
                console.log("disconnect", wifi)
                setSsid("")
            })
            .catch(error => {
                console.log(error);
            });
    };

    const onSubmitFunction = async (values) => {
        console.log("Values", values)
        setWifiCreds(serialNo, values).then(res => {
            console.log("Response", res)
            if (res.status === 200) {
                setError(false)
                // dispatch set robot data after checking if the robot is already in the list
                if (!robots.some(robot => robot.device.serial_number === serialNo)) {
                    dispatch(setRobotData(res))
                }
                dispatch(connectedTo(res.data.device.connected_ssid))
                setModalVisible(!modalVisible)
                setTimeout(() => {
                    ToastAndroid.show(
                        `Connected to${values.ssid}`,
                        ToastAndroid.LONG,
                    );
                }, 1000);
            }
            else {
                setError(true)
                setTimeout(() => {
                    ToastAndroid.show(
                        `Can not connect to ${values.ssid}`,
                        ToastAndroid.LONG,
                    );
                }, 1000);
            }


        }
        ).catch(err => {
            console.log("Error", err)
            setError(true)
        }
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            {`${ssid}`.includes(devicePrefix) &&
                <Card
                    name={`${current_connection.wifi}`.includes(devicePrefix) ? `${current_connection.wifi}` : "No Dandy connected"}
                    count={current_connection.wifi === ssid ? 100 : "N/A"}
                    onTap={() => { current_connection.wifi === ssid ? disconnect() : connectToWifi(current_connection.wifi) }}
                    buttonText={current_connection.wifi === ssid ? "Disconnect" : "Connect"}
                />
            }
            <KeyboardAvoidingView
                style={{ alignItems: 'center' }}
            >

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
                            initialValues={{ ssid: homeWifi, password: '' }}
                            onSubmit={values => {
                                onSubmitFunction(values);
                                ToastAndroid.show(
                                    `Connecting to${values.ssid}`,
                                    ToastAndroid.SHORT,
                                );

                            }}>
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Connect To Wifi</Text>
                                    {error && <Text style={{ color: "red" }}>Couldn't connect to wifi</Text>}
                                    <Input
                                        label="SSID"
                                        value={values.ssid}
                                        onChangeText={handleChange('ssid')}
                                        onBlur={handleBlur('ssid')}
                                        placeholder={homeWifi == "" ? "SSID" : homeWifi}
                                        inputContainerStyle={styles.input}
                                        keyboardType="default"
                                        style={styles.inputText}
                                    />
                                    <Input
                                        label="Password"
                                        secureTextEntry={passwordShow ? false : true}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        placeholder="Password"
                                        keyboardType="default"
                                        rightIcon={
                                            <Icon
                                                name={passwordShow ? 'eye-slash' : 'eye'}
                                                size={15}
                                                color="black"
                                                onPress={() => setPasswordShow(!passwordShow)}
                                            />
                                        }
                                        inputContainerStyle={styles.input}
                                        style={styles.inputText}
                                    />
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                        <Pressable
                                            style={[styles.button, styles.buttonCancel]}
                                            onPress={() => {
                                                setModalVisible(!modalVisible)
                                                setError(false)
                                            }
                                            }>
                                            <Text style={styles.textStyle}>Cancel</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.button, styles.buttonConnect]}
                                            onPress={handleSubmit}>
                                            <Text style={styles.textStyle}>Connect</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </Modal>
                <View>
                    {!`${ssid}`.includes(devicePrefix) &&
                        <CircularButton
                            buttonText={"Add Device"}
                            onTap={() => {
                                getDeviceList()
                                saveWifi()
                            }}
                        />}
                    {!`${ssid}`.includes(devicePrefix) &&
                        <CircularButton
                            buttonText={"Load Available Devices"}
                            onTap={() => pingAll()}
                        />}
                    <ScrollView>
                        {deviceList.length > 0 ? deviceList.map((wifi, index) => {
                            if (wifi.SSID.includes(devicePrefix) && !ssid.includes(devicePrefix)) {
                                return (
                                    <Card
                                        key={index}
                                        name={wifi.SSID}
                                        onTap={
                                            () => {
                                                disconnect()
                                                connectToWifi(wifi.SSID)
                                                setListVisible(false)
                                            }
                                        }
                                        onWHoleTap={() => disconnect()}
                                        buttonText={wifi.SSID === ssid ? "Connected" : "Connect"}
                                    />
                                )
                            }
                            else {
                                return null
                            }
                        }) : (!`${current_connection.wifi}`.includes(devicePrefix) || !`${ssid}`.includes(devicePrefix) &&
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Tap on Add Device to pair device</Text>)
                        }
                        {
                            !`${ssid}`.includes(devicePrefix) &&
                            availableDevices.length > 0 &&
                            availableDevices.map((device, index) => (
                                <Card
                                    key={index}
                                    name={device.data.device.name}
                                    onTap={
                                        () => {

                                            setSsid(device.data.device.name)
                                            dispatch(currentConnection(device.data.device.name, device.data.device.serial_number));
                                        }
                                    }
                                    buttonText={"Select"}
                                />
                            ))

                        }
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Home

