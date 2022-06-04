import * as React from 'react';
import { Button, Image, View } from 'react-native';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from '../screen/Home/Home'
import Settings from '../screen/Settings/Settings'
import Device from '../screen/Device/Device'
import Area from '../screen/AreaSelector/Area';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Map from '../components/Map/Map';
import HeatMap from '../screen/HeatMap/HeatMap';
import UserProfile from '../screen/UserProfile/UserProfile';
import SavedMaps from '../screen/UserProfile/SavedMaps/SavedMaps';



const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="UserProfile" component={UserProfile} 
        options={{
            headerShown: true,
            title: 'User Profile',
            headerLeft: () => (
                <DrawerToggleButton />
                )
        }}
        
        />
         <Stack.Screen name="SavedMaps" component={SavedMaps} options={{
            headerShown: true,
            title: 'Saved Maps',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }} />
          <Stack.Screen name="MapView" component={Map} options={{
            headerShown: true,
            title: 'View Map',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }} />
    </Stack.Navigator>
);

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
            headerLeft: () => (
                <DrawerToggleButton />
                )
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
                    headerLeft: () => (
                        <DrawerToggleButton />
                        )
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
            <Drawer.Screen name="Map" component={Area} options={{
                title: 'Map',
                drawerIcon: ({ tintColor }) => (
                    <Icon name="map-marked-alt" size={24} color={tintColor} />)
            }} />
            {/* <Drawer.Screen name="HeatMap" component={HeatMap} options={{
                title: 'Heat Map',
                drawerIcon: ({ tintColor }) => (
                    <Icon name="fire" size={24} color={tintColor} />)
            }} /> */}
            <Drawer.Screen name="UserProfile" component={ProfileStack} options={{
                title: 'User Profile',
                headerShown: false,
                drawerIcon: ({ tintColor }) => (
                    <Icon name="user" size={24} color={tintColor} />)
            }} />
        </Drawer.Navigator>

    );
}