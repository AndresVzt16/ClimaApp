import React,{useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
const Formulario = ({busqueda, setBusqueda, setConsultar}) => {
    const{ pais, ciudad} = busqueda

    //animated solo requiere un valor de State y se le pasa la instancia de animated
    const [animacionBoton] = useState( new Animated.Value(1));
    const animacionEntrada = () => {
        //Para animar: Animated.-animacion-(objeto a animar,{config})
        Animated.spring(animacionBoton,{
            toValue: .9,
            useNativeDriver: true,
        }).start()
    }
    const mostrarAlerta = () => {
      Alert.alert(
        'Error',
        'Selecciona una ciudad y un pais',
        [{text:'Ok'}]
      );
    }
    const consultarClima =() => {
      if(pais.trim() === "" || ciudad.trim() ===""){
        mostrarAlerta()
        return;
      }
      setConsultar(true)
    }
    const animacionSalida = () => {
        Animated.spring(animacionBoton,{
            //to value: valor final
            toValue: 1,
            useNativeDriver: true,
            //friction: timepo de rebote
            friction:1,
            //tension: dureza de transicion 
            tension: 30
        }).start()
    }
    const estiloAnimations = {
        transform :[{ scale: animacionBoton}]
    }

  return (
    <>
      <View style={styles.form}>
        <View>
          <TextInput
            value= {ciudad}
            placeholder="Ciudad"
            placeholderTextColor="#777777"
            onChangeText={ ciudad => setBusqueda({...busqueda, ciudad})}
            style={styles.input}
          />
        </View>
        <View>
          <Icon name="rocket" size={30} color="#900" />
          <Picker 
            selectedValue={pais}
            onValueChange={(pais => setBusqueda({...busqueda, pais}))}
            >
            <Picker.Item label="-- Seleccione --" value="" />
            <Picker.Item label="Estados Unidos" value="US" />
            <Picker.Item label="Mexico" value="MX" />
            <Picker.Item label="Aegentina" value="AR" />
            <Picker.Item label="Colombia" value="CO" />
            <Picker.Item label="Costa Rica" value="CR" />
            <Picker.Item label="Ecuador" value="EC" />
            <Picker.Item label="Perú" value="PE" />
          </Picker>
        </View>
        <TouchableWithoutFeedback
            onPressIn={() => animacionEntrada()}
            onPressOut={() => animacionSalida()}
            onPress={() => consultarClima()}
        >
          <Animated.View style={[styles.btnBuscar, estiloAnimations]}
          >
            <Text style={styles.TextBuscar}>Buscar Clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#fff',
    marginVertical: 10,
    
  },
  btnBuscar: {
    marginVertical: 25,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  TextBuscar: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Formulario;
