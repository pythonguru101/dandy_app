import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Dandy from '../../assets/dandy.png'
import ProfileCard from '../../components/ProfileCard/Card'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
const data = [
  { id: 1, description: "Saved Maps", route: "SavedMaps" },
  { id: 3, description: "Cleaning History", route: "CleaningHistory" },
  { id: 4, description: "Paired Devices", route: "PairedDevice" },
  { id: 5, description: "Robot History", route: "RobotHistory" },
]

const UserProfile = () => {
  const navigation = useNavigation()
  const deviceCount = useSelector(state => state.robot.robots)
  return (
    <View style={styles.container}>
      <ProfileCard
        hours={'10'}
        milage={'10'}
        count={deviceCount.length}
      />
      {data.map(item =>
        <TouchableOpacity key={item.id} style={styles.bubble} onPress={() => navigation.navigate(item.route)}>
          <View style={styles.notificationBox}>
            <Text style={styles.name}>{item.description}</Text>
          </View>
        </TouchableOpacity>)}
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center'
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },
  name: {
    fontSize: 18,
    // fontWeight: 'regular',
    color: "#000000",
    marginLeft: 30,
    //   alignSelf: 'center'
  },
  box: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2
  },
  box: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop: 10
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center'
  },
  iconFonts: {
    color: 'gray',
  },
  red: {
    color: '#FF4500',
  },
  imageTop: {
    width: 100,
    height: 100,
    marginTop: 30,
    marginLeft: 20,

  }
}); 