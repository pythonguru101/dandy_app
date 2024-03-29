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
import CleaningHistory from '../screen/UserProfile/CleaningHistory/CleaningHistory';
import PairedDevices from '../screen/UserProfile/PairedDevices/PairedDevices';
import RobotStatus from '../screen/RobotStatus/RobotStatus';
import CleanAlert from '../screen/CleanAlert/CleanAlert';
import WalkAroundMarker from '../screen/WalkAroundMarker/WalkAroundMarker';
import { useSelector } from 'react-redux';
import CheckUpdate from '../screen/CheckUpdate/CheckUpdate';
// import AreaSelector from '../screen/AreaSelector/AreaSelector';
import OrderMedia from '../screen/OrderMedia/OrderMedia';
import Feedback from '../screen/Feedback/Feedback';
import Support from '../screen/Support/Support';
import HomeUpdated from '../screen/Home/HomeUpdated';
import OnboardingScreen from '../screen/Onboarding/Onboarding';
import AboutDevice from '../screen/Settings/AboutDevice';
import EditSerial from '../screen/Settings/EditSerial';
import RobotHistory from '../screen/UserProfile/RobotHistory/RobotHistory'
import HeatMapView from '../components/HeatMapView/HeatMapView';
import HeatMapAlt from '../screen/HeatMap/HeatMapAlt';
import HeatMapMenu from '../screen/HeatMap/HeatMapMenu';
import CustomHeatMap from '../screen/HeatMap/CustomHeatMap';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="UserProfilePage" component={UserProfile}
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
            headerTintColor: '#000000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }} />
        <Stack.Screen name="CleaningHistory" component={CleaningHistory} options={{
            headerShown: true,
            title: 'Cleaning History',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }} />
        <Stack.Screen name="PairedDevice" component={PairedDevices} options={{
            headerShown: true,
            title: 'Paired Device',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }} />
        <Stack.Screen name="MapView" component={Map} options={{
            headerShown: true,
            title: 'Map View',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }} />
         <Stack.Screen name="RobotHistory" component={RobotHistory} options={{
            headerShown: true,
            title: 'Robot History',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }} />
         <Stack.Screen name="HeatMapView" component={HeatMapView} options={{
            headerShown: true,
            title: 'History View',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000000',
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
            headerTintColor: '#000000',
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
            headerTintColor: '#000000',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }} />
    </Stack.Navigator>
)

const SettingsStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Settings" component={Settings} options={{
            headerShown: true,
            title: 'Settings',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: () => (
                <DrawerToggleButton />
            )
        }} />
        <Stack.Screen name="ChekUpdate" component={CheckUpdate} options={{
            headerShown: true,
            title: 'Software Update',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }} />

        <Stack.Screen name="AboutDevice" component={AboutDevice} options={{

            headerShown: true,
            title: 'About Device',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }} />
           <Stack.Screen name="EditSerial" component={EditSerial} options={{

                headerShown: true,
                title: 'Edit Serial',
                headerStyle: {
                 backgroundColor: '#fff',
                },
                headerTintColor: '#000000',
                headerTitleStyle: {
                fontWeight: 'bold',
                }
            }} />

    </Stack.Navigator>
)

const HeatMapStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="HeatMapMenu" component={HeatMapMenu} options={{
            headerShown: true,
            title: 'Select Catagory',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: () => (
                <DrawerToggleButton />
            )
        }} />
        
        <Stack.Screen name="CustomHeatMap" component={CustomHeatMap} options={{

headerShown: true,
title: 'Heat Maps',
headerStyle: {
 backgroundColor: '#fff',
},
headerTintColor: '#000000',
headerTitleStyle: {
fontWeight: 'bold',
}
}} />
           <Stack.Screen name="HeatMapAlt" component={HeatMapAlt} options={{

                headerShown: true,
                title: 'Heat Map',
                headerStyle: {
                 backgroundColor: '#fff',
                },
                headerTintColor: '#000000',
                headerTitleStyle: {
                fontWeight: 'bold',
                }
            }} />

    </Stack.Navigator>
)



export default function App() {

    const currentConection = useSelector(state => state.connection.wifi);
    const onboarding = useSelector(state => state.onboarding.onboarding);
    console.log("onboarding", onboarding);
    if (onboarding) {
        return <OnboardingScreen />
    } else {
        return (
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeUpdated}
                    options={{
                        drawerIcon: ({ tintColor }) => (
                            <Icon name="home" size={20} color="#808080" />
                        ),
                        headerLeft: () => (
                            <DrawerToggleButton />
                        )
                    }}
                />
                {/* <Drawer.Screen name="Devices" component={DeviceStack} options={{
                title: 'Connected Device',
                headerShown: false,
                drawerIcon: ({ tintColor }) => (
                    <Icon name="robot" size={24} color={tintColor} />)
            }} /> */}

                {/* {currentConection.includes("dandy") && */}
                <Drawer.Screen name="Map" component={Area} options={{
                    title: 'Map',
                    drawerIcon: ({ tintColor }) => (
                        <Icon name="map-marked-alt" size={24} color="#808080" />)
                }} />
                {/* } */}
                <Drawer.Screen name="HeatMap" component={HeatMapStack} options={{
                    title: 'Heat Map',
                    headerShown: false,
                    drawerIcon: ({ tintColor }) => (
                        <Icon name="fire" size={24} color="#808080" />)
                }} />
                <Drawer.Screen name="UserProfile" component={ProfileStack} options={{
                    title: 'User Profile',
                    headerShown: false,
                    drawerIcon: ({ tintColor }) => (
                        <Icon name="user" size={24} color="#808080" />)
                }} />
                <Drawer.Screen name="RobotStatus" component={RobotStatus} options={{
                    title: 'Robot Status',
                    headerShown: true,
                    drawerIcon: ({ tintColor }) => (
                        <Icon name="exclamation-circle" size={24} color="#808080" />)
                }} />
                <Drawer.Screen name="CleanAlert" component={CleanAlert} options={{
                    title: 'Clean Alert',
                    headerShown: true,
                    drawerIcon: ({ tintColor }) => (
                        <Icon name="trash-restore-alt" size={24} color="#808080" />)
                }} />
                <Drawer.Screen name="WalkAroundMarker" component={WalkAroundMarker} options={{
                    title: 'Walk Around Marker',
                    headerShown: true,
                    drawerIcon: ({ tintColor }) => (
                        <Icon name="map-marker-alt" size={24} color="#808080" />)
                }} />
                <Drawer.Screen name="SettingsStack" component={SettingsStack}
                    options={{
                        title: 'Settings',
                        headerShown: false,
                        drawerIcon: ({ tintColor }) => (
                            <Icon name="cog" size={24} color="#808080" />)
                    }}
                />

                <Drawer.Screen name="OrderMedia" component={OrderMedia} options={{
                    title: 'Order Media',
                    headerShown: true,
                    drawerIcon: ({ tintColor }) => (
                        <Icon name="file-upload" size={24} color="#808080" />)
                }} />
                <Drawer.Screen name="Feedback" component={Feedback} options={{
                    title: 'Feedback',
                    headerShown: true,
                    drawerIcon: ({ tintColor }) => (
                        <Icon name="comment" size={24} color="#808080" />)
                }} />
                <Drawer.Screen name="Support" component={Support} options={{
                    title: 'Support',
                    headerShown: true,
                    drawerIcon: ({ tintColor }) => (
                        <Icon name="question-circle" size={24} color="#808080" />)
                }} />

            </Drawer.Navigator>
        );
    }

}