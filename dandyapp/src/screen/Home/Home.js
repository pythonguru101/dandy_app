import {
    Text,
    View,
    PermissionsAndroid,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import WifiManager from "react-native-wifi-reborn";
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import CircularButton from '../../components/CircularButton/CircularButton';
import styles from './Style'
import Card from '../../components/Card/Card';
import devices from '../../data/devices';
import { useDispatch, useSelector } from 'react-redux';
import { currentConnection } from '../../redux/Actions/index'
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native';



const Home = () => {

    const [ssid, setSsid] = useState('');
    const [deviceList, setWifiList] = useState([]);
    const [wifiStatus, setWifiStatus] = useState('');
    const [permission, setPermission] = useState('');
    const [wifiConnected, setWifiConnected] = useState(false);
    const [wifiConnecting, setWifiConnecting] = useState(false);
    const [isWifiEnabled, setIsWifiEnabled] = useState(false);
    const dispatch = useDispatch();
    const current_connection = useSelector(state => state.connection);
    const navigation = useNavigation();


    //find password for provided ssid
    const findPassword = (ssid) => {
        let password = '';
        devices.map((device) => {
            if (device.SSID === ssid) {
                password = device.password;
            }
        });
        return password;
    }

    const connectToWifi = async (id) => {
        setWifiConnecting(true);
        const pass = await findPassword(id);
        if (Platform.OS === 'android') {
            WifiManager.connectToProtectedSSID(id, pass, false)
                .then(wifi => {
                    setWifiConnecting(false);
                    setWifiConnected(true);
                    getWifiStatus()
                    dispatch(currentConnection(id))

                })
                .catch(error => {
                    console.log(error);
                    setWifiConnecting(false);
                    setWifiConnected(false);
                    getWifiStatus()

                });
        }
        else {
            WifiManager.connectToProtectedSSIDPrefix(id, pass, false).then(wifi => {
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

    const disconnectFromWifi = (ssid) => {

        if (Platform.OS === 'ios') {

            WifiManager.disconnectFromSSID(ssid)
                .then(wifi => {
                    console.log(wifi)
                })
                .catch(error => {
                    console.log(error);
                });
        }

        else {
            WifiManager.disconnect()
        }
    };

    const getDeviceList = async () => {
        if (Platform.OS === 'android') {
            await WifiManager.loadWifiList().then(wifiList => {
                setWifiList(wifiList);
            });
        }
        else {
            connectToWifi()
        }

    };

    const getWifiStatus = () => {
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

                setPermission(granted)

            }
            catch (err) {
                console.warn(err);
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

    useEffect(() => {
        getPermission()
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state);
            console.log("Is connected?", state.isConnected);
            setIsWifiEnabled(state.isWifiEnabled)
        });
        unsubscribe()
        if (permission === PermissionsAndroid.RESULTS.GRANTED || permission === RESULTS.GRANTED) {
            getWifiStatus();
        } else {
            console.log("Permission denied");
        }

        if (!isWifiEnabled) {
            WifiManager.setEnabled(true);
        }

    }, [permission, wifiStatus, isWifiEnabled]);

    const disconnect = () => {
        WifiManager.disconnect()
            .then(wifi => {
                console.log(wifi)
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Card
                name={`${current_connection.wifi}`.includes("DANDY")?`${current_connection.wifi}` : "No Dandy connected"}
                count={current_connection.wifi === ssid ? 100 : "N/A"}
                onTap={() => current_connection.wifi === ssid ? disconnect() : connectToWifi(current_connection.wifi)}
                onWHoleTap={() => navigation.navigate('Devices')}
                buttonText={current_connection.wifi === ssid ? "Disconnect" : "Connect"}
              
            />
            <KeyboardAvoidingView
                style={{ alignItems: 'center' }}
            >
                <View>
                    <CircularButton
                        buttonText={"Add Device"}
                        onTap={() => getDeviceList()}
                    />
                    <ScrollView>
                        {deviceList.length > 0 ? deviceList.map((wifi, index) => {
                            console.log("mapped", wifi.SSID.includes("DANDY_MARK1"))
                            if(wifi.SSID.includes("DANDY")){
                                return (
                                    <Card
                                        key={index}
                                        name={wifi.SSID}
                                        onTap={
                                            () => {
                                                disconnect()
                                                connectToWifi(wifi.SSID)
                                            }
                                        }
                                        onWHoleTap={() => disconnect()}
                                        buttonText={wifi.SSID === ssid ? "Connected" : "Connect"}
                                    />
                                )
                            }
                            else{
                                return null
                            }
                        }) : <Text style={{ fontWeight: "bold", fontSize: 20 }}>Tap on Add Device to connect</Text>
                        }
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Home

