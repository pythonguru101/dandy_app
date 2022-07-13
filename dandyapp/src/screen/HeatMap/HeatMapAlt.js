import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import React from 'react';
import MapView, {
    MAP_TYPES,
    PROVIDER_GOOGLE,
    Heatmap
} from 'react-native-maps';



const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0000012;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const HeatMapView = (props) => {
const {latitude,longitude} = props.route.params.map;
const lat = parseFloat(latitude);
const lng = parseFloat(longitude);


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
               

            <Heatmap
                    points={[{ latitude: lat, longitude: lng, weight: 5 }]}
                    opacity={0.7}
                    radius={50}
                    maxIntensity={20}
                    gradientSmoothing={0.2}
                    heatmapMode={"POINTS_DENSITY"}

                />


            </MapView>

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
