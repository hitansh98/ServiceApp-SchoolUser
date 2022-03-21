import React from 'react';
import { StyleSheet, View, TextInput,Image,KeyboardAvoidingView, Dimensions,
TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import firebase, { Notification } from 'react-native-firebase';

import { Container, Header, Content, Text,Form, Item, Input, Label, Button } from 'native-base';

export default class ProblemScreen2 extends React.Component {

  

    static navigationOptions = ({navigation}) => {
        return{
            title: 'ProblemScreen2',
        }
    }


  submitForm = () => {  
      this.props.navigation.navigate('App');
    }
  

  render() {
    const {height: screenHeight} = Dimensions.get('window');
    return (
      <Container>
        <Content padder style={{marginLeft:10, marginRight:10}} scrollEnabled={false}>
          <View style={{flex: 1, height: screenHeight, justifyContent: 'center'}}>
            <Text style={{fontSize:16, marginBottom:10, alignSelf:'center'}}>What problem do you face today?</Text>
            
            <Form>
              
              <Button block onPress={this.submitForm} style={{marginTop: 10}}>
                <Text>Keyboard</Text>
              </Button>

              <Button block onPress={this.submitForm} style={{marginTop: 10}}>
                <Text>Mouse</Text>
              </Button>

              <Button block onPress={this.submitForm} style={{marginTop: 10}}>
                <Text>Screen</Text>
              </Button>

              <Button block onPress={this.submitForm} style={{marginTop: 10}}>
                <Text>Webcam</Text>
              </Button>

              <Button block onPress={this.submitForm} style={{marginTop: 10}}>
                <Text>Evaluation Device</Text>
              </Button>


            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}