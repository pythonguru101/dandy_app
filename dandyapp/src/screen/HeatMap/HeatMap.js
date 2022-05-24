import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    PermissionsAndroid,
    Platform,
    Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, {
    MAP_TYPES,
    Polygon,
    PROVIDER_GOOGLE,
    Marker,
    Heatmap
} from 'react-native-maps';
import marker from '../../assets/marker_blue.png';
import robot from '../../assets/robot.png'
import updateLocation from '../../assets/location_update.png';
import Geolocation from 'react-native-geolocation-service';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useSelector } from 'react-redux';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0012;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const initialPosition = {
    coords: {
        accuracy: 5,
        altitude: 4.920991817048963,
        altitudeAccuracy: 3,
        heading: 0,
        latitude: 37.4219983,
        longitude: -122.084,
        speed: 0,
    },
    mocked: false,
    provider: 'fused',
    timestamp: 1651872653900,
};
const points = [
    {latitude: 6.83646681, longitude: 79.77121907, weight: 1},
    {latitude: 6.82776681, longitude: 79.871319, weight: 1},
    {latitude: 6.82176681, longitude: 79.871319, weight: 1},
    {latitude: 6.83776681, longitude: 79.871319, weight: 1},
    {latitude: 6.83176681, longitude: 79.871319, weight: 1},
    {latitude: 6.83976681, longitude: 79.861319, weight: 1},
    {latitude: 6.83076681, longitude: 79.861319, weight: 1},
    {latitude: 6.82776681, longitude: 79.861319, weight: 1},
    {latitude: 6.82076681, longitude: 79.871319, weight: 1},
    {latitude: 6.82076681, longitude: 79.861319, weight: 1},
    {latitude: 6.81076681, longitude: 79.861319, weight: 1},
    {latitude: 6.83776681, longitude: 79.869319, weight: 1},
    {latitude: 6.83276681, longitude: 79.869319, weight: 1},
    {latitude: 6.81976681, longitude: 79.869319, weight: 1},
    {latitude: 6.83776681, longitude: 79.867319, weight: 1},
    {latitude: 6.83776681, longitude: 79.865319, weight: 1},
    {latitude: 6.83646681, longitude: 79.77121907, weight: 1},
    {latitude: 6.82776681, longitude: 79.871319, weight: 1},
    {latitude: 6.82176681, longitude: 79.871319, weight: 1},
    {latitude: 6.83776681, longitude: 79.871319, weight: 1},
    {latitude: 6.83176681, longitude: 79.871319, weight: 1},
    {latitude: 6.83976681, longitude: 79.861319, weight: 1},
    {latitude: 6.83076681, longitude: 79.861319, weight: 1},
    {latitude: 6.82776681, longitude: 79.861319, weight: 1},
    {latitude: 6.82076681, longitude: 79.871319, weight: 1},
    {latitude: 6.82076681, longitude: 79.861319, weight: 1},
    {latitude: 6.81076681, longitude: 79.861319, weight: 1},
    {latitude: 6.83776681, longitude: 79.869319, weight: 1},
    {latitude: 6.83276681, longitude: 79.869319, weight: 1},
    {latitude: 6.81976681, longitude: 79.869319, weight: 1},
    {latitude: 6.83776681, longitude: 79.867319, weight: 1},
    {latitude: 6.83776681, longitude: 79.865319, weight: 1},
    {latitude: 6.84076681, longitude: 79.871319, weight: 1},
    {latitude: 6.83646681, longitude: 79.77121907, weight: 1},
    {latitude: 6.82776681, longitude: 79.871319, weight: 1},
    {latitude: 6.82176681, longitude: 79.871319, weight: 1},
    {latitude: 6.83776681, longitude: 79.871319, weight: 1},
    {latitude: 6.83176681, longitude: 79.871319, weight: 1},
    {latitude: 6.83976681, longitude: 79.861319, weight: 1},
    {latitude: 6.83076681, longitude: 79.861319, weight: 1},
    {latitude: 6.82776681, longitude: 79.861319, weight: 1},
    {latitude: 6.82076681, longitude: 79.871319, weight: 1},
    {latitude: 6.82076681, longitude: 79.861319, weight: 1},
    {latitude: 6.81076681, longitude: 79.861319, weight: 1},
    {latitude: 6.83776681, longitude: 79.869319, weight: 1},
    {latitude: 6.83276681, longitude: 79.869319, weight: 1},
    {latitude: 6.81976681, longitude: 79.869319, weight: 1},
    {latitude: 6.83776681, longitude: 79.867319, weight: 1},
    {latitude: 6.83776681, longitude: 79.865319, weight: 1},
    {latitude: 6.84076681, longitude: 79.871319, weight: 1},
    {latitude: 6.841776681, longitude: 79.869319, weight: 1},
    {latitude: 6.83646681, longitude: 79.77121907, weight: 1},
    {latitude: 6.82776681, longitude: 79.871319, weight: 1},
    {latitude: 6.82176681, longitude: 79.871319, weight: 1},
    {latitude: 6.83776681, longitude: 79.871319, weight: 1},
    {latitude: 6.83176681, longitude: 79.871319, weight: 1},
    {latitude: 6.83976681, longitude: 79.861319, weight: 1},
    {latitude: 6.83076681, longitude: 79.861319, weight: 1},
    {latitude: 6.82776681, longitude: 79.861319, weight: 1},
    {latitude: 6.82076681, longitude: 79.871319, weight: 1},
    {latitude: 6.82076681, longitude: 79.861319, weight: 1},
    {latitude: 6.81076681, longitude: 79.861319, weight: 1},
    {latitude: 6.83776681, longitude: 79.869319, weight: 1},
    {latitude: 6.83276681, longitude: 79.869319, weight: 1},
    {latitude: 6.81976681, longitude: 79.869319, weight: 1},
    {latitude: 6.83776681, longitude: 79.867319, weight: 1},
    {latitude: 6.83776681, longitude: 79.865319, weight: 1},
    {latitude: 6.84076681, longitude: 79.871319, weight: 1},
    {latitude: 6.841776681, longitude: 79.869319, weight: 1},
    {latitude: 6.84076681, longitude: 79.871319, weight: 1},

];
const Area = () => {
    const myFencing = useSelector(state => state.fencing.data);
    const [permission, setPermission] = useState('');
    const [coordinates, setCoordinates] = useState(initialPosition);
    //getting permission if no yet got
    console.table("points",points )
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

                setPermission(granted);
            } catch (err) {
                console.warn(err);
            }
        } else {
            request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
                setPermission(result);
            });
            check(PERMISSIONS.IOS.LOCATION_ALWAYS)
                .then(result => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log(
                                'This feature is not available (on this device / in this context)',
                            );
                            break;
                        case RESULTS.DENIED:
                            console.log(
                                'The permission has not been requested / is denied but requestable',
                            );
                            break;
                        case RESULTS.LIMITED:
                            console.log(
                                'The permission is limited: some actions are possible',
                            );
                            break;
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            break;
                        case RESULTS.BLOCKED:
                            console.log(
                                'The permission is denied and not requestable anymore',
                            );
                            break;
                    }
                })
                .catch(error => {
                    console.log('Permission error', error);
                });
        }
    };

    //getting location on request
    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log(position);
                setCoordinates(position);
            },
            error => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    };

    useEffect(() => {
        getPermission();
        //Checking permission
        if (
            permission === PermissionsAndroid.RESULTS.GRANTED ||
            permission === RESULTS.GRANTED
        ) {
            //Getting location
            getCurrentLocation();
        }
    }, [permission]);


    // remove point from polygon
    const mapOptions = {
        scrollEnabled: true,
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                mapType={MAP_TYPES.SATELLITE}
                maxZoomLevel={19}
                zoomControlEnabled={true}
                onPress={e => onPress(e)}
                region={{
                    latitude: coordinates.coords.latitude,
                    longitude: coordinates.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                {...mapOptions}>
                <Marker
                    coordinate={{
                        latitude: coordinates.coords.latitude,
                        longitude: coordinates.coords.longitude,
                    }}
                    title="My Location"
                    description="This is where I am"
                    image={marker}
                />
                <Marker
                    coordinate={{
                        latitude: coordinates.coords.latitude+0.00007565,
                        longitude: coordinates.coords.longitude+0.00019599,
                    }}
                    title="My Location"
                    description="This is where I am"
                    image={robot}
                    style={{ width: 20, height: 20 }}
                />

                <Heatmap
                points={[{latitude: coordinates.coords.latitude+0.00079565, longitude: coordinates.coords.longitude+0.00019599, weight: 1}]}
                opacity={0.7}
                radius={100}
                maxIntensity={20}
                gradientSmoothing={0.2}
                heatmapMode={"POINTS_DENSITY"}
                
                />


          

                {myFencing && myFencing.coordinates && (
                    <Polygon
                        coordinates={myFencing.coordinates}
                        holes={myFencing.holes}
                        strokeColor="#00F"
                        fillColor="rgba(0,0,255,0.5)"
                        strokeWidth={1} />
                )}
            </MapView>

            <View style={styles.buttonContainerMain}>
                <TouchableOpacity
                    onPress={() => getCurrentLocation()}
                    style={[styles.bubbleC, styles.buttonC]}>
                    <Image source={updateLocation} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Area;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',

    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    buttonContainerMain: {
        flex: 1,
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
    },
    bubbleC: {
        flexDirection: 'row-reverse',
        backgroundColor: '#E2e2e2',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 30,
    },
    buttonC: {
        paddingHorizontal: 12,
        marginHorizontal: 10,
        justifyContent: 'flex-end',
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
