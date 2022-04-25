import { StyleSheet, Text, View ,Button,TextInput} from 'react-native'
import React from 'react'
import WifiManager from "react-native-wifi-reborn";

const Home = () => {

    const [ssid, setSsid] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [wifiList, setWifiList] = React.useState([]);
    const [wifiStatus, setWifiStatus] = React.useState('');
    const [wifiConnected, setWifiConnected] = React.useState(false);
    const [wifiConnecting, setWifiConnecting] = React.useState(false);
    

    const getWifiList = () => {
       WifiManager.loadWifiList().then(wifiList => {
            setWifiList(wifiList);
        });

    };

    const connectToWifi = () => {
        setWifiConnecting(true);
        WifiManager.connectToProtectedSSID(ssid, password)
            .then(wifi => console.log(wifi))
            .catch(error => {
                console.log(error);
                setWifiConnecting(false);
                setWifiConnected(false);
            });
    };

    const disconnectFromWifi = () => {
        WifiManager.disconnectFromWifi()
            .then(wifi => {
                setWifiConnected(false);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getWifiStatus = () => {
        WifiManager.connectionStatus()
            .then(wifiStatus => {
                setWifiStatus(wifiStatus);
            })
            .catch(error => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        getWifiList();
        getWifiStatus();
      
    }, []);

const onChangeSSID = (text) => {
    setSsid(text);
}

const onChangePassword = (text) => {
    setPassword(text);
}

    
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <View style={styles.buttonStyle}>
                <TextInput style={styles.textInputStyle} onChange={(t)=>onChangeSSID(t)} placeholder="Enter SSID" />
                <TextInput style={styles.textInputStyle} onChange={(t)=>onChangePassword(t)} placeholder="Enter Password" />
            <Button
             title="Connect" onPress={() => connectToWifi()} />
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
})