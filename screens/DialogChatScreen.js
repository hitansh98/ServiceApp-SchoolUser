import React from 'react';
import { Dimensions, View, Text,} from 'react-native';
import firebase from 'react-native-firebase';
import User from '../User';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { Dialogflow_V2 } from 'react-native-dialogflow'
import { dialogflowConfig } from '../env';

// const BOT_USER = {
//     _id: 2,
//     name: 'FAQ Bot',
//     avatar: 'https://i.imgur.com/7k12EPD.png'
//   };

export default class ChatScreen extends React.Component {
    // static navigationOptions = ({navigation}) => {
    //     title: navigation.getParam('name', null);
    // }

    constructor(props){
        super(props);
        Dialogflow_V2.setConfiguration(
            dialogflowConfig.client_email,
            dialogflowConfig.private_key,
            Dialogflow_V2.LANG_ENGLISH_US,
            dialogflowConfig.project_id
          );
        // console.log(props.navigation.getParam('object'));
        this.state = {
            person: {
                name: "Dialog",
                phone: 1234567890,
            },
            itemInfo:  props.navigation.getParam('object'),
            from: props.navigation.getParam('object').from,
            textMessage: '',
            serviceInfo: [],
            messageList: [{message:`Hi ${User.name}! How may I help you?`, from:1234567890, time:new Date().getTime()}],
            giftedMessages: [],
            otherMemberExpo: null,
        }
        // console.log(this.state.fromLG);
        if(this.state.from='LGScreen'){
            this.state.messageList=[...this.state.messageList, {message:'I see that you have a problem with your LG Screen, what is the component of the screen that you have a problem with?\n\n(Tip: Components of a LG Screen comprise of: display, audio, etc.)', from:1234567890, time:new Date().getTime()}]
        }
        else if(this.state.from='Keyboard'){
            this.state.messageList=[...this.state.messageList, {message:'I see that you have a problem with your Logitech Keyboard and Mouse, which among the two of the keyboard or mouse do you have a problem with?', from:1234567890, time:new Date().getTime()}]
        }
        // console.log(this.state.messageList);
    }
    static navigationOptions = ({navigation}) => {
        return{
            title: 'Chatbot Support',
            headerStyle:{
                backgroundColor:"#567672",
                elevation: 0,
                height:90,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: 'Montserrat-Bold' 
              },
            
        }
        
    }

    
  
    componentWillMount = async() => {
        let _this = this;
        // console.log(_this);
        // firebase.database().ref('messages').child(this.state.person.phone).child('101').child(User.phone)
        //  .on('child_added', (value) => {
        //      this.setState((prevState) => {
        //          return{
        //             messageList: [...prevState.messageList, value.val()]
        //          }
        //      }, () => this.generateChat(this.state.messageList));
        //  });
         
        

        // firebase.database().ref('dialogMessages').child(User.phone)
        //  .on('child_added', (value) => {
        //      this.setState((prevState) => {
        //          return{
        //             messageList: [...prevState.messageList, value.val()]
        //          }
        //      }, () => this.generateChat(this.state.messageList));
        //  });
        this.generateChat(this.state.messageList);
        
        firebase.database().ref().child('schoolUser').child(User.phone).child('services').on("child_added", (snap) => {
            // serviceInfo=snap.val();
            // console.log('i am here');
            
            // console.log("objects key is: "+snap.key);
            // console.log("objects val is: "+JSON.stringify(snap.val()));
            let object = {};
            object[snap.key] = snap.val().serviceName;
            // console.log("objects is: "+JSON.stringify(object));

            this.setState((prevstate) => {
                return {
                    serviceInfo: [...prevstate.serviceInfo, object],
                };
            });


        });
             
            // console.log(User.phone);
            // console.log("service info is "+JSON.stringify(this.state.serviceInfo));

        
        // console.log(this.state.serviceInfo);
        //  let dBref = firebase.database().ref('/users/' + this.state.person.phone)
        //  dBref.on("value", function(snapshot) {
        //      const snap = snapshot.val();
        //      if(!!snap.expoToken){
        //          _this.setState({
        //              otherMemberExpo: snap.expoToken
        //          });
        //      }
        //  }, function (errorObject) {
        //      console.log("The read failed: " + errorObject.code);
        //  });

        //  console.log(this.state.messageList);

    }

    
 
    componentWillUnmount() {
         const x = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone);
         x.off();
     };

    //  sendNotification(message, token){
    //     var messages = [];
    //     messages.push({
    //         'to': token,
    //         'body': message,
    //         'sound': 'default',
    //         'subtitle': `Message from ${User.name}`
    //     })
    //     fetch('https://exp.host/--/api/v2/push/send', {
    //         'method': 'POST',
    //         'headers': {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(messages)
    //     });
    //     console.log("Notification sent")
    // }

     handleChange = key => val => {
        this.setState({ [key]: val });
    }

     convertTime = async(time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0': '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0': '') + d.getMinutes();
        if(c.getDay() !== d.getDay()){
            result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
        }
        return result;
    }
    handleGoogleResponse= async(result) => {
        let updates = {};
        const now = new Date().getTime();
        // console.log(result);
        let googleQuery={
            _id: now,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            text: result.queryResult.fulfillmentMessages[0].text.text[0],
            user: {
                _id: 1234567890,
                name: "Dialog",
            }
        };
        // console.log("Intent Detection are " +JSON.stringify(result.queryResult.intentDetectionConfidence));
        // console.log("Required contexts are " +JSON.stringify(result.queryResult.outputContexts[0].name));
        // console.log(googleQuery);
        // console.log(result);
        let textArr=[];
        let myRegex = new RegExp(/connecting now to a service engineer/, 'g');
        let index = (googleQuery.text).search(myRegex);
        
        if(index!=-1){
            //call the service by providing User phone, item id, serialNo.
            let d = new Date()
            let localTime = d.getTime();
            let localOffset = d.getTimezoneOffset()*60000;

            let utc=localTime+localOffset;
            let offset = 5.5
            let bombay = utc+(3600000*offset)
            let nd = new Date(bombay);
            let timenow = nd.toLocaleString();
            let serviceInfo=null;
            let serviceNumber = Object.keys(this.state.serviceInfo[0])[0];

            
            //create new grievance object with grievanceId, itemId, itemName, openTime, closeTime, serviceName, serviceId, schoolName, schoolId, isTicket, ticketStatus
            let griobj = {
                grievanceId: this.state.itemInfo.serialNo+'-'+serviceNumber+'-'+timenow.slice(14,16),
                itemId: this.state.itemInfo.serialNo,
                itemName: this.state.itemInfo.itemname,
                openTime: timenow,
                closeTime: "0",
                serviceName: this.state.serviceInfo[0][serviceNumber],
                service: serviceNumber,
                schoolName: User.schoolName,
                schoolUserName: User.name,
                school: User.phone,
                isTicket: false,
                status: "open",
                isBadgeVisible: true,
                isBadgeVisibleService: true,
                description: ' ',
                remarkClose: ' ',
                remarkHold: ' ',
            }
            console.log(JSON.stringify(griobj));
            updates[`grievances/${User.phone}/${griobj.grievanceId}`] = griobj;
            updates[`dialogLearning/${User.phone}/${griobj.grievanceId}`] = this.state.messageList;
            firebase.database().ref().update(updates);

            this.props.navigation.navigate('Chat', griobj);
        }
        textArr.push(googleQuery);
    //    console.log(textArr);
    //    let resultArr=[];
    //    resultArr= resultArr.push(result);
        this.updateMessage(textArr);
    }




    updateMessage = async (messsages) => {
        // console.log(messsages[0].user.name);
        console.log(messsages);
        if(messsages.length > 0){
            // console.log(messsages);
            if(messsages[0].user.name === User.name)
            {
                // console.log("Reached in user text");
                let msgId = firebase.database().ref('message').child(User.phone).child(this.state.person.phone).push().key;
                let updates = {};
                //const now = new Date().getTime();
                let dialogQuery = {
                    message: messsages[0].text,
                    time: firebase.database.ServerValue.TIMESTAMP,
                    from: User.phone,
                };

                // console.log(dialogQuery);
                let dmessage= dialogQuery.message; 
                Dialogflow_V2.requestQuery(
                    dmessage,
                    result => this.handleGoogleResponse(result),
                    error => console.log(error)
                  );

                const event = (new Date().toDateString());
                updates[`dialogMessages/${User.phone}/${this.state.person.phone}/${event}/${msgId}`] =  dialogQuery;
                firebase.database().ref().update(updates);
                
                this.setState((prevstate)=>{
                    return{
                        messageList:[...prevstate.messageList,dialogQuery]
                    }
                });
                this.generateChat(this.state.messageList);
                
            }
            }   
            if(messsages[0].user.name === "Dialog"){
                // console.log("Reached in Dialog text");
                let dialogResponse ={}
                let updates = {};
            
                let msgId = firebase.database().ref('dialogMessage').child(User.phone).push().key;
                //const now = new Date().getTime();
                dialogResponse = {
                from: 1234567890,
                message: messsages[0].text,
                time: new Date(),
                };
                // console.log(dialogResponse.message);
                const event = (new Date().toDateString());
                updates[`dialogMessages/${User.phone}/${this.state.person.phone}/${event}/${msgId}`] = dialogResponse;
                
                
                firebase.database().ref().update(updates);
                //console.log(msg.time);

                this.setState((prevstate)=>{
                    return{
                        messageList:[...prevstate.messageList,dialogResponse]
                    }
                });
                this.generateChat(this.state.messageList);
            }
            // console.log(this.state.messageList);
            
        }

        generateChat = async(messageList) => {
            const giftedMessages = [];
            for(let i=0; i < messageList.length; i++){
                if(messageList[i].from == "1234567890")
                {
                    let myRegex = new RegExp(/please type "Service Engineer"/, 'g');
                    let index = (messageList[i].message).search(myRegex);
                    if(index!=-1){
                        giftedMessages.push({
                            _id: i,
                            text: messageList[i].message,
                            createdAt: messageList[i].time,
                            user: {
                                _id: messageList[i].from,
                                name: "Dialog"
                            },
                            quickReplies: {
                                type: 'radio', // or 'checkbox',
                                values: [
                                  {
                                    title: 'Service Engineer',
                                    value: 'Service Engineer',
                                  },
                                  {
                                    title: 'No thanks.',
                                    value: 'no',
                                  },
                                ],
                              },
                        })
                    }
                    else{
                        giftedMessages.push({
                            _id: i,
                            text: messageList[i].message,
                            createdAt: messageList[i].time,
                            user: {
                                _id: messageList[i].from,
                                name: "Dialog"
                            },
                        })
                    }
                }
                else{
                    giftedMessages.push({
                        _id: i,
                        text: messageList[i].message,
                        createdAt:messageList[i].time,
                        user: {
                            _id: messageList[i].from,
                            name: User.name
                        },
                    })
                }
                
            }
            // console.log(giftedMessages);
            
            this.setState({giftedMessages});
        }

    renderRow = ({item}) => {
        return (
            <View style={{
                flexDirection: 'row',
                width:'60%',
                alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === User.phone ? '#39D075' : '#7cb342',
                marginBottom: 10,
                borderRadius: 5
            }}>
                <Text style={{color: '#fff', padding:7, fontSize:16, fontFamily:'Montserrat-Regular'}}>
                    {item.message}
                </Text>
                <Text style={{color: '#eee', padding:3, fontSize:12}}>
                    {this.convertTime(item.time)}
                </Text>
            </View>
        )
    }

    renderBubble = (props) => {
        return (
          <Bubble
            {...props}
            timeTextStyle={{
                  right: {
                    color: '#48498B'
                  },
                  left: {
                    color:'#48498B'
                  }
            }}
            textStyle={{
                  right: {
                    color: 'black'
                  },
                  left: {
                    color:'black'
                  }
              }}
            wrapperStyle={{
              left: {
                backgroundColor: '#FEFEFE',
              },  
              right: {
                backgroundColor: '#E1FEC6',
              },
            }}
          />
        );
      }  

      onQuickReply = (quickReply) =>{
        const now = new Date().getTime();
        // console.log("quickReply found is: "+JSON.stringify(quickReply));
        let quickReplyData = {
            _id : now,
            createdAt : firebase.database.ServerValue.TIMESTAMP,
            text: quickReply[0].value,
            user: {
                _id: User.phone,
                name: User.name,
            }
        };
        console.log("quick reply data is: "+JSON.stringify(quickReplyData));
        let quickReplyArray=[];
        quickReplyArray.push(quickReplyData);
        this.updateMessage(quickReplyArray);
      }  
    render() {
        let {height, width} = Dimensions.get('window');
        // Dialogflow_V2.requestEvent("WELCOME", null, r => console.log(r), e => console.log(e));
        return (
        
            <GiftedChat
                scrollToBottom
                inverted={false}
                onSend={messages => this.updateMessage(messages)}
                renderBubble={this.renderBubble.bind(this)}
                isAnimated
                onQuickReply={quickReply => this.onQuickReply(quickReply)}
                timeTextStyle={{color:'#48498B'}}
                textInputStyle={{color:'black'}}
                messages={this.state.giftedMessages}
                user={{
                _id: User.phone,
                name: User.name
                }}

        />
       
        );
    }
}