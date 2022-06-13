import React, { useEffect,useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
  Switch,
  Modal,TextInput
} from 'react-native';
import Icon  from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

import {useSelector,useDispatch} from 'react-redux';
import {setSaveSchedule,deleteSchedule} from '../../redux/Actions/RobotSchedule.action'
import RNCalendarEvents from 'react-native-calendar-events';
import Geolocation from 'react-native-geolocation-service';
import Notifications from '../../../Notification';



const CleanAlert = () => {
  const dispatch=useDispatch();
const newDate = new Date();
const scheduleData= useSelector(state=>state.schedule);
const [position, setPosition] = useState({
  latitude: 10,
  longitude: 10,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
});
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(newDate);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [name,setName]=useState('');
  const [time,setTime]=useState('');

useEffect(()=>{
  Geolocation.getCurrentPosition(
    position => {
      const crd = position.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    },
    error => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
  );
},[])

 const onChange = (event, selectedDate) => {
  const currentDate = selectedDate;
  setShow(false);
  setDate(currentDate);
  console.log("ssssss",currentDate);
};

const showMode = (currentMode) => {
  setShow(true);
  setMode(currentMode);
};

const showDatepicker = () => {
  showMode('date');
};

const showTimepicker = () => {
  showMode('time');
};
const timeExtract = (time) => {
  const timeString = time.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' });
  console.log(timeString,"timeString");
  return timeString;
}


const onChangeName=(text)=>{
  setName(text);
}

const onDelete=(id)=>{
  Alert.alert("Alert","Alert Deleted Successfully");
  dispatch(deleteSchedule(id));
}

const onSave=()=>{

  RNCalendarEvents.saveEvent(name, {
    location: 'Dandy Schedule',
    notes: name,
    startDate: date.toISOString(),
    endDate: date.toISOString(),
    alarms: [
      {
        date: date.toISOString(),
        method: 'alert',
      },
    ],
  }).then(id => {
    console.log('Successfully added', id);
  }).catch(error => {
    console.log('Failed to add', error);
  });
  if(name.length>0){
    dispatch(setSaveSchedule({id:Math.ceil(Math.random()*99999) ,name:name,time:`${timeExtract(date)}`,date:`${date.toLocaleDateString()}`}));
    setModalVisible(false);

  }
  else{
    Alert.alert("Alert","Please Enter Name");
  }
  setNotification()
}
const setNotification = () => {
  // Notifications.schduleNotification(date);
  Notifications.schduleNotification(date,name);
};

console.log("date",date);
console.log("new date",new Date(Date.now() + 5 * 1000))
const openModal=()=>{
  console.log("Button Clicked");
  setModalVisible(true);
}
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }
        }>
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
            {/*Modal close button */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              // backgroundColor: '#fff',
              padding: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Icon name="close" size={20} color="#000" />
          </TouchableOpacity>
            <Text style={styles.modalText}>Schedule Cleaning</Text>
            {show && <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          onChange={onChange}
        />}
          <View style={{flexDirection:"column",marginBottom:30}}>
            <TouchableOpacity
              // style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                showTimepicker(!modalVisible);
              }
              }>
              <Text style={styles.modalTime}>{timeExtract(date)}</Text>
            </TouchableOpacity>
          <TouchableOpacity
              // style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                showDatepicker(!modalVisible);
              }
              }>
              <Text style={styles.modalDate}>{date.getDate()+`/`+date.getMonth()+`/`+date.getFullYear()}</Text>
            </TouchableOpacity>
            </View>
            <TextInput
            placeholder='Enter Description'
            style={styles.textInput}
            onChangeText={onChangeName}
            />
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                onSave();
              }
              }>
              <Text style={styles.textStyle}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


        <ScrollView>
     {scheduleData.data.map(item => 
     <TouchableOpacity style={styles.card} onPress={() => console.log("Open Modal")}>
              {/* <Image style={styles.image} source={{uri: item.image}}/> */}
              <Text style={styles.image}>{item.time}</Text>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.count}>{item.date}</Text>
                {/* <TouchableOpacity style={styles.followButton} onPress={()=> console.log("Inner Button")}> */}
                  {/* <Text style={styles.followButtonText}> Repeat </Text>   */}
                {/* </TouchableOpacity> */}
              </View>
              <View style={{alignSelf:"center", marginLeft:20, justifyContent:"space-around"}}>
             {/* Delete button */}
              <TouchableOpacity
                style={{
                 flexDirection:'row-reverse',
                //  position:'relative',
                  top: 0,
                  right: 0,
                  backgroundColor: '#fff',
                  // padding: 10,
                  borderRadius: 5,
                  // marginVertical: 5,
                }}
                onPress={() => {
                  onDelete(item);
                }}>
                <Icon name="delete" size={20} color="#000" />
              </TouchableOpacity>

              </View>
            </TouchableOpacity>)}
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => openModal()}>
            <Icon name="pluscircle" size={50} color="#000" style={styles.plus} />
            </TouchableOpacity>
    </View>
  )
}

export default CleanAlert

const styles = StyleSheet.create({
    container:{
      flex:1,
      // marginTop:20,
      backgroundColor:"#ebf0f7"
    },
    contentList:{
      flex:1,
    },
    cardContent: {
      marginLeft:20,
      marginTop:10
    },
    image:{
     fontSize:30,
        // marginTop:20,
        marginLeft:20,
        color:"#000",
        fontWeight:"bold",
        FontFace: "sans-serif-condensed",
        textAlignVertical: "center",
    },
  
    card:{
      shadowColor: '#00000021',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
  
      marginLeft: 20,
      marginRight: 20,
      marginTop:20,
      backgroundColor:"white",
      padding: 10,
      flexDirection:'row',
      borderRadius:30,
    },
  
    name:{
      fontSize:18,
      flex:1,
      alignSelf:'center',
      color:"#3399ff",
      fontWeight:'bold',
      width:80,
    },
    count:{
      fontSize:14,
      flex:1,
      alignSelf:'center',
      color:"#6666ff"
    },
    followButton: {
      marginTop:10,
      height:35,
      width:100,
      padding:10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: "white",
      borderWidth:1,
      borderColor:"#dcdcdc",
    },
    followButtonText:{
      color: "#dcdcdc",
      fontSize:12,
    },
    plus:{
        position: 'absolute',
        right: 20,
        bottom: 20,
        color:"#2432AB",
        fontSize:70,
        fontWeight:"bold",
        FontFace: "sans-serif-condensed",
        textAlignVertical: "center",
    },

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // marginTop: 22,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontWeight: "700",
    },
    modalDate:
    {
      fontSize:20,
      color:"#000",
      fontWeight:"bold",
      FontFace: "sans-serif-condensed",
      textAlignVertical: "center",
    },
    modalTime:{
      fontSize:25,
      color:"#000",
      fontWeight:"bold",
      FontFace: "sans-serif-condensed",
      textAlignVertical: "center",
    },
textInput:{
  height:40,
  borderColor:"#56b3ff",
  borderWidth:1,
  marginTop:10,
  marginBottom:10,
  marginLeft:20,
  marginRight:20,
  borderRadius:10,
  paddingLeft:10,
  fontSize:15,
  // fontWeight:"bold",
  color:"#2196F3",
  FontFace: "sans-serif-condensed",
  textAlignVertical: "center",
}
  }); 
                           