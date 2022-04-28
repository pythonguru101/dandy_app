import { StyleSheet, Text, View, Button, TextInput, PermissionsAndroid, TouchableOpacity, Modal, Pressable, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import WifiManager from "react-native-wifi-reborn";

const Home = () => {

    const [ssid, setSsid] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [wifiList, setWifiList] = React.useState([]);
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

    // const disconnectFromWifi = () => {
    //     WifiManager.disconnectFromWifi()
    //         .then(wifi => {
    //             setWifiConnected(false);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // };

    const getWifiList = async () => {
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
            },
            () => {
                console.log("Cannot get current SSID!");
            }
        );
    };
    const getPermission = async () => {
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
    };

    React.useEffect(() => {
        getPermission()
        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
            // getWifiList();
            getWifiStatus();
            console.log("Wifi List", wifiList);
        } else {
            console.log("Permission denied");
        }
        // console.log(permission);
    }, [permission]);

    const onChangeSSID = (text) => {
        setSsid(text);
    }

    const onChangePassword = (text) => {
        setPassword(text);
    }


    return (
        <View style={styles.container}>
            <KeyboardAvoidingView >

                <Modal
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
                </Modal>


                <Text>Home</Text>
                {/* <View style={styles.buttonStyle}>
                <TextInput style={styles.textInputStyle} onChange={(t) => onChangeSSID(t)} placeholder="Enter SSID" />
                <TextInput style={styles.textInputStyle} onChange={(t) => onChangePassword(t)} placeholder="Enter Password" />
                <Button title="Connect" onPress={() => connectToWifi()} />
            </View> */}
                <View>
                    <Text>Status: {wifiStatus || "Not connected"}</Text>
                </View>
                {/* wifi list */}
                <View>
                    <Button title="Search" onPress={() => getWifiList()} />

                    <Text>Available Devices</Text>
                    {wifiList.length > 0 ? wifiList.map((wifi, index) => {

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

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9ADCFF',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    buttonStyle: {
        width: 150,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    textInputStyle: {
        width: 150,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderColor: '#000',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        height: "30%"

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: "30%",
    },
    buttonCancel: {
        backgroundColor: "#F194FF",


    },
    buttonConnect: {
        backgroundColor: "#2196F3",

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
        width: "100%"
    },
    input: {
        height: 40,
        // width: "100%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

})