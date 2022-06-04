import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Image,
  ToastAndroid
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, {
  MAP_TYPES,
  Polygon,
  PROVIDER_GOOGLE,
  Marker,
} from 'react-native-maps';
import marker from '../../assets/marker_blue.png';
import robot from '../../assets/robot.png'
import ball from '../../assets/ball.png'
import updateLocation from '../../assets/location_update.png';
import Geolocation from 'react-native-geolocation-service';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useDispatch,useSelector } from 'react-redux';
import { saveFencing } from '../../redux/Actions';
import { setFencingCoords } from '../../services/services';
import ViewShot,{captureScreen} from "react-native-view-shot";
import RNFS from 'react-native-fs';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0022;
let id = 0;
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
const path = `/storage/emulated/0/Android/data/com.dandyapp/cache` + `/${(Math.floor(Math.random() * 999999) + 1).toString()}.json`;
const Area = () => {
  const [polygons, setPolygons] = useState([]);
  const [editing, setEditing] = useState(null);
  const [latitudeDelta,setLatitudeDelta] = useState(LATITUDE_DELTA);
  const [longitudeDelta,setLongitudeDelta] = useState(latitudeDelta*ASPECT_RATIO);
  const [lat,setLat]=useState(initialPosition.coords.latitude);
  const [lng,setLng]=useState(initialPosition.coords.longitude);
  const [creatingHole, setCreatingHole] = useState(false);
  const [permission, setPermission] = useState('');
  const [coordinates, setCoordinates] = useState(initialPosition);
  const dispatch = useDispatch();
  const fencing = useSelector(state => state.fencing);
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
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
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
  }, [permission,fencing]);

  // finish editing polygon
  const finish = () => {
    setPolygons([...polygons, editing]);
    setEditing(null);
    setCreatingHole(false);
    console.log('info', polygons, editing, creatingHole);
    setFencingCoords(editing)
      .then(res => { ToastAndroid.show('Fencing coordinates saved', ToastAndroid.LONG) })
      .catch(err => { ToastAndroid.show('Fencing coordinates not saved', ToastAndroid.LONG) });

      captureScreen({
        format: "jpg",
        quality: 0.8
      }).then(
        uri => {
        console.log("Image saved to", uri)
        let data= editing
        editing.image=uri
        editing.date= new Date().toDateString()
        console.log("Saving object",data)
       dispatch(saveFencing(data));
      },
    
        error => console.error("Oops, snapshot failed", error)
      );

  RNFS.writeFile(path, JSON.stringify(editing), 'utf8').
  then(success => {
    console.log('File written successfully!', path);
  }).catch(err => {
    console.log('Error writing file', err);
  });

  };
  // cancel editing polygon
  const clear = () => {
    setPolygons([]);
    setEditing(null);
    setCreatingHole(false);
  };
  // optional hole creation
  const createHole = () => {
    if (!creatingHole) {
      setCreatingHole(true);
      setEditing({
        ...editing,
        holes: [...editing.holes, []],
      });
    } else {
      const holes = [...editing.holes];
      if (holes[holes.length - 1].length === 0) {
        holes.pop();
        setEditing({
          ...editing,
          holes,
        });
      }
      setCreatingHole(false);
    }
    console.log('first', editing, creatingHole);
  };
  // add point to polygon
  const onPress = e => {
    console.log("onpress functions",e)
    if (!editing) {
      setEditing({
        id: id++,
        coordinates: [e.nativeEvent.coordinate],
        holes: [],
      });
      console.log(e.nativeEvent.coordinate);
    } else if (!creatingHole) {
      setEditing({
        ...editing,
        coordinates: [...editing.coordinates, e.nativeEvent.coordinate],
      });
    } else {
      const holes = [...editing.holes];
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        e.nativeEvent.coordinate,
      ];
      setEditing({
        ...editing,
        id: id++,
        coordinates: [...editing.coordinates],
        holes,
      });
    }
  };
  // remove point from polygon
  const mapOptions = {
    scrollEnabled: true,
  };
  if (editing) {
    mapOptions.scrollEnabled = true;
    mapOptions.onPanDrag = e => onPress(e);
    mapOptions.zoomEnabled = true; 
  
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={MAP_TYPES.SATELLITE}
        maxZoomLevel={20}
        zoomEnabled={true}
        zoomControlEnabled={true}
        zoomTapEnabled={true}
        onPress={e => onPress(e)}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        onRegionChangeComplete={e => {
          setLongitudeDelta(e.longitudeDelta)
          setLatitudeDelta(e.latitudeDelta)
          setLat(e.latitude)
          setLng(e.longitude)
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
                    title="Robots Location"
                    description="This is where Robot is"
                    image={robot}
                    style={{ width: 10, height: 10 }}
                />
        {polygons.map(polygon => (
          <Polygon
            key={polygon.id}
            coordinates={polygon.coordinates}
            holes={polygon.holes}
            strokeColor="rgba(30,0,255,1)"
            fillColor="rgba(0,0,255,0.5)"
            strokeWidth={2}
            pointerEvents="box-only"
          />
        ))}
        {polygons && console.log('Polygons', polygons)}
        {editing && (
          <Polygon
            key={editing.id}
            coordinates={editing.coordinates}
            holes={editing.holes}
            strokeColor="rgba(30,0,255,1)"
            fillColor="rgba(0,0,255,0.5)"
            strokeWidth={2}
          />
        )}
        {editing && console.log('Editing', editing)}
        {editing && (
          <Marker
            coordinate={editing.coordinates[editing.coordinates.length - 1]}
            title="My Location"
            description="This is where I am"
            image={ball}
          />
        )}
      </MapView>

      <View style={styles.buttonContainerMain}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => clear()}
            style={[styles.bubble, styles.button]}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
          {editing && (
            <TouchableOpacity
              onPress={() => finish()}
              style={[styles.bubble, styles.button]}>
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: '#E2e2e2',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  buttonContainerMain: {
    flexDirection: 'row',
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
