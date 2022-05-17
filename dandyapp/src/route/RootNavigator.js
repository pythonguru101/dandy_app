import * as React from 'react';
import { Button, Image, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from '../screen/Home/Home'
import Settings from '../screen/Settings/Settings'
import Device from '../screen/Device/Device'
import Area from '../screen/AreaSelector/Area';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Map from '../components/Map/Map';




const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DeviceStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Device" component={Device} options={{
            headerShown: true,
            title: 'Device',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }} />
        <Stack.Screen name="AreaSelector" component={Area} options={{
            headerShown: true,
            title: 'Area Selector',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }} />
    </Stack.Navigator>
)

export default function App() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon name="home" size={20} color={tintColor} />
                    ),
                }}
            />
            <Drawer.Screen name="Devices" component={DeviceStack} options={{
                title: 'Connected Device',
                headerShown: false,
                drawerIcon: ({ tintColor }) => (
                    <Icon name="robot" size={24} color={tintColor} />)
            }} />
            <Drawer.Screen name="Settings" component={Settings}
                options={{
                    title: 'Settings',
                    drawerIcon: ({ tintColor }) => (
                        <Icon name="cog" size={24} color={tintColor} />)
                }}
            />
            <Drawer.Screen name="Map" component={Map} options={{
                title: 'Map',
                drawerIcon: ({ tintColor }) => (
                    <Icon name="map-marked-alt" size={24} color={tintColor} />)
            }} />
        </Drawer.Navigator>

    );
}