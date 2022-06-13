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
import points from './points'

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

const Area = (props) => {
    const [permission, setPermission] = useState('');
    const [coordinate, setCoordinates] = useState(initialPosition);
    const {coordinates,holes,id,image} = props.route.params.map;
    //getting permission if no yet got
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
      
            //Getting location
            getCurrentLocation();
      
    }, [permission]);


    // remove point from polygon
    const mapOptions = {
        scrollEnabled: true,
        zoomEnabled: true,
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                mapType={MAP_TYPES.SATELLITE}
                maxZoomLevel={20}
                zoomEnabled={true}
                // onPress={e => onPress(e)}
                region={{
                    latitude: coordinate.coords.latitude,
                    longitude: coordinate.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                {...mapOptions}>
                <Marker
                    coordinate={{
                        latitude: coordinate.coords.latitude,
                        longitude: coordinate.coords.longitude,
                    }}
                    title="My Location"
                    description="This is where I am"
                    image={marker}
                    style={{ width: 10, height: 10 }}
                />
                <Marker
                    coordinate={{
                        latitude: coordinate.coords.latitude+0.00007565,
                        longitude: coordinate.coords.longitude+0.00019599,
                    }}
                    title="Robots Location"
                    description="This is where Robot is"
                    image={robot}
                    style={{ width: 10, height: 10 }}
                />

                {/* <Heatmap 
                    points={points}
                    opacity={1}
                    radius={20}
                    maxIntensity={100}
                    gradientSmoothing={10}
                    heatmapMode={"POINTS_DENSITY"}/> */}

                { coordinates?.length>0 && (
                    <Polygon
                        coordinates={coordinates}
                        holes={holes}
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
