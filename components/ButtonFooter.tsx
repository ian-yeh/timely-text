import React, {useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Share} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


type messageProps = {
    message: string,
    index: number,
};

export default function ButtonFooter(props: messageProps) {
    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              props.message,
          });

          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              console.log("result.activityType")
            } else {
              console.log("shared")
            }
          } else if (result.action === Share.dismissedAction) {
            console.log("dismissed");
          }

        } catch (error: any) {
          Alert.alert(error.message);
        }
      };

    const onDelete = async () => {
        const userData = JSON.parse(await AsyncStorage.getItem("userData"));

        userData.splice(props.index, 1);

        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        console.log(userData);
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={onShare}>
                <Ionicons
                    name="share-outline"
                    style={styles.shareButton}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onDelete}
            >
                <Ionicons
                    name="trash-outline"
                    style={styles.shareButton}
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    shareButton: {
        fontSize: 28,
    },
    container: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 8,
    },
})