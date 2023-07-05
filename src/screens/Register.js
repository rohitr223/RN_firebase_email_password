import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import {FIREBASE_AUTH} from '../../firebaseConfig'
import {createUserWithEmailAndPassword} from 'firebase/auth'

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // firebase SignUp with email and password for new user
  const signUp = () => {
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.email)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Please enter valid Email and Password.')
      }).finally(() => {
        //navigation.navigate('Todos');
        // if email and password both are created then only navigate to Todos screen
        if(email || password){
          navigation.navigate('Login');
        }
      });
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Create Your Account</Text>
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
        <Button style={[styles.btn, styles.login]} mode="contained" onPress={signUp}>
          <Text style={styles.btnText}>Sign Up</Text>
        </Button>
        <Button style={[styles.btn, styles.register]} mode="contained" onPress={() => navigation.navigate("Login")}>
          <Text style={styles.btnText}>Already an User? Login</Text>
        </Button>
        <Button icon="google" style={[styles.btn, styles.googleLogin]} mode="contained" onPress={() => navigation.navigate("Register")}>
          <Text style={styles.btnText}>Signup With Google</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default Register

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
      borderRadius: 1,
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