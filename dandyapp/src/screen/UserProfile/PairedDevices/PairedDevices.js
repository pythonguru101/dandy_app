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
const calls = [
    { name: "Back Yard", status: "Complete", date: "05/06/2022" },
    { name: "Yard", status: "Complete", date: "05/06/2022" },
    { name: "Garden", status: "Complete", date: "05/06/2022" },
    { name: "Roof", status: "Complete", date: "05/06/2022" },
    { name: "Roof", status: "Incomplete", date: "05/06/2022" },
    { name: "Back Yard", status: "Complete", date: "05/06/2022" },
    { name: "Garden", status: "Incomplete", date: "05/06/2022" },
    { name: "Garden", status: "Complete", date: "05/06/2022" },
    { name: "Back Yard", status: "Complete", date: "05/06/2022" },
    { name: "Garden", status: "Incomplete", date: "05/06/2022" },
]
const CleaningHistory = () => {
    const dataRobots = useSelector(state => state.robot.robots)
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity>
                <View style={styles.row}>
                    <Image source={grasscutter} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.device.name}</Text>
                            <Text style={styles.mblTxt}>{item.device.connected_ssid}</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={item.device.status === "running" ? styles.msgTxt : styles.msgTxt2}>{item.device.status}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={{ flex: 1 }} >
            <FlatList
                data={dataRobots}
                keyExtractor={(item) => {
                    return item.id;
                }}
                renderItem={renderItem} />
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



