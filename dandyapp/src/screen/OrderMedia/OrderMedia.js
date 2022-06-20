import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';

const OrderMedia = () => {
    return (
        <WebView source={{ uri: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }} />
    )
}

export default OrderMedia

const styles = StyleSheet.create({})