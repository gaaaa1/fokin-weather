import React from 'react';
import {Alert} from "react-native";
import Loading from "./Loading";
import Weather from "./Weather";
import * as Location from "expo-location";
import axios from 'axios';

const API_KEY = "60a1c9025788afe5e7774a5e9a63f3ab";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async(latitude,longitude) => {
    const {
          data:{
              main : {temp},
              weather
              }
          } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);

    this.setState({isLoading:false, condition:weather[0].main,  temp});
  };
  
  getLocation = async()=>{
    try {

      await Location.requestPermissionsAsync();
      const {
        coords:{latitude, longitude}
      } = await Location.getCurrentPositionAsync();

      this.getWeather(latitude,longitude);
      // Send to Api and get weather
    } catch (error) {
      // 사용자가 허용하지 않는다면
      Alert.alert("can't find you.","so sad");
    }
    
  }
  componentDidMount(){
    this.getLocation();
  }
  render(){
    const { isLoading, temp, condition } = this.state;
    console.log("1" + isLoading);
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
  }
}
