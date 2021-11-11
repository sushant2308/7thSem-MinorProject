import React, {useState,useEffect} from 'react';
import axios from 'axios'
import {StyleSheet, Text, View} from 'react-native';
function Readings({ route, navigation }) {
    const name=route.params.id
    const [vinr,setvinr] =useState(0)
    const [viny,setviny] =useState(0)
    const [vinb,setvinb] =useState(0)
    const [voutr,setvoutr] =useState(0)
    const [vouty,setvouty] =useState(0)
    const [voutb,setvoutb] =useState(0)
    const [iinr,setiinr] =useState(0)
    const [iiny,setiiny] =useState(0)
    const [iinb,setiinb] =useState(0)
    useEffect(() => {
        axios.get(`http://192.168.0.105:80/api/get_readings/${name}/`).then(res=>{
            setiinb(res.data.readings[res.data.readings.length-1].current_b_in)
            setiinr(res.data.readings[res.data.readings.length-1].current_r_in)
            setiiny(res.data.readings[res.data.readings.length-1].current_y_in)
            setvinb(res.data.readings[res.data.readings.length-1].voltage_b_in)
            setvinr(res.data.readings[res.data.readings.length-1].voltage_r_in)
            setviny(res.data.readings[res.data.readings.length-1].voltage_y_in)
            setvoutb(res.data.readings[res.data.readings.length-1].voltage_b_out)
            setvouty(res.data.readings[res.data.readings.length-1].voltage_y_out)
            setvoutr(res.data.readings[res.data.readings.length-1].voltage_r_out)
          })
    }, [name])
    return (
        <View style={styles.container}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Here You will see readings of device</Text>
          <Text style={styles.sectionTitle}>{name}</Text>
          <Text style={styles.sectionTitle}>voltage_r_in : {vinr}</Text>
          <Text style={styles.sectionTitle}>voltage_y_in : {viny}</Text>
          <Text style={styles.sectionTitle}>voltage_b_in : {vinb}</Text>
          <Text style={styles.sectionTitle}>current_r_in : {iinr}</Text>
          <Text style={styles.sectionTitle}>current_y_in : {iiny}</Text>
          <Text style={styles.sectionTitle}>current_b_in : {iinb}</Text>
          <Text style={styles.sectionTitle}>voltage_b_out : {voutb}</Text>
          <Text style={styles.sectionTitle}>voltage_r_out : {voutr}</Text>
          <Text style={styles.sectionTitle}>voltage_y_out : {vouty}</Text>

        </View>
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    items: {
      marginTop: 30,
    },
    writeTaskWrapper: {
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
    addText: {},
  });

  export default Readings