import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HomePage = ({}) => {

  const {navigate}:any =useNavigation();

  const [token,setToken]=useState<string|null>("");

  const getToken=async()=>{
      let getToken:any=await AsyncStorage.getItem("user");
      // console.log("Token: " + getToken)
      getToken=JSON.parse(getToken);
      setToken(getToken);
  }

  useEffect(()=>{
      getToken();
  },[])

  return (
    <View>
      <Text>HomePage</Text>
      <TouchableOpacity onPress={async()=>{
       await AsyncStorage.removeItem("user");
        setToken(null);
        navigate('SignIn');
      }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({})