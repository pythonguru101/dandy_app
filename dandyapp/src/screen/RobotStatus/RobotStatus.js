import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import clipper from '../../assets/clipper.png'
import wheel from '../../assets/wheel.png'
import sensor from '../../assets/sensor.png'
import motor from '../../assets/motor.png'
import { useSelector, useDispatch } from 'react-redux'
import { getRobotData } from '../../redux/Actions/index'

const RobotStatus = () => {
    const [status, setStatus] = useState("")
    const dispatch = useDispatch()
    const robotData = useSelector(state => state.robot.currentDevice.malfunction)
    const serialNo = useSelector(state => state.connection.serialNo)

    useEffect(() => {
        dispatch(getRobotData(serialNo))
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.row}>
                <Image source={wheel} style={styles.pic} />
                <View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">Wheel 1</Text>
                        {/* <Text style={styles.mblTxt}>{item.date}</Text> */}
                    </View>
                    <View style={styles.msgContainer}>
                        <Text style={robotData?.wheel_1 ? styles.msgTxt : styles.msgTxt2}>{robotData?.wheel_1 ? "Active" : "Inactive"}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <Image source={wheel} style={styles.pic} />
                <View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">Wheel 2</Text>
                        {/* <Text style={styles.mblTxt}>{item.date}</Text> */}
                    </View>
                    <View style={styles.msgContainer}>
                        <Text style={robotData?.wheel_2 ? styles.msgTxt : styles.msgTxt2}>{robotData?.wheel_2 ? "Active" : "Inactive"}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <Image source={wheel} style={styles.pic} />
                <View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">Wheel 3</Text>
                        {/* <Text style={styles.mblTxt}>{item.date}</Text> */}
                    </View>
                    <View style={styles.msgContainer}>
                        <Text style={robotData?.wheel_3 ? styles.msgTxt : styles.msgTxt2}>{robotData?.wheel_3 ? "Active" : "Inactive"}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <Image source={wheel} style={styles.pic} />
                <View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">Wheel 4</Text>
                        {/* <Text style={styles.mblTxt}>{item.date}</Text> */}
                    </View>
                    <View style={styles.msgContainer}>
                        <Text style={robotData?.wheel_4 ? styles.msgTxt : styles.msgTxt2}>{robotData?.wheel_4 ? "Active" : "Inactive"}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <Image source={sensor} style={styles.pic} />
                <View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">Sensor</Text>
                        {/* <Text style={styles.mblTxt}>{item.date}</Text> */}
                    </View>
                    <View style={styles.msgContainer}>
                        <Text style={robotData?.motor ? styles.msgTxt : styles.msgTxt2}>{robotData?.sensor ? "Active" : "Inactive"}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <Image source={motor} style={styles.pic} />
                <View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">Motor</Text>
                        {/* <Text style={styles.mblTxt}>{item.date}</Text> */}
                    </View>
                    <View style={styles.msgContainer}>
                        <Text style={robotData?.sensor ? styles.msgTxt : styles.msgTxt2}>{robotData?.motor ? "Active" : "Inactive"}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <Image source={clipper} style={styles.pic} />
                <View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">Clipper</Text>
                        {/* <Text style={styles.mblTxt}>{item.date}</Text> */}
                    </View>
                    <View style={styles.msgContainer}>
                        <Text style={robotData?.clipper ? styles.msgTxt : styles.msgTxt2}>{robotData?.clipper ? "Active" : "Inactive"}</Text>
                    </View>
                </View>
            </View>

        </View>
    )
}

export default RobotStatus
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
