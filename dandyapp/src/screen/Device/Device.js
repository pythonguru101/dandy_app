import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    PermissionsAndroid,
    TouchableOpacity,
    Modal,
    Pressable,
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

const Device = () => {

    const [ssid, setSsid] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [deviceList, setWifiList] = React.useState([]);
    const [wifiStatus, setWifiStatus] = React.useState('');
    const [wifiConnected, setWifiConnected] = React.useState(false);
    const [wifiConnecting, setWifiConnecting] = React.useState(false);
    const [permission, setPermission] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalText, setModalText] = React.useState('');


    const connectToWifi = () => {
        setWifiConnecting(true);
        WifiManager.connectToProtectedSSID(ssid, password, false)
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
    };

    const disconnectFromWifi = (ssid) => {


        // WifiManager.disconnectFromSSID(ssid)
        //     .then(wifi => {
        //         console.log(wifi)
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    };

    const getDeviceList = async () => {
        await WifiManager.loadWifiList().then(wifiList => {
            setWifiList(wifiList);
        });

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

        getPermission()
        if (permission === PermissionsAndroid.RESULTS.GRANTED || permission === RESULTS.GRANTED) {
            getWifiStatus();
            console.log("Wifi List", deviceList);
        } else {
            console.log("Permission denied");
        }
    }, [permission, wifiStatus]);

    const onChangePassword = (text) => {
        setPassword(text);
    }


    return (
        <SafeAreaView style={styles.container}>
            <Card
                name={ssid}
                count={100}
                onTap={() => {
                    console.log("Tapped")
                }
                }
                onWHoleTap={() => console.log("Tapped")}
                buttonText="Connect"
            />
            <KeyboardAvoidingView
                style={{ alignItems: 'center' }}
            >

                {/* <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>{modalText}</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangePassword}
                                    value={password}
                                    placeholder="password"
                                    keyboardType="default"
                                />
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                                    <Pressable
                                        style={[styles.button, styles.buttonConnect]}
                                        onPress={() => connectToWifi()}
                                    >
                                        <Text style={styles.textStyle}>Connect</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, styles.buttonCancel]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal> */}


                {/* <Text>Home</Text> */}
                <View>
                    <Text>Status: {wifiStatus || "No Dandy Bot Connected"}</Text>
                </View>
                {/* wifi list */}

                <View>
                    <CircularButton
                        buttonText={wifiConnected === true ? "Disonnect" : "Connect"}
                        onTap={() => wifiConnected == true ? WifiManager.disconnect() : getDeviceList()}
                    />

                    <Text>Available Devices</Text>
                    {deviceList.length > 0 ? deviceList.map((wifi, index) => {

                        console.log("mapped", wifi.SSID)
                        return (
                            <TouchableOpacity key={index} onPress={() => {
                                setModalVisible(true)
                                setModalText(wifi.SSID)

                            }}>
                                <View style={{ flexDirection: "row", backgroundColor: "#B8FFF9" }} >
                                    <Text>{index + 1}{". "}</Text>
                                    <Text>{wifi.SSID}{"  "}</Text>
                                    <Text>{wifi.BSSID}</Text>
                                </View>
                            </TouchableOpacity>
                        )

                    }) : <Text>No Devices found</Text>}
                </View>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default Device

