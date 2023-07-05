import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import {FIREBASE_AUTH} from '../../firebaseConfig'
import {signInWithEmailAndPassword} from 'firebase/auth'


const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // firebase Login with email and password
  const loginUser = () => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password).then((userCredential) => {
      // signed in 
      const user = userCredential.user;
      console.log(user.email)
      // if both email and password matches, navigate to Todos Page
      // if(email === user.email || password === user.password){
      //   navigation.navigate('Todos');
      // }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      Alert.alert('Please enter a valid email and password. If you are a new user please Sign Up first.')
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Please Login</Text>
        <TextInput 
          label="Your Email" 
          autoCapitalize='none'
          value={email} 
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput} 
        />
        <TextInput 
          label="Your Password" 
          autoCapitalize='none'
          secureTextEntry
          value={password} 
          onChangeText={(text) => setPassword(text)}
          style={styles.textInput} 
        />
        <Button style={[styles.btn, styles.login]} mode="contained" onPress={loginUser}>
          <Text style={styles.btnText}>Login</Text>
        </Button>
        <Button style={[styles.btn, styles.register]} mode="contained" onPress={() => navigation.navigate("Register")}>
          <Text style={styles.btnText}>New User? Sign Up</Text>
        </Button>
        <Button icon="google" style={[styles.btn, styles.googleLogin]} mode="contained" onPress={{}}>
          <Text style={styles.btnText}>Login With Google</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 15,
    },
    loginContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        padding: 20,
    },
    textInput:{
      width: '90%',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: 'blue',
      marginVertical: 10,
    },
    btn:{
      width: '90%',
      padding: '3%',
      borderRadius: 0,
      marginVertical: 10,
    },
    btnText:{
      color:'#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    login:{
      backgroundColor: 'green',
    },
    register:{
      backgroundColor: 'blue',
    },
    googleLogin:{
      backgroundColor: 'grey'
    },
})