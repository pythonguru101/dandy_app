import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
const Feedback = () => {
    return (
        <WebView source={{ uri: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }} />
    )
}

export default Feedback

const styles = StyleSheet.create({})