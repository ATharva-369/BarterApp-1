import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ToastAndroid, Alert, Modal,ScrollView } from 'react-native';
import db from './config'
import firebase from 'firebase'
// import SantaAnimation from '../components/SantaClaus';

export default class Login extends React.Component {
    constructor(){
        super();
        this.state={
        email:'',
        password:'',
        name:'',
        contact:'',
        address:'',
        confirmPassword:''
        }
    }

    login = async (e,p)=>{
        if(e&&p){
            try {
              const RESPONSE = await firebase.auth().signInWithEmailAndPassword(e,p)  
              if(RESPONSE){
                  Alert.alert("Successfully logged in");
              }
            } catch (error) {
                switch(error.code){
                    case 'auth/user-not-found': Alert.alert('User does not exist')
                    break;
                    case 'auth/invalid-email':Alert.alert('Invalid email')
                    break;
                }
            }
        }
        else{
            Alert.alert('Kindly enter email-address and password')
        }
    }
    signup = async (e,p)=>{


        
        firebase.auth().createUserWithEmailAndPassword(e,p).then((r)=>{
            db.collection('users').add({
                name:this.state.name,
                contact:this.state.contact,
                email:this.state.email,
                password:this.state.password
            })
            return Alert.alert("User Added Successfully");
        })
        .catch(function(error){
            var ec = error.code;
            var em = error.message;
            return Alert.alert(em);
        })
    }
    
   render(){
       return(
           <View style={{marginTop:100}}>
               <TextInput style={style.input} placeholder='Enter your email-address' keyboardType='email-address' onChangeText={(t)=>{
                   this.setState({
                       email:t
                   })
               }}/>
               <TextInput style={style.input} placeholder='Enter your password' keyboardType='default' secureTextEntry={true} onChangeText={(t)=>{
                   this.setState({
                       password:t
                   })
               }}/>
               <TouchableOpacity style={style.button} onPress={()=>{
                   this.login(this.state.email,this.state.password);
               }}>
                   <Text style={{ color:'white'}}>Login</Text>
               </TouchableOpacity>
               <TouchableOpacity style={style.button} onPress={()=>{
                   this.signup(this.state.email,this.state.password);
               }}>
                   <Text style={{ color:'white'}}>Signup</Text>
               </TouchableOpacity>
            </View>
       )
   } 
}
const style = StyleSheet.create({
    input:{
        backgroundColor:'white',
        color:'green',
        fontSize:20,
        marginTop:50
    },
    button:{
        alignItems:'center',
        backgroundColor:'green',
        marginTop:50
    }
})