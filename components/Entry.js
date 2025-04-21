import React, {PropsWithChildren, useState} from 'react';
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Dimensions
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import ButtonFooter from './ButtonFooter';

function Entry(props) {
  const navigation = useNavigation();

  const [selected, setSelected] = useState(false);

  // for storing entry key of message
  const storeEntryKey = async() => {
    await AsyncStorage.setItem("currentEntry", JSON.stringify(props.entryKey));
    console.log(JSON.parse(await AsyncStorage.getItem("currentEntry")))
  };

    // getting data
  const getItem = async () => {
    const value = JSON.parse(await AsyncStorage.getItem("currentEntry"));
    console.log("\n\nENTRY.js:", value);
  };

  const toEdit = () => {
    storeEntryKey();
    getItem()
    navigation.navigate("Editor");
  };

  return (
    <View style={props.entryKey != 0 ? styles.containerSucceeding: styles.containerFirst}>
        <View style={styles.headerContent}>
            <View style={[styles.data]}>
                <TouchableOpacity onPress={toEdit}>
                    <View style={[styles.entryTitle]}>
                        <Text type="defaultSemiBold" style={styles.headingText}>{props.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.date}>{props.time}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[styles.dropDownContainer]}>
                <TouchableOpacity
                    onPress={() => setSelected((value) => !value)}
                    activeOpacity={0.8}
                >
                    <Ionicons
                        name={selected ? "chevron-up-outline" : "chevron-down-outline"}
                        style={styles.dropDown}
                    />
                </TouchableOpacity>
            </View>
        </View>

        {selected &&
        <View style={styles.dropDownContent}>
            <Text style={styles.contentText}>{props.text}</Text>
            <ButtonFooter
                message={props.text}
                index={props.entryKey}
            />
            <Ionicons></Ionicons>
        </View>
        }

    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    addBorder: {
        borderWidth: 1
    },
    containerFirst: {
      borderColor: "#79787a",
      borderTopWidth: '1.2',
      borderBottomWidth: '1.2',
      width: windowWidth,
    },
    containerSucceeding: {
        marginTop: 0.1,
        borderColor: "#79787a",
        borderBottomWidth: '1.2',
        width: windowWidth,
      },
    headingText: {
      fontSize: 20,
      fontWeight: '400',
    },
    entryTitle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 24,
      marginRight: 24,
      marginTop: 12,
    },
    date: {
      fontSize: 16,
      color: "#6f7370",
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 12,
    },
    dropDownContent: {
      marginTop: 8,
      marginLeft: 24,
      marginRight: 24,
    },
    contentText: {
      fontSize: 16,
    },
    dropDown: {
        fontSize: 32,
    },
    dropDownContainer: {
        width: windowWidth*0.25,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    data: {
        width: windowWidth*0.75,
    },
    headerContent: {
        flexDirection: 'row'
    }
})

export default Entry;