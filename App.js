import React from 'react';
import {Alert} from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";


export default class extends React.Component {
  setState = {
    isLoading: true
  };

  getLocation = async()=>{
    try {
      await Location.requestPermissionsAsync();
      const {
        coords:{latitude, longitude}
      } = await Location.getCurrentPositionAsync();
      this.setState({ isLoading : false});
      // Send to Api and get weather
    } catch (error) {
      // 사용자가 허용하지 않는다면
      Alert.alert("can't find you.","so sad");
    }
    
  }
  componetDitMount(){
    this.getLocation();
  }
  render(){
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}
