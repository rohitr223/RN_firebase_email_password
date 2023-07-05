import React from 'react'
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'


const Welcome = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})