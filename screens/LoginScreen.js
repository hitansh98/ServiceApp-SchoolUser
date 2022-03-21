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
  }

  handleChange = key => val => {
    this.setState({ [key]: val})
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
      console.log(this.state.name+" "+this.state.phone);
      await AsyncStorage.setItem('userName', this.state.name);
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      User.name = this.state.name;
      firebase.database().ref('users/' + User.phone).set({
          name:this.state.name
      });
      let array=[];
      const rootRef = firebase.database().ref();
       
      var ref = rootRef.child("users");
      ref.on("value", (val) => {
        let key = val.key;
        let childData=val.val();
        // console.log(childData);
        // console.log(Object.keys(childData).length);
        array = Object.keys(childData);
        // console.log(array);
        for(let i=0;i<array.length;i++)
        {
          // console.log("I reached here inside for loop "+array.length);
          console.log(array[i]);  
          if(array[i]==User.phone)
          {
            console.log("reacehed self");
            continue;
          }
          else{
            console.log("reacehed differents");
            var ref2=rootRef.child("messages").child(User.phone).child(array[i]);
            ref2.on("value", (val) =>{
              if(val.val()==null){
                firebase.database().ref('RenderedMessageCount/' + User.phone+"/"+array[i]).set({
                  count: 0
                });
              }
            });
          }
        }
      });
      
      this.props.navigation.navigate('App');
    }
  }

  render() {
    const {height: screenHeight} = Dimensions.get('window');
    return (
      <Container>
        <Content padder style={{marginLeft:10, marginRight:10}} scrollEnabled={false}>
          <View style={{flex: 1, height: screenHeight, justifyContent: 'center'}}>
            
            <Image source={require('../images/fb_icon.png')}
                style={{height:64, width:64, margin:5, alignSelf:'center'}}
            />
            <Form>
              <Item floatingLabel>
                <Label>Mobile No.</Label>
                <Input keyboardType = 'numeric' 
                  onChangeText={this.handleChange('phone')}
                  value ={this.state.phone}
                />
              </Item>
              <Item floatingLabel>
                <Label>Name</Label>
                <Input
                  value ={this.state.name}
                  onChangeText={this.handleChange('name')}
                />
              </Item>
              <Button block onPress={this.submitForm} style={{marginTop: 10}}>
                <Text>Login</Text>
              </Button>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}
