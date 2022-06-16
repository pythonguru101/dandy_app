import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Image,
  ToastAndroid, Modal, Pressable, KeyboardAvoidingView, TextInput
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
import { useDispatch, useSelector } from 'react-redux';
import { saveFencing } from '../../redux/Actions';
import { setFencingCoords } from '../../services/services';
import { captureScreen } from "react-native-view-shot";
import RNFS from 'react-native-fs';
import { Formik } from 'formik';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.00032;
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
  const [latitudeDelta, setLatitudeDelta] = useState(LATITUDE_DELTA);
  const [longitudeDelta, setLongitudeDelta] = useState(latitudeDelta * ASPECT_RATIO);
  const [lat, setLat] = useState(initialPosition.coords.latitude);
  const [lng, setLng] = useState(initialPosition.coords.longitude);
  const [regionlat, setRegionLat] = useState(initialPosition.coords.latitude);
  const [regionlng, setRegionLng] = useState(initialPosition.coords.longitude);
  const [creatingHole, setCreatingHole] = useState(false);
  const [permission, setPermission] = useState('');
  const [coordinates, setCoordinates] = useState(initialPosition);
  const dispatch = useDispatch();
  const fencing = useSelector(state => state.fencing);
  const [showMap, setShowMap] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // const [mapName, setMapName] = useState('');
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
    console.log("getting location")
    Geolocation.getCurrentPosition(
      position => {
        console.log("current position ", position);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setRegionLat(position.coords.latitude);
        setRegionLng(position.coords.longitude);
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

    return () => {
      Geolocation.stopObserving();
    }
  }, [permission, fencing]);


  const finish = (name) => {
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
        let data = editing
        editing.image = uri
        editing.date = new Date().toDateString()
        editing.name = name
        editing.status = 'active'
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
    console.log("onpress functions", e)
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

  const onSubmitFunction = async (values) => {
    console.log("Values", values.mapName)
    finish(values.mapName)

  };
  // remove point from polygon
  const mapOptions = {
    scrollEnabled: true,
    zoomEnabled: true,

  };
  if (editing) {
    mapOptions.scrollEnabled = true;
    mapOptions.onPanDrag = e => onPress(e);
    mapOptions.zoomEnabled = true;

  }

  if (!showMap) {
    return (
      <View style={{ flex: 1, backgroundColor: "#f2c041", alignItems: "center" }}>
        <View style={{ backgroundColor: "white", width: 120, borderRadius: 20, padding: 10, top: "40%" }}>
          <Pressable onPress={() => {
            setShowMap(!showMap)
          }}>
            <Text style={{ fontSize: 20, fontWeight: "900", textAlign: "center" }}>Open Are Selector</Text>
          </Pressable>
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <Formik
                initialValues={{ mapName: '' }}
                onSubmit={values => {
                  onSubmitFunction(values);
                  ToastAndroid.show(
                    `Saved ${values.mapName}`,
                    ToastAndroid.TOP,
                  );
                  setTimeout(() => {
                    setModalVisible(!modalVisible);
                  }, 1000);
                }}>
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Save Selected Area</Text>
                    {/* {error && <Text style={{ color: "red" }}>Couldn't connect to wifi</Text>} */}
                    <TextInput
                      style={styles.inputModal}
                      onChangeText={handleChange('mapName')}
                      onBlur={handleBlur('mapName')}
                      value={values.ssid}
                      placeholder="Name"
                      keyboardType="default"
                    />

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Pressable
                        style={[styles.buttonModal, styles.buttonConnectModal]}
                        onPress={handleSubmit}>
                        <Text style={styles.textStyleModal}>Save</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.buttonModal, styles.buttonCancelModal]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyleModal}>Cancel</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </Modal>
        </KeyboardAvoidingView>
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
            latitude: regionlat,
            longitude: regionlng,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
          onRegionChangeComplete={e => {
            setLongitudeDelta(e.longitudeDelta)
            setLatitudeDelta(e.latitudeDelta)
            setRegionLat(e.latitude)
            setRegionLng(e.longitude)
          }}
          {...mapOptions}>
          <Marker
            coordinate={{
              latitude: lat,
              longitude: lng,
            }}
            title="My Location"
            description="This is where I am"
            image={marker}
          />
          <Marker
            coordinate={{
              latitude: lat + 0.00007565,
              longitude: lng + 0.00019599,
            }}
            title="Robots Location"
            description="This is where Robot is"
            image={robot}
            style={{ width: 10, height: 10 }}
          />
          {polygons.map(polygon => (
            <Polygon
              key={polygon?.id}
              coordinates={polygon.coordinates}
              holes={polygon.holes}
              strokeColor="rgba(30,0,255,1)"
              fillColor="rgba(0,0,255,0.5)"
              strokeWidth={2}
              pointerEvents="box-only"
            />
          ))}

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
                onPress={() => setModalVisible(true)}
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
  }
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    // height: "30%",

  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "30%",
  },
  buttonCancelModal: {
    backgroundColor: "#F194FF",


  },
  buttonConnectModal: {
    backgroundColor: "#2196F3",

  },
  textStyleModal: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#2196F3"
  },
  centeredViewModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  inputModal: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#f2c041',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: "black"
  },
});
