import { StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
  ScrollView
  } from 'react-native'
  import React ,{useState,useEffect}from 'react'
  import {getRobotHistory} from '../../services/services'
  import {useNavigation} from '@react-navigation/native'
  import { useSelector } from 'react-redux'
  
  const HeatMapMenu = (props) => {
  const [data,setData] = useState([])
  const serialNo=useSelector(state=>state.connection.serialNo)
  const navigation = useNavigation();
  
  const filterby=props.route.params.map
  
  //download csv file and save it to device
    const downloadFile = async () => {
      const file = await getRobotHistory(serialNo)
      console.log(csvJSON(file.data))
      const datas= csvJSON(file.data)
      const filterdata=datas.filter(item=>
        {
            if(filterby==="is_weed")
            {
                return item.is_weed==="True"
            }
            if(filterby==="needs_fertilizer")
            {
                return item.needs_fertilizer==="True"
            }
            if(filterby==="needs_water")
            {
                return item.is_weed==="True"
            }
        }
        
        )
      setData(filterdata)

    }
  
    function csvJSON(csv){
      var lines=csv.split("\n");
      var result = [];
      var headers=lines[0].split(",");
    
      for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }
      return result; //JSON
    }
  
  
    useEffect(() => {
      downloadFile()
    }
    , [])
  
  
    return (
      <ScrollView style={styles.container}>
        <View
          style={styles.notificationList}
        >
          {data.length > 0 && data.map((item, index) =>
            <TouchableOpacity key={index} onPress={() => navigation.navigate('HeatMapAlt', { map: item })}>
              <View style={styles.notificationBox}>
                <Text style={styles.name}>{item.timestamp}</Text>
              </View>
            </TouchableOpacity>
          )}
  
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
  