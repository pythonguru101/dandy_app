import { StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
  ScrollView
  } from 'react-native'
  import React from 'react'
  import {useNavigation} from '@react-navigation/native'

  
  const HeatMapMenu = () => {
  const navigation = useNavigation();
  
    return (
      <ScrollView style={styles.container}>
        <View
          style={styles.notificationList}
        >
          
            <TouchableOpacity  onPress={() => navigation.navigate('CustomHeatMap', { map: "is_weed" })}>
              <View style={styles.notificationBox}>
                <Text style={styles.name}>Weeds</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate('CustomHeatMap', { map: "needs_water" })}>
              <View style={styles.notificationBox}>
                <Text style={styles.name}>Need Water</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate('CustomHeatMap', { map: "needs_fertilizer" })}>
              <View style={styles.notificationBox}>
                <Text style={styles.name}>Need Fertilizer</Text>
              </View>
            </TouchableOpacity>
  
        </View>
      </ScrollView>
    )
  }
  
  export default HeatMapMenu
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EBEBEB',
    },
    formContent: {
      flexDirection: 'row',
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
      // marginTop:20,
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
      fontSize: 20,
      fontWeight: 'bold',
      color: "#000000",
      marginLeft: 10,
      alignSelf: 'center'
    },
  });
  