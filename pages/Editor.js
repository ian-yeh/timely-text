import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TextInput,
    ScrollView,
    Image,
    Dimensions,
    Alert
  } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Editor() {
    const [data, setData] = useState({
        title: "",
        message: "",
        time: ""
    })

    const [loadKey, setLoadKey] = useState();

    const navigation = useNavigation();

    const handleChange = (e) => {
        setData({
            ...data,
            [e._dispatchInstances.alternate.memoizedProps.name]: e.nativeEvent.text,
        });
    };

    // for asynchronous storage///
    const loadFile = async() => {
        try {
            const value = await AsyncStorage.getItem("currentEntry");

            setLoadKey(value);

            console.log("EDITOR.js loadKey: ", value)

            ///////////////////////
            const currentData = JSON.parse(await AsyncStorage.getItem("userData"));

            // load the previous data when old files want to be edited
            if (value != "new") {
                setData({
                    ...data,
                    title: currentData[value].title,
                    message: currentData[value].message,
                })
            } else {
                setData({
                    ...data,
                    title: "",
                    message: "",
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const createNewFile = async() => {
        try {
          console.log("created new file")

          const userData = await AsyncStorage.getItem("userData");

          const d = userData ? JSON.parse(userData) : [];
          d.push(data);
          await AsyncStorage.setItem("userData", JSON.stringify(d))
          .then(navigation.navigate("Home"));


        } catch (e) {
          console.log("error when saving data")
        }
      };

    const changeCurrentData = async() => {
        console.log("changed current data")
        // get list of userData
        // change the title and message for the selected index (loadKey)
        const getData = JSON.parse(await AsyncStorage.getItem("userData"))

        // changes value of title and message
        getData[loadKey].title = data.title;
        getData[loadKey].message = data.message;
        getData[loadKey].time = data.time;

        // resave the array
        await AsyncStorage.setItem("userData", JSON.stringify(getData))
        .then(navigation.navigate("Home"));
    };

    const getCurrentDate = () => {
        const today = new Date();
        hours = today.getHours();
        minutes = today.getMinutes();
        timePrefix = "AM";

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (hours > 12) {
            hours -= 12;
            timePrefix = "PM";
        } else if (hours == 0) {
            hours = 12;
        }
        data.time = hours + ":" + minutes + timePrefix;

        console.log(data.time)
    }

    const saveFile = () => {
        getCurrentDate();
        if (loadKey == "new") {
            createNewFile();
        } else if (loadKey != NaN) {
            changeCurrentData();
        }
        console.log("saveFile function has ran,", loadKey)
    };

    ////////////////////////////

    // on page load
    useFocusEffect(
        React.useCallback(() => {
            loadFile();
        }, [])
      )

    return (
        <SafeAreaView>
            <StatusBar barStyle='dark-content'/>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Home")}
                >
                    <Ionicons
                        name='arrow-back-outline'
                        style={styles.headerIcons}
                        size={28}
                        color={'white'}
                    />
                </TouchableOpacity>
                <TextInput
                    placeholder='Untitled message'
                    name="title"
                    onChange={handleChange}
                    style={styles.entryTitle}
                    value={data.title}
                    placeholderTextColor='#d7d9db'
                    maxLength={32}
                />
                <TouchableOpacity
                    onPress={saveFile}
                >
                    <Ionicons
                        name='checkmark-outline'
                        style={styles.headerIcons}
                        size={28}
                        color={'white'}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <TextInput
                    placeholder='Start writing...'
                    name="message"
                    onChange={handleChange}
                    style={styles.bodyText}
                    multiline={true}
                    autoFocus
                    value={data.message}
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#000000',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    headerIcons: {
        marginTop: 15
    },
    entryTitle: {
        fontSize: 20,
        alignItems: 'center',
        color: 'white'
    },
    body: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        height: windowHeight*0.2,
    },
    bodyText: {
        fontSize: 20,
        borderBlockColor: 'white',
    },

})