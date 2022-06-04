import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Dandy from '../../assets/dandy.png'
const ProfileCard = ({ name, count, buttonText, onTap, onWHoleTap,status }) => {

    return (
        <View>
            <View style={styles.card} onPress={onWHoleTap}>
                <Image style={styles.image} source={Dandy} />
                <View style={styles.cardContent}>
                    <Text style={styles.name}>Total Hours of Cleaning : 200 Hours </Text>
                    <Text style={styles.name}>Total Area of Cleaning : 200 Meters </Text>
                    <Text style={styles.name}>Paired Devices : 2 </Text>

                    {count && <Text style={styles.count}>Battery:{count}%</Text>}
                    {/* <TouchableOpacity style={styles.disconnectButton} onPress={onTap}>
                        <Text style={styles.followButtonText}>{buttonText}</Text>
                    </TouchableOpacity> */}

                </View>

            </View>
        </View>
    )
}

export default ProfileCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "#ebf0f7"
    },
    contentList: {
        flex: 1,
    },
    cardContent: {
        marginLeft: 20,
        marginTop: 10
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#ebf0f7"
    },

    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        backgroundColor: "white",
        padding: 10,
        flexDirection: 'row',
        borderRadius: 30,
    },

    name: {
        fontSize: 14,
        // flex: 1,
        // alignSelf: 'center',
        color: "#000",
        fontWeight: 'bold',
        marginBottom: 5
    },
    count: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "#6666ff"
    },
    disconnectButton: {
        height: 35,
        width: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#dcdcdc",
    },
    followButtonText: {
        color: "#000",
        fontSize: 12,
    },
    online:{
        fontSize: 12,
        color:"green",
    },
    offline:{
        fontSize: 12,
        color:"red",
    }
})
