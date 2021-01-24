import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, Vibration, View } from 'react-native';
import {Entypo} from '@expo/vector-icons'
let darkMode=false

export default function App() {
  const [darkmode,setdarkmode]= useState(false)
  const [currentnumber,setcurrentnumber]=useState('')
  const [lastnumber,setlastnumber]= useState('')
  const buttons=['C','DEL','/', 7, 8, 9,'*', 4, 5, 6,'-', 1, 2, 3,'+', 0,'.','=']
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    result:{
      backgroundColor: darkmode? '#414853' : '#fff',
      maxWidth : '100%',
      minHeight : '35%',
      alignItems:'flex-end',
      justifyContent: 'flex-end'
    },
    themebutton:
    {
      alignSelf:'flex-start',
      bottom: '5%',
      margin: 15,
      backgroundColor: darkmode? '#7b8084':'#e5e5e5',
      alignItems : 'center',
      justifyContent:'center',
      width:50,
      height:50,
      borderRadius:25
  
      
    },
    historyText:
    {
        color: darkmode? '#B5B7BB' : '#7c7c7c',
        fontSize:20,
        marginRight:10,
        alignSelf: 'flex-end'
        
    },
    buttons:
    {
      width:'100%',
      height:'35%',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    button:
    {
      borderColor: darkmode ? '#3f4d5b' : '#e5e5e5',
      alignItems:'center',
      justifyContent:'center',
      minWidth:'24%',
      minHeight:'54%',
      flex:2
    },
    textButton:
    {
      color: darkmode? '#b5b7bb': '#7c7c7c',
      fontSize:28
    },
    resultText:
    {
      maxHeight:45,
      color:'#00b9d6',
      margin:15,
      fontSize:35
    }
  });
 const caculator=()=>
  {  
     let lastArray=currentnumber[currentnumber.length-1]
     if(lastArray==='/'||lastArray==='+'||lastArray==='-'||lastArray==='*'||lastArray==='.')
       { setcurrentnumber(currentnumber)
        return
       }
      else
      {
        let result=eval(currentnumber).toString()
        setcurrentnumber(result)
        return
      }
  }
  const handleInput=(buttonPressed)=>
  {
    if(buttonPressed==='+'||buttonPressed==='-'||buttonPressed==='*'||buttonPressed==='/')
    {
      Vibration.vibrate(35)
      setcurrentnumber(currentnumber+buttonPressed)
      return
    }
    else
    if(buttonPressed===0||buttonPressed===1||buttonPressed===2||buttonPressed===3||buttonPressed===4||buttonPressed===5||buttonPressed===6||buttonPressed===7||buttonPressed===8||buttonPressed===9||buttonPressed==='.')
    {
        Vibration.vibrate(35)
    }
    switch(buttonPressed)
    {
      case 'DEL':
        {
          Vibration.vibrate(35)
          setcurrentnumber(currentnumber.substring(0,currentnumber.length-1))
          return
        }
      case'C':
      {
      Vibration.vibrate(35)
      setcurrentnumber('')
      setlastnumber('')
      return
      }
      case '=':
        Vibration.vibrate(35)
        setlastnumber(currentnumber+"=")
        caculator()
        return

    }
    setcurrentnumber(currentnumber+buttonPressed)
  }
  return (
    <View >
      <View style={styles.result}>
        <TouchableOpacity style={styles.themebutton}>
          <Entypo name={darkmode ? 'light-up':'moon'} size={24} color={darkmode ? 'white':'black'} onPress={()=>
          {
            darkmode ? setdarkmode(false): setdarkmode(true)
           
          }}/>
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastnumber}</Text>
        <Text style={styles.resultText}>{currentnumber}</Text>
      </View>
      <View style={styles.buttons}>
      
        {buttons.map((button)=>
         button=== '/'|| button=== '*'|| button=== '-'|| button=== '+' ? <TouchableOpacity key={button} onPress={()=>handleInput(button)} style={[styles.button,{backgroundColor:'#00b9d6'}]}>
        <Text style={[styles.textButton,{color:'white',fontSize:28}]}>{button}</Text>
      </TouchableOpacity>
      :
      button==='.'||button==='DEL' ? 
      <TouchableOpacity key={button} onPress={()=>handleInput(button)} style={[styles.button,{backgroundColor:button==='.'? darkmode? '#303946': '#fff' : darkmode===true? '#414853':'#ededed',minWidth:'37%'}]}>
        <Text style={styles.textButton}>{button}</Text>
      </TouchableOpacity>
    :
    button==='C' ? 
    <TouchableOpacity key={button} onPress={()=>handleInput(button)} style={[styles.button,{backgroundColor:typeof(button)==='number'? darkmode? '#303946':'#fff':darkmode===true?'#414853': '#ededed',minWidth:'36%'}]}>
      <Text style={styles.textButton}>{button}</Text>
    </TouchableOpacity>
    :button=='='?
    <TouchableOpacity key={button} onPress={()=>handleInput(button)} style={[styles.button,{backgroundColor:'#00b9d6', minWidth:'18%'}]}>
    <Text style={[styles.textButton,{color:'white',fontSize:28}]}>{button}</Text>
  </TouchableOpacity>
    :
    <TouchableOpacity key={button} onPress={()=>handleInput(button)} style={[styles.button,{backgroundColor: typeof(button)==='number'? darkmode? '#303946':'#fff':darkmode===true?'#414853': '#ededed',minWidth:'24%'}]}>
      <Text style={styles.textButton}>{button}</Text>
    </TouchableOpacity>
         
          
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}


