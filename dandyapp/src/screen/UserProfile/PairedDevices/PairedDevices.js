import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
} from 'react-native';
import grasscutter from '../../../assets/cutting.png'
import { useSelector } from 'react-redux';

const CleaningHistory = () => {
    const dataRobots = useSelector(state => state.robot.robots)
    

  console.log("robots",dataRobots)
    return (
        <View style={{ flex: 1 }} >
            {
                dataRobots.map((item, index) =>
                    <TouchableOpacity key={index}>
                        <View style={styles.row}>
                            <Image source={grasscutter} style={styles.pic} />
                            <View>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.data.device.name}</Text>
                                    <Text style={styles.mblTxt}>{item.data.device.connected_ssid}</Text>
                                </View>
                                <View style={styles.msgContainer}>
                                    <Text style={item.data.device.status === "running" ? styles.msgTxt : styles.msgTxt2}>{item.data.device.status}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
        }
        </View>
    );
}

export default CleaningHistory

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
    },
    pic: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 18,
        width: 170,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 12,
        marginLeft: 15,
    },
    msgTxt2: {
        fontWeight: '400',
        color: '#d35400',
        fontSize: 12,
        marginLeft: 15,
    },
});



