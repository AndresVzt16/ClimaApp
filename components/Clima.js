import {View, Text, StyleSheet,Image} from 'react-native';
import React from 'react';

const Clima = ({resultado}) => {

    const{main, name} = resultado
    const kelvin = 273-15
    if(!name) return null
  return (
    <View style ={styles.clima}>
      <Text style= {[styles.texto, styles.actual]}>{parseInt(main.temp - kelvin)}
        <Text style = {styles.temp}>&#x2103;</Text>
        <Image
          style={{width: 66, height: 58}}
          source={{uri: `https://openweathermap.org/img/w/${resultado.weather[0].icon}.png`}}
        />
      </Text>
      <View style={styles.temperaturas}>
        <Text style={styles.texto}>
          <Text>Min {parseInt(main.temp_min - kelvin)} &#x2103;</Text>
        </Text>
        <Text style={styles.texto}>
          <Text>Max {parseInt(main.temp_max - kelvin)} &#x2103;</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    clima:{

    },
    texto:{
        color:"#fff",
        fontSize:20,
        textAlign:"center"
    },
    actual:{
      textAlign:"center",
        fontSize:70,
        fontWeight:"300"
    },
    temp:{
      fontSize:25,
      fontWeight:"800"
    },
    temperaturas:{
      flexDirection:"row",
      justifyContent:"space-evenly",
    }
})
export default Clima;
