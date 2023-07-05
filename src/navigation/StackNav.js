import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {FIREBASE_AUTH} from '../../firebaseConfig'
import {onAuthStateChanged} from 'firebase/auth'
// screens
import Splash from '../screens/Splash';
import Welcome from '../screens/Welcome'
import Login from '../screens/Login';
import Register from '../screens/Register';
import Todos from '../screens/Todos';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const [logged, setLogged] = useState('');
  //console.log(logged);

  // check if the user is already logged in or not
  const checkUserIsLoggedIn = async () => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        const uid = user.uid;
        console.log('User logged in')
        setLogged(uid)
      } else {
        // user logged out
        console.log('User logged out')
      }
    })
  }

  useEffect(() => {
    checkUserIsLoggedIn()
  })

  return (
    <NavigationContainer>
    <Stack.Navigator>
      {
        logged ? (
          <>
          <Stack.Screen name="Todos" component={Todos} options={{headerShown:false}}/>
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/>
            <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
          </>
        )
      }
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default StackNav