import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import {Input} from 'react-native-elements'
import serial from '../../assets/serial.png'
import { useDispatch,useSelector } from 'react-redux';
import {currentConnection} from '../../redux/Actions/index'
import {Formik} from 'formik'
const EditSerial = () => {
    const serialNo= useSelector(state => state.connection.serialNo)
    const dispatch = useDispatch();
    const [serialno,setSerial] = useState(serialNo)

    const updateSerial = () => {
        dispatch(currentConnection("dandy_robot_"+serialno,serialno))
    }

    const handleChange = (text) => {
        setSerial(text)
    }
   
  return (
    <View style={styles.container}>
        <Image style={styles.icon} source={serial} />
        <Text style={styles.title}>Your Current Serial No is: {serialNo}</Text>
        
        <Input
            placeholder='Enter New Serial No'
            defaultValue={serialNo}
            leftIcon={{ type: 'font-awesome', name: 'hashtag' }}
            leftIconContainerStyle={{ marginLeft: 10 }}
            containerStyle={{ marginTop: 10 }}
            inputContainerStyle={{ borderColor: '#DCDCDC', borderWidth: 1, borderRadius: 5 }}
            inputStyle={{ color: '#000' }}
            onChangeText={(text) => handleChange(text)}
            keyboardType='numeric'
        />
        <TouchableOpacity style={[styles.buttonContainer, styles.saveButton]}
        onPress={() => updateSerial()}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
  )
}

export default EditSerial

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EEEEEE',
      alignItems: 'center',
      paddingTop:50,
    },
    icon:{
      width:120,
      height:120,
    },
    title:{
      fontSize:20,
      textAlign: 'center',
      marginTop:22,
      color: "#5F6D7A"
    },

    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    saveButton: {
      backgroundColor: "#3498db",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize:20,
    }
  });