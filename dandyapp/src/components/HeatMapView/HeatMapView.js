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
const LATITUDE_DELTA = 0.0000012;
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

const HeatMapView = (props) => {
    const myFencing = useSelector(state => state.fencing.data);

    const [coordinate, setCoordinates] = useState(initialPosition);
    const {timestamp,latitude,longitude,is_boundary,is_grass,is_weed,needs_fertilizer,needs_water,hsv_value} = props.route.params.map;
    //getting permission if no yet got
   const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
console.log("first",is_weed)
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
        getCurrentLocation();

        return () => {
            Geolocation.stopObserving()
        }
    }, []);


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
                maxZoomLevel={19}
                zoomControlEnabled={true}
                region={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                {...mapOptions}>
                {is_grass ==="True" &&<Marker
                    coordinate={{
                        latitude: lat,
                        longitude: lng,
                    }}
                    title="My Location"
                    description="This is where I am"
                    image={marker}
                />}
                {needs_fertilizer==="True" && 
                <Marker
                    coordinate={{
                        latitude: lat,
                        longitude: lng
                    }}
                    title="My Location"
                    description="This is where I am"
                    image={marker}
                    
                />}
                {is_boundary ==="True" && 
                <Marker
                    coordinate={{
                        latitude: lat,
                        longitude: lng
                    }}
                    title="My Location"
                    description="This is where I am"
                    image={marker}
                    
                />}
                {needs_water ==="True" && 
                <Marker
                    coordinate={{
                        latitude: lat,
                        longitude: lng
                    }}
                    title="My Location"
                    description="This is where I am"
                    image={marker}
                    
                />}

               { is_weed==="True" && <Heatmap
                    points={[{ latitude: lat, longitude: lng, weight: 5 }]}
                    opacity={0.7}
                    radius={50}
                    maxIntensity={20}
                    gradientSmoothing={0.2}
                    heatmapMode={"POINTS_DENSITY"}

                />}


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

export default HeatMapView;

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
