import React, {useState, useEffect} from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SafeAreaView,
  StyleSheet,
  Text, View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
  Image,
  Touchable
} from 'react-native';

import Entry from '../components/Entry';
import MessageNavigator from '../components/MessagesNavigator';


export default function Home() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  const getData = async() => {
    const loadData = JSON.parse(await AsyncStorage.getItem('userData'));
    if (loadData != null) {
        setData(loadData);
    }
  }

  const clearData = async() => {
    console.log("deleted items")
    await AsyncStorage.setItem("userData", JSON.stringify([]));
    setData([])

    //console.log(JSON.parse(await AsyncStorage.getItem("userData", data)))
  }

  const createNewFile = async() => {
    await AsyncStorage.setItem("currentEntry", "new");
    navigation.navigate("Editor");
  }

  useEffect(() => {
    getData();
  }, [data])

  return (
    <SafeAreaView style={styles.appMargin}>
      <StatusBar
          barStyle={'dark-content'}
        />
      <View style={[styles.header]}>
        <Text style={[styles.headerText]}>TimelyText</Text>
        <TouchableOpacity
          onPress={createNewFile}
        >
          <Text style={[styles.headerAdd]}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.dateContainer]}>
        <TouchableOpacity
          onPress={clearData}
        >
          <Text style={styles.clearAll}>Delete all</Text>
        </TouchableOpacity>

      </View>
      <MessageNavigator
      />
      <ScrollView style={styles.entryContainer}>
        {data.length != 0 ?
        data.map((item, i) => (
        <View style={styles.entryStyle}>
          <Entry
          title={item.title}
          text={item.message}
          screenName="Editor"
          entryKey={i}
          time={item.time}
          />

        </View>
        ))
        :
        <View style={styles.noEntriesMsgContainer}>
            <Text style={styles.noEntriesMsg}>Press "+" to create a new message</Text>
        </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  addBorder: {
    borderWidth: 1,
  },
  appMargin: {

  },
  header: {
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 24,
    marginRight: 24,
  },
  headerText: {
    marginTop: 8,
    fontSize: 32,
    fontWeight: '600',
    borderBlockColor: '#000'
  },
  headerAdd: {
    fontSize: 40,
  },
  dateContainer: {
    paddingTop: 20,
    marginLeft: 24,
    marginRight: 24,
  },
  clearAll: {
    fontSize: 16,
    textAlign: 'right',

  },
  divideLine: {
    marginTop: 20,
    marginRight: 24,
  },
  entryContainer: {
    height: '80%',

  },
  noEntriesMsg: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 180,
    marginLeft: 24,
    marginRight: 24,
  },
  noEntriesMsgContainer: {
    borderColor: "#000000",
    borderTopWidth: "1",
  }
})
