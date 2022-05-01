import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2c041',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    buttonStyle: {
        width: 150,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    textInputStyle: {
        width: 150,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderColor: '#000',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        height: "30%"

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: "30%",
    },
    buttonCancel: {
        backgroundColor: "#F194FF",


    },
    buttonConnect: {
        backgroundColor: "#2196F3",

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
        width: "100%",
        height: 200
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

})

export default styles