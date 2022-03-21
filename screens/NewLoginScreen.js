import React from 'react';
import { StyleSheet, View, TextInput,Image,KeyboardAvoidingView, Dimensions,
TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import firebase, { Notification } from 'react-native-firebase';

import { Container, Header, Content, Text,Form, Item, Input, Label, Button } from 'native-base';

export default class LoginScreen extends React.Component {

  static navigationOptions = {
      header: null
  }  

  state = {
    phone: '',
    name: '',
    code: '',
    schoolName: '',
    itemList: [],
    fckToken: ''
  }

  handleChange = key => val => {
    this.setState({ [key]: val});
  }

  submitForm = async () => {
    if(this.state.phone.length < 10){
       Alert.alert('Error', 'Wrong phone number')
    }
    else if(this.state.name.length < 3){
      Alert.alert('Error', 'Name must be Min 3 Chars')
    }
    else{
      // save user data here
      let obj = await firebase.database().ref('schoolUser').child(this.state.phone).once("value").then((snap) => {
        return snap.val();
      })
      console.log(obj);
      if(obj.name != this.state.name){
        Alert.alert('Error', 'Wrong credentials. Please enter credentials provided by company.')
      }
      else{
        this.state.fcmToken = await firebase.messaging().getToken();
        await AsyncStorage.setItem('userName', this.state.name);
        await AsyncStorage.setItem('userPhone', this.state.phone);
        User.phone = this.state.phone;
        User.name = this.state.name;
        let obj = await firebase.database().ref('schoolUser').child(User.phone).once("value").then((snap)=>{
          console.log("User details are: "+JSON.stringify(snap.val()));
          this.setState({
            code: snap.val().schoolCode.toString(),
            schoolName: snap.val().schoolName
          });
        });
        await AsyncStorage.setItem('userSchoolCode', this.state.code);
        await AsyncStorage.setItem('userSchoolName', this.state.schoolName);
        
        User.code = this.state.code;
        User.schoolName = this.state.schoolName;

        let updates={};
        updates[`schoolUser/${User.phone}/fcmToken`] = this.state.fcmToken;
        updates[`schoolUser/${User.phone}/name`] = this.state.name;
        firebase.database().ref().update(updates);
        console.log("User's school name:"+ User.schoolName);
        console.log("User's name:"+ User.name);
        this.props.navigation.navigate('App');
      }
      
      // firebase.database().ref('schools/' + User.phone).set({
      //     name:this.state.name,
      //     fcmToken: this.state.fcmToken
      // });
      
       

      //rendered count logic
      // var ref = rootRef.child("users");
      // ref.on("value", (val) => {
      //   let key = val.key;
      //   let childData=val.val();
      //   // console.log(childData);
      //   // console.log(Object.keys(childData).length);
      //   array = Object.keys(childData);
      //   // console.log(array);
      //   for(let i=0;i<array.length;i++)
      //   {
      //     // console.log("I reached here inside for loop "+array.length);
      //     // console.log(array[i]);  
      //     if(array[i]==User.phone)
      //     {
      //       // console.log("reacehed self");
      //       continue;
      //     }
      //     else{
      //       // console.log("reacehed differents");
      //       var ref2=rootRef.child("messages").child(User.phone).child(array[i]);
      //       ref2.on("value", (val) =>{
      //         if(val.val()==null){
      //           firebase.database().ref('RenderedMessageCount/' + User.phone+"/"+array[i]).set({
      //             count: 0
      //           });
      //         }
      //       });
      //     }
      //   }
      // });

      
      
      
      // console.log("in new login"+this.state.itemList);
    }
  }


  render() {
    const {height: screenHeight} = Dimensions.get('window');
    return (
      <Container>
        <Content padder style={{backgroundColor:"#EFF7F6"}} scrollEnabled={false}>
          <View style={{flex: 1, height: screenHeight, justifyContent:'center'}}>
            <Text style={{textAlign:'center', fontFamily:'OpenSans-Regular', fontSize:20}}>Gyaan Varsha Assistant System</Text>
            <Image source={require('../images/helpbot2.png')}
                style={{margin:5, alignSelf:'center'}}
            />
            <Form style={{marginTop:20, marginBottom:70}}>
              <Item regular style={{backgroundColor:'white', margin:7, width:"85%", alignSelf:'center', borderRadius:7}}>
                <Input  
                  placeholder="Username"
                  onChangeText={this.handleChange('name')}
                  value ={this.state.name}
                  fontFamily='Montserrat-Regular'
                />
              </Item>
              <Item regular style={{backgroundColor:'white', margin:7, marginBottom:25, width:"85%", alignSelf:'center', borderRadius:7}}>
                <Input
                  placeholder="Password"
                  keyboardType = 'numeric'
                  onChangeText={this.handleChange('phone')}
                  value ={this.state.phone}
                  textContentType='password'
                  fontFamily='Montserrat-Regular'
                  secureTextEntry={true}
                />
              </Item>
              <Button block onPress={this.submitForm} style={{marginTop: 10, backgroundColor:"#39D075",  width:"80%", alignSelf:'center', borderRadius:12}}>
                <Text style={{fontFamily:'Montserrat-SemiBold', color:'white'}}>Login</Text>
              </Button>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}