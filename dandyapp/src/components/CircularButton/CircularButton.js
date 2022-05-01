import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const CircularButton = ({ buttonText, onTap }) => {
    return (
        <View style={styles.buttonContainer} >
            <TouchableOpacity style={styles.card} onPress={() => onTap()}>
                <View >
                    <Text style={styles.textStyle}>{buttonText}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CircularButton

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",

    },
    button: {
        backgroundColor: "#f2c041",
        borderRadius: 100,
        borderColor: "#fff",
        borderWidth: 2,
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },

    card: {
        shadowColor: '#474747',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        marginVertical: 20,
        marginHorizontal: 40,
        backgroundColor: "#f2c041",
        //flexBasis: '42%',
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        color: 'grey',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    }

})

