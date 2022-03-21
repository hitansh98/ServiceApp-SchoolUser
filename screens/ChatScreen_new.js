import React, { isValidElement } from 'react';
import {SafeAreaView,FlatList, Dimensions,KeyboardAvoidingView,
 View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../constants/styles';
import firebase from 'react-native-firebase';
import User from '../User';
import { GiftedChat } from 'react-native-gifted-chat'
import { Root } from 'native-base';

export default class ChatScreen extends React.Component {
    constructor(props){
        super(props);
        if(User.phone == props.navigation.getParam('service'))
        {
            this.state = {
                person: {
                    name: props.navigation.getParam('schoolName'),
                    phone: props.navigation.getParam('school')
                },
                textMessage: '',
                messageList: [],
                giftedMessages: [],
                otherMemberExpo: null,
            }
        }
        else{
            this.state = {
                person: {
                    name: props.navigation.getParam('serviceName'),
                    phone: props.navigation.getParam('service')
                },
                textMessage: '',
                messageList: [],
                giftedMessages: [],
                otherMemberExpo: null,
            }
        }
        
    }
    static navigationOptions = ({navigation}) => {
        return{
            title: navigation.getParam('serviceName', null),
            headerStyle:{
                backgroundColor:"#567672",
                elevation: 0,
                height:90,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: 'Montserrat-Bold'
              },
              headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('../images/student.png')} style={{height:32,width:32,marginRight:7}} />
                </TouchableOpacity>
            )
            
        }
        
    }

    

    generateChat(messageList){
        const giftedMessages = [];
        for(let i=0; i < messageList.length; i++){
            giftedMessages.push({
                _id: messageList[i].time,
                text: messageList[i].message,
                createdAt: new Date(messageList[i].time),
                user: {
                    _id: messageList[i].from,
                    name: this.state.person.name
                },
            })
        }
        
        let array= Object.keys(messageList);
        // console.log(this.st);
        const rootRef = firebase.database().ref();
        var ref2 = rootRef.child("RenderedMessageCount").child(User.phone).child('101').child(this.state.person.phone);
        const maxIndex = array.length-1;
        // console.log(User);
        // console.log("maxIndex: "+maxIndex);
        // ref2.on("value", (val) => {
        //     console.log("fb:"+ val.val().count+"   array end value: "+array[maxIndex]);
        //     if(val.val().count < parseInt(array[maxIndex])+1)
        //     {
        //         firebase.database().ref('RenderedMessageCount/' + User.phone+"/"+this.state.person.phone).set({
        //             count: parseInt(array[maxIndex])+1  
        //         });
        //     }
            
             
        // });
        
        this.setState({giftedMessages});
    }

   
   componentWillMount() {
       let _this = this;
       console.log("other person phone"+this.state.person.phone);
       firebase.database().ref('messages').child(User.phone).child('101').child(this.state.person.phone)
        .on('child_added', (value) => {
            this.setState((prevState) => {
                return{
                    messageList: [...prevState.messageList, value.val()]
                }
            }, () => this.generateChat(this.state.messageList));
        });


        // let dBref = firebase.database().ref('/users/' + this.state.person.phone)
        // dBref.on("value", function(snapshot) {
        //     const snap = snapshot.val();
        //     // if(!!snap.expoToken){
        //     //     _this.setState({
        //     //         otherMemberExpo: snap.expoToken
        //     //     });
        //     // }
        // }, function (errorObject) {
        //     console.log("The read failed: " + errorObject.code);
        // });
   }

   componentWillUnmount() {
        const x = firebase.database().ref('messages').child(User.phone).child('101').child(this.state.person.phone);
        x.off();
    };

   sendNotification(message, token){
        var messages = [];
        messages.push({
            'to': token,
            'body': message,
            'sound': 'default',
            'subtitle': `Message from ${User.name}`
        })
        fetch('https://exp.host/--/api/v2/push/send', {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messages)
        });
        console.log("Notification sent")
    }
   
    handleChange = key => val => {
        this.setState({ [key]: val });
    }

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0': '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0': '') + d.getMinutes();
        if(c.getDay() !== d.getDay()){
            result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
        }
        return result;
    }

    sendMessage = async (messsages) => {
        if(messsages.length > 0){
            let msgId = firebase.database().ref('message').child(User.phone).child('101').child(this.state.person.phone).push().key;
            let updates = {};
            let message = {
                message: messsages[0].text,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }
            let listMessage= {
                message: messsages[0].text,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone,
                to: this.state.person.phone
            }
            updates[`messages/${User.phone}/101/${this.state.person.phone}/${msgId}`] = message;
            updates[`messages/${this.state.person.phone}/101/${User.phone}/${msgId}`] = message;
            firebase.database().ref().update(updates);

            // if(this.state.otherMemberExpo !== null){
            //     this.sendNotification(messsages[0].text, this.state.otherMemberExpo);
            // }
        }
    }

    renderRow = ({item}) => {
        return (
            <View style={{
                flexDirection: 'row',
                width:'60%',
                alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === User.phone ? '#00897b' : '#7cb342',
                marginBottom: 10,
                borderRadius: 5
            }}>
                <Text style={{color: '#fff', padding:7, fontSize:16}}>
                    {item.message}
                </Text>
                <Text style={{color: '#eee', padding:3, fontSize:12}}>
                    {this.convertTime(item.time)}
                </Text>
            </View>
        )
    }
    render() {
        let {height, width} = Dimensions.get('window');
        return (
            <GiftedChat
                scrollToBottom
                inverted={false}
                onSend={messages => this.sendMessage(messages)}
                isAnimated
                messages={this.state.giftedMessages}
                user={{
                _id: User.phone,
                name: User.name
            }}
        />
        );
    }
}