import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2c041',

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
        width: "90%",
        // height: "30%",

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
        fontSize: 20,
        fontWeight: "bold",
        color: "#2196F3"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 200,
        alignSelf: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#f2c041',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },

})

export default styles