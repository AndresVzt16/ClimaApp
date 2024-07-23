/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useState, useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Formulario from './components/Formulario';
import Clima from './components/Clima';


const App = ()=>  {
  const [busqueda, setBusqueda] = useState({
    ciudad:'',
    pais:''
  });

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({})
  const [bgColor, setBgcolor] = useState("rgb(71,149,212)")

  const{ciudad, pais} = busqueda
  useEffect(() => {
    const consultaClima = async() => {
      if(consultar) {
        const apiKey = 'f6f33d02aa03d18dec34e5882f07e9aa'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
        console.log(busqueda)
        console.log(url)
        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          setConsultar(false)
          if(!respuesta.ok || resultado.cod === 404){
            throw new Error('Error en la solicitud al servidor')
          }
          setResultado(resultado);
          const kelvin = 273.15
          const {main} = resultado;
          const actual = main.temp - kelvin;

          if(actual < 10 ) {
            setBgcolor('rgb(105,108,149)')
          }else if( actual >= 10 && actual <= 20 ){
            setBgcolor('rgb(71,149,212)')
          }else{
            setBgcolor('rgb(178,28,61)')
          }
          
        } catch (error) {
          mostrarAlerta();
          return;
        }
        
      
      }
    }
    consultaClima()
  },[consultar])
  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'No se pudo encontrar el pais o la Ciudad seleccionada, intenta de nuevo',
      [{text:'Ok'}]
    );
  }

  const bgColorApp = {
    backgroundColor: bgColor
  }

  return (
   
    <View style={[styles.app, bgColorApp]}>
      <View style={styles.contenido}>
        <Clima resultado ={resultado} />
        <Formulario 
          busqueda={busqueda} 
          setBusqueda={setBusqueda} 
          setConsultar={setConsultar} 

          
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app:{
    flex:1,
    backgroundColor:"rgb(71,149,212)",
    justifyContent:"center",
    paddingHorizontal:"2.5%"
  }
});

export default App;
