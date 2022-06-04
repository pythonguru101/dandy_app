// import React,{useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ScrollView,
//   FlatList,
// } from 'react-native';
// import RNFS from 'react-native-fs';
// const data= [
//     {id:1, title: "Map 1",  date:"09/05/2022", image:"https://via.placeholder.com/400x200/FFB6C1/000000"},
//     {id:2, title: "Map 2",  date:"09/05/2022", image:"https://via.placeholder.com/400x200/87CEEB/000000"} ,
//     {id:9, title: "Map 10", date:"09/05/2022", image:"https://via.placeholder.com/400x200/FA8072/000000"},
//   ]

// const SavedMaps = () => {
// const [image, setImage] = React.useState(null);
// useEffect(()=>{
//      RNFS.readDir(RNFS.TemporaryDirectoryPath)
//     .then((result) => {
//               console.log('GOT RESULT', result);
//               return Promise.all([RNFS.stat(result[0].path), result[0].path]);
//       })
//       .then((statResult) => {
//           if (statResult[0].isFile()) {
//           return RNFS.readFile(statResult[1], 'utf8');
//         }
//       return 'no file';
//     })
//     .then((contents) => {
//       console.log("hhhhhhhhhhhhhhhhhhhhhhhhh",contents);
//       })
//       .catch((err) => {
//       console.log(err.message, err.code);
//       });
//     },[])

 
//   return (
//     <View style={styles.container}>
//     <FlatList style={styles.list}
//       contentContainerStyle={styles.listContainer}
//       data={data}
//       horizontal={false}
//       numColumns={2}
//       keyExtractor= {(item) => {
//         return item.id;
//       }}
//       ItemSeparatorComponent={() => {
//         return (
//           <View style={styles.separator}/>
//         )
//       }}
//       renderItem={(post) => {
//         const item = post.item;
//         return (
//           <View style={styles.card}>
//             <View style={styles.imageContainer}>
//               <Image style={styles.cardImage} source={{uri:image}}/>
//             </View>
//             <View style={styles.cardContent}>
//               <Text style={styles.title}>{item.title}</Text>
//               <Text style={styles.count}>{item.date}</Text>
//             </View>
//           </View>
//         )
//       }}/>
//   </View>
//   )
// }

// export default SavedMaps

// const styles = StyleSheet.create({
//     container:{
//       flex:1,
//       marginTop:20,
//     },
//     list: {
//       paddingHorizontal: 10,
//     },
//     listContainer:{
//       alignItems:'center'
//     },
//     separator: {
//       marginTop: 10,
//     },
//     /******** card **************/
//     card:{
//       marginVertical: 8,
//       backgroundColor:"white",
//       flexBasis: '45%',
//       marginHorizontal: 10,
//     },
//     cardContent: {
//       paddingVertical: 17,
//       justifyContent: 'space-between',
//     },
//     cardImage:{
//       flex: 1,
//       height: 150,
//       width: null,
//     },
//     imageContainer:{
//       shadowColor: "#000",
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.32,
//       shadowRadius: 5.46,
  
//       elevation: 9,
//     },
//     /******** card components **************/
//     title:{
//       fontSize:18,
//       flex:1,
//       color:"#778899"
//     },
//     count:{
//       fontSize:18,
//       flex:1,
//       color:"#B0C4DE"
//     },
//   }); 
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
 TouchableOpacity
} from 'react-native';
import mapIcon from '../../../assets/mapicon.png'
import { useSelector } from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const  data= [
  {id:1, icon:"https://bootdey.com/img/Content/avatar/avatar1.png", description: "No Data"},
]

const SavedMaps = () => {

const fencings= useSelector(state => state.fencing.data);
const navigation = useNavigation();
    return (
      <ScrollView style={styles.container}>
        <View 
          style={styles.notificationList}
          >
              {fencings.length>0 && fencings.map((item,index)=> 
              <TouchableOpacity onPress={()=>navigation.navigate('MapView',{map:item})}>
              <View style={styles.notificationBox}>
                <Image style={styles.image}
                  source={mapIcon}/>
                <Text style={styles.name}>Map {index+1}</Text>
                <Text style={styles.name}>{item.date}</Text>
              </View>
              </TouchableOpacity>
              )}
        
            </View>
      </ScrollView>
    );
}

export default SavedMaps
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent:{
    flexDirection: 'row',
    // marginTop:30,
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      height:45,
      flexDirection: 'row',
      alignItems:'center',
      flex:1,
      margin:10,
  },
  icon:{
    width:30,
    height:30,
  },
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  notificationList:{
    // marginTop:20,
    padding:10,
  },
  notificationBox: {
    paddingTop:10,
    paddingBottom:10,
    marginTop:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius:10,
  },
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  name:{
    fontSize:20,
    fontWeight: 'bold',
    color: "#000000",
    marginLeft:10,
    alignSelf: 'center'
  },
}); 
                       