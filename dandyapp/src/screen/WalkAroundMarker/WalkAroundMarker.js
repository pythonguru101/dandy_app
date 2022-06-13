// import { View, Text } from 'react-native'
// import React from 'react'

// const WalkAroundMarker = () => {
//   return (
//     <View>
//       <Text>WalkAroundMarker</Text>
//     </View>
//   )
// }

// export default WalkAroundMarker

import React, {useState, useEffect} from 'react';
import {
  StyleSheet, 
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  ToastAndroid,
  Modal,
  Dimensions
} from 'react-native';
import MapView, {Marker,PROVIDER_GOOGLE,MAP_TYPES,Polyline} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import  {Formik}  from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { saveFencing } from '../../redux/Actions';
import { setFencingCoords } from '../../services/services';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0012;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const WalkAroundMarker = () => {
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [coordinates, setCoordinates] = useState([]);
  const [tracking, setTracking] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    Geolocation.getCurrentPosition(
        position => {
        const crd = position.coords;
         setPosition({
                 latitude: crd.latitude,
                 longitude: crd.longitude,
                 latitudeDelta:LATITUDE_DELTA,
                 longitudeDelta: LONGITUDE_DELTA,
                });
            console.log("first position", position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );

    

console.log(" position", position);
console.log("coords", coordinates);

  }, []);




 
  switch (tracking) {
    case tracking:true
    Geolocation.watchPosition(
      position => {
      const crd = position.coords;
      // markCoords.push({latitude:crd.latitude,longitude: crd.longitude})
      setPosition({
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
         });
         setCoordinates([...coordinates, {latitude:crd.latitude,longitude: crd.longitude}])
        // console.log("markCoords1", markCoords);
      },
      error => {
        console.log(error);
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 0,
      },);
      break;
    case tracking:false
    Geolocation.clearWatch();
    break;
  
    default:
      break;
  }




  const startTrackingFunction = () => {

Geolocation.watchPosition(
      position => {
      const crd = position.coords;
    
      setPosition({
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
         });
         setCoordinates([...coordinates, {latitude:crd.latitude,longitude: crd.longitude}])
     
      },
      error => {
        console.log(error);
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 0,
      },);
    setTracking(true);
    }

    const stopTrackingFunction = () => {
      Geolocation.clearWatch();
      setTracking(false);
      setModalVisible(true);
    }



  



// const startTraking = () => {
//   console.log("start tracking");
//   setTracking(true);
// }

// const stopTracking = () => {
//   console.log("stop tracking");
//   setTracking(false);
//   // setCoordinates(markCoords);
//   console.log("coords updated", coordinates);
//   setModalVisible(true);
// }

const onSubmitFunction = async (values) => {
  console.log("Values", values.mapName)
  storeFencing(values.mapName)
};

const storeFencing =async (mapName) => {
  console.log("save fencing", mapName);
  const fencing = {
    coordinates: coordinates,
    name: mapName,
    id: Math.ceil(Math.random()* 100),
    date:new Date().toDateString(),
    status : 'active',
    holes:[]
  }

  await dispatch(saveFencing(fencing));
  setModalVisible(false);
  console.log("fencing", fencing);
}



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
                        onPress={() => {setModalVisible(!modalVisible);
                        setTracking(false);
                        }}>
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
      initialRegion={position}
      region={position}
      showsUserLocation={true}
      // showsMyLocationButton={true}
      mapType={MAP_TYPES.SATELLITE}
      followsUserLocation={true}
      showsCompass={true}
      scrollEnabled={true}
      zoomEnabled={true}
      maxZoomLevel={20}
      pitchEnabled={true}
      rotateEnabled={true}>
       {/* <Marker
       title='Yor are here'
      //  description='This is a description'
       coordinate={position}
       on
       /> */}
<Polyline
  coordinates={coordinates}
  strokeColor="#0096FF"
  strokeWidth={2}
/>

       </MapView>

       <View style={styles.buttonContainerMain}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={()=>{tracking?stopTrackingFunction():startTrackingFunction()}}
              style={[styles.bubble, styles.button]}>
              <Text style={styles.buttonText}>{tracking?"Stop":"Start"}</Text>
            </TouchableOpacity>
         
          </View>
         
        </View>

       </View>
  
  );
};

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
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  buttonContainerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
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

export default WalkAroundMarker;