import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Card = ({ name, count, buttonText, onTap, onWHoleTap }) => {

    return (
        <View>
            <TouchableOpacity style={styles.card} onPress={() => onWHoleTap}>
                <Image style={styles.image} source={{ uri: "https://img.icons8.com/stickers/100/000000/robot.png" }} />
                <View style={styles.cardContent}>
                    <Text style={styles.name}>{name}</Text>
                    {count && <Text style={styles.count}>Battery:{count}%</Text>}
                    <TouchableOpacity style={styles.disconnectButton} onPress={() => onTap}>
                        <Text style={styles.followButtonText}>{buttonText}</Text>
                    </TouchableOpacity>

                </View>

            </TouchableOpacity>
        </View>
    )
}

export default Card

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
        width: 90,
        height: 90,
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
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: "white",
        padding: 10,
        flexDirection: 'row',
        borderRadius: 30,
    },

    name: {
        fontSize: 15,
        flex: 1,
        alignSelf: 'center',
        color: "#3399ff",
        fontWeight: 'bold',
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
})