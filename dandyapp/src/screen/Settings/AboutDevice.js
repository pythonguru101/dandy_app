import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import { Card, ListItem, Text } from 'react-native-elements'

import robot from '../../assets/dandy.png'
import battery from '../../assets/battery.png'
import { useSelector } from 'react-redux'
import VersionInfo from 'react-native-version-info';
const Topcomp = () => {
    const device = useSelector(state => state.robot.robots[0].data.device)
    console.log(device)
    return (
        <View style={{ flexDirection: "row", marginBottom: 20 }}>

            <Card containerStyle={styles.card1Container}>
                <Card.Title>Dandy App</Card.Title>
                <Card.Image source={robot} style={styles.card1image}>
                </Card.Image>
                <Text style={styles.card1ContainerText}>
                    Version :{VersionInfo.appVersion}
                </Text>
            </Card>
            <View >
                <Card>
                    <Card.Title>Device Name</Card.Title>
                    <Text style={{ marginBottom: 10 }}>
                        {device.name}
                    </Text>
                </Card>
                <Card containerStyle={{ height: 130 }}>
                    <Card.Title>Battery Health</Card.Title>
                    <Card.Image source={battery} style={styles.card2image}>
                    </Card.Image>


                    <Text style={{ marginBottom: 10, }}>
                        {device.battery_level}
                    </Text>


                </Card>
            </View>

        </View>
    )
}

const AboutDevice = () => {
    const device = useSelector(state => state.robot.robots[0].data.device)
    const devices = useSelector(state => state.robot.robots)

    if (devices.lenght === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No Device Connected</Text>
            </View>
        )
    }
    else {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>About Device</Text>
                <Topcomp />

                <ListItem
                    onPress={() => { }}
                >
                    <ListItem.Content>
                        <ListItem.Title>Serial No</ListItem.Title>
                        <ListItem.Subtitle>{device.serial_number}</ListItem.Subtitle>
                    </ListItem.Content>

                </ListItem>
                <ListItem
                    onPress={() => { }}
                >
                    <ListItem.Content>
                        <ListItem.Title>Device ID</ListItem.Title>
                        <ListItem.Subtitle>{device.id}</ListItem.Subtitle>
                    </ListItem.Content>

                </ListItem>
                <ListItem
                    onPress={() => { }}
                >
                    <ListItem.Content>
                        <ListItem.Title>Status</ListItem.Title>
                        <ListItem.Subtitle>{device.status}</ListItem.Subtitle>
                    </ListItem.Content>

                </ListItem>
                <ListItem
                    onPress={() => { }}
                >
                    <ListItem.Content>
                        <ListItem.Title>Storage Level</ListItem.Title>
                        <ListItem.Subtitle>{device.storage_level}</ListItem.Subtitle>
                    </ListItem.Content>

                </ListItem>
                <ListItem
                    onPress={() => { }}
                >
                    <ListItem.Content>
                        <ListItem.Title>Type</ListItem.Title>
                        <ListItem.Subtitle>{device.type}</ListItem.Subtitle>
                    </ListItem.Content>

                </ListItem>


            </ScrollView >

        )
    }
}

export default AboutDevice

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    card1image: {
        height: 100,
        width: 100
    },
    card2image: {
        height: 50,
        width: 50
    },
    card1Container: {
        // flexDirection: "row",
        // justifyContent: "space-between",
        width: 180,
        height: 220,
        // alignItems: "center"
    },
    card1ContainerText: {
        margin: 10,
        fontSize: 14,
        fontWeight: "bold"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 10,
        marginTop: 20

    }


})