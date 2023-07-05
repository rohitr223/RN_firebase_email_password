import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput, Button } from 'react-native-paper';
import {FIREBASE_AUTH} from '../../firebaseConfig'
import {signOut} from 'firebase/auth'

const Todos = ({navigation}) => {

    const [task, setTask] = useState('')

    const logout = () => {
        signOut(FIREBASE_AUTH).then(() => {
            navigation.navigate('Welcome')
            console.log('Logout successful')
        }).catch((error) => {
            console.log(error.message)
        });
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.userInfo}>
            <Text style={styles.welcomeText}>Welcome User!</Text>
            <Button mode="contained" onPress={logout}>
                <Text>Logout</Text>
            </Button>
        </View>
        <View style={styles.inputContainer}>
            <TextInput 
                mode="outlined"
                label="Enter Your Task"
                outlineColor="purple"
                activeOutlineColor="purple"
                onChangeText={(text) => setTask(text)} 
                style={styles.textInput}
            />
            <Button mode="contained" style={styles.taskButton} onPress={{}}>
                <Text style={styles.btnText}>+</Text>
            </Button>
        </View>
        <View style={styles.taskContainer}>
            <Text>Todo Task: {task}</Text>
        </View>
    </SafeAreaView>
  )
}

export default Todos

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
    },
    userInfo:{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    welcomeText:{
        fontSize: 18,
        fontWeight: '600',
    },
    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    textInput:{
        flex: 1,
        // borderWidth: 1,
        // borderColor: '#242424',
        marginRight: 10,
        borderRadius: 5,
    },
    taskButton:{
        backgroundColor: 'purple',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText:{
        color: '#fff',
        fontSize: 19,
        fontWeight: 'bold',
        paddingVertical: 4,
    },
    taskContainer:{
        backgroundColor: '#eee',
        alignSelf: 'center',
        width: '95%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 5,
    }
})