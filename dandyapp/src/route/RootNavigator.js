import * as React from 'react';
import { Button, Image, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screen/Home/Home'
import Settings from '../screen/Settings/Settings'
import Device from '../screen/Device/Device'

import Icon from 'react-native-vector-icons/FontAwesome5';



const Drawer = createDrawerNavigator();

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
            <Drawer.Screen name="Device" component={Device} options={{
                title: 'Connected Device',
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
        </Drawer.Navigator>

    );
}