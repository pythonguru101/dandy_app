import {
    Text,
    View,
    PermissionsAndroid,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView
} from 'react-native'
import React from 'react'
import WifiManager from "react-native-wifi-reborn";
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import CircularButton from '../../components/CircularButton/CircularButton';
import styles from './Style'
import Card from '../../components/Card/Card';
import devices from '../../data/devices';

const Home = () => {

    const [ssid, setSsid] = React.useState('');
    const [deviceList, setWifiList] = React.useState([]);
    const [wifiStatus, setWifiStatus] = React.useState('');
    const [permission, setPermission] = React.useState('');


    const connectToWifi = () => {
        setWifiConnecting(true);
        if (Platform.OS === 'android') {
            WifiManager.connectToProtectedSSID(devices[0].SSID, devices[0].password, false)
                .then(wifi => {
                    setWifiConnecting(false);
                    setWifiConnected(true);
                    setWifiStatus(wifi.status);
                    console.log("connected", wifi)
                })
                .catch(error => {
                    console.log(error);
                    setWifiConnecting(false);
                    setWifiConnected(false);
                });
        }
        else {
            WifiManager.connectToProtectedSSIDPrefix(devices[0].SSID, devices[0].password, false).then(wifi => {
                setWifiConnecting(false);
                setWifiConnected(true);
                setWifiStatus(wifi.status);
                console.log("connected", wifi)
            }
            ).catch(error => {
                console.log(error);
                setWifiConnecting(false);
                setWifiConnected(false);
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

    React.useEffect(() => {
        console.log(devices)
        getPermission()
        if (permission === PermissionsAndroid.RESULTS.GRANTED || permission === RESULTS.GRANTED) {
            getWifiStatus();
            console.log("Wifi List", deviceList);
        } else {
            console.log("Permission denied");
        }
    }, [permission, wifiStatus]);


    return (
        <SafeAreaView style={styles.container}>
            {ssid !== '' && <Card
                name={ssid}
                count={100}
                onTap={() =>
                    disconnectFromWifi(ssid)
                }
                onWHoleTap={() => console.log("Tapped")}
                buttonText={"Disconnect"}
            />}
            <KeyboardAvoidingView
                style={{ alignItems: 'center' }}
            >
                <View>
                    <CircularButton
                        buttonText={"Add Device"}
                        onTap={() => getDeviceList()}
                    />
                    {deviceList.length > 0 ? deviceList.map((wifi, index) => {
                        console.log("mapped", wifi.SSID)
                        return (
                            <Card
                                key={index}
                                name={wifi.SSID}
                                onTap={() => {
                                    console.log("Tapped")
                                }
                                }
                                onWHoleTap={() => console.log("Tapped")}
                                buttonText={wifi.SSID === ssid ? "Connected" : "Connect"}
                            />
                        )
                    }) : <Text style={{ fontWeight: "bold", fontSize: 20 }}>Tap on Add Device to connect</Text>
                    }
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Home

