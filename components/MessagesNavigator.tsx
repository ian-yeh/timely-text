import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MessageNavigator() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonUnselected}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonTextUnselected}>Messages</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSelected}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonTextSelected}>Pending</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1.2,
        borderColor: "#79787a",
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonUnselected: {
        borderWidth: 1.2,
        marginBottom: 0,
    },
    buttonSelected: {
        backgroundColor: "#000",
        borderWidth: 1.2,
        marginBottom: 0,
    },
    buttonContainer: {
        width: windowWidth/2,
        alignItems: 'center',
        justifyContent: 'center',
        height: 28,
    },
    buttonTextUnselected: {
        fontSize: 16,
    },
    buttonTextSelected: {
        color: '#FFF',
        fontSize: 16,
    },
});