import React, { isValidElement } from 'react';
import {SafeAreaView,FlatList, Dimensions,KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../constants/styles';
import firebase from 'react-native-firebase';
import User from '../User';
import { GiftedChat, Bubble, CustomActions, Actions, Messa } from 'react-native-gifted-chat';
// import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import customInputToolbar from '../customInputToolbar';
import Loader from '../loader';

const storage = firebase.storage();

// const Blob = RNFetchBlob.polyfill.Blob;
// const fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;



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
                grievanceId: props.navigation.getParam('grievanceId'),
                textMessage: '',
                messageList: [],
                loadedMessageTime: 0,
                giftedMessages: [],
                otherMemberExpo: null,
                loading: true,
                inSecondStage: false,
            }
        }
        else{
            this.state = {
                person: {
                    name: props.navigation.getParam('serviceName'),
                    phone: props.navigation.getParam('service')
                },
                textMessage: '',
                grievanceId: props.navigation.getParam('grievanceId'),
                messageList: [],
                giftedMessages: [],
                loadedMessageTime: 0,
                otherMemberExpo: null,
                loading: true,
                inSecondStage: false,
            }
        }

        
        // console.log("grievanceId is "+ this.state.grievanceId);
        // console.log("person is "+JSON.stringify(this.state.person))
    }

    // _pickImage(){
    //     this.setState({ uploadURL: '' });

    //     ImagePicker.launchImageLibrary({}, response  => {
    //         this.uploadImage(response.uri)
    //           .then(url => this.setState({ uploadURL: url }))
    //           .catch(error => console.log(error));
    //       })
    // }

    
  _pickImage(){

              const options = {
                quality: 1.0,
                maxWidth: 500,
                maxHeight: 500,
                storageOptions: {
                    skipBackup: true
                }
            };

            ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {

                this.setState({
                  loading: true
                });

                let source = { uri: response.uri };
                this.uploadImage(response.uri);
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            }
        });
}

      uploadImage = (path, mime = 'application/octet-stream') => {
        const sessionId = new Date().getTime();
        return new Promise((resolve, reject) => {
          const imageRef = firebase.storage().ref('images').child(`${sessionId}`);

          return imageRef.put(path, { contentType: mime })
            .then(() => {
              console.log("getDLURL will follow");
              console.log(imageRef.getDownloadURL())
              return imageRef.getDownloadURL();
            })
            .then(url => {
              console.log("URL will follow");
              console.log(url);
              this.sendImageMessage(url);
              resolve(url);
            })
            .catch(error => {
              reject(error);
              console.log('Error uploading image: ', error);
            });
        });
      };
    // uploadImage = (uri, mime = 'application/octet-stream') => {
    //   return new Promise((resolve, reject) => {
    //     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    //     const sessionId = new Date().getTime()
    //     let uploadBlob = null
    //     const imageRef = storage.ref('images').child(`${sessionId}`)
    
    //     fs.uploadUri, 'base64')
    //       .then(() => {
    //         console.log(entere)
    //         return imageRef.put(uri, { contentType: mime })
    //       })
    //       .then(() => {
    //         console.log(imageRef.getDownloadURL())
    //         return imageRef.getDownloadURL();
    //       })
    //       .then((url) => {
    //         console.log(url);
    //         this.sendImageMessage(url);
    //         resolve(url)
    //       })
    //       .catch((error) => {
    //         reject(error)
    //     })
    //   })
    // }

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
            
        }
        
    }

    

    generateChat(messageList){
      console.log("message list"+JSON.stringify(this.state.messageList));
        const giftedMessages = [];
        for(let i=0; i < messageList.length; i++){
          if(messageList[i].type=="image"){
            giftedMessages.push({
              _id: messageList[i].time,
              text: messageList[i].message,
              createdAt: new Date(messageList[i].time),
              user: {
                  _id: messageList[i].from,
                  name: this.state.person.name
              },
              image: messageList[i].imageUrl,
            })
          }
          else{
            giftedMessages.push({
              _id: messageList[i].time,
              text: messageList[i].message,
              createdAt: new Date(messageList[i].time),
              user: {
                  _id: messageList[i].from,
                  name: this.state.person.name
              },
            })
            
            // console.log( "length is:"+messageList.length+"added to chat: "+i);
          }
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
        // console.log("gifted messages: "+JSON.stringify(this.state.giftedMessages));
    }

   
    componentWillMount = async() => {
       let _this = this;
    //    console.log("other person phone"+this.state.person.phone);
        // let sorting = await firebase.database().ref('messages').child(User.phone).child(this.state.grievanceId).child(this.state.person.phone);

      //  let populating = await firebase.database().ref('messages').child(User.phone).child(this.state.grievanceId).child(this.state.person.phone)
      //   .once('value').then((value) => {
      //       let messages = value.val();
      //       let disKeys = Object.keys(value.val());
      //       let len = disKeys.length
      //       for(let i=0; i<disKeys.length; i++){
      //         this.setState((prevState) => {
      //           return{
      //               messageList: [...prevState.messageList, messages[disKeys[i]]],
      //               loading: false,
      //           }
      //         });  
      //       }
            
      //   });

      
      await firebase.database().ref('messages').child(User.phone).child(this.state.grievanceId).child(this.state.person.phone)
        .once('value').then((value) => {
            if(value.val() !== null){
              let messages = value.val();
              let disKeys = Object.keys(value.val());
              let len = disKeys.length;
              for(let i=0; i<disKeys.length; i++){
                this.setState((prevState) => {
                  return{
                      messageList: [...prevState.messageList, messages[disKeys[i]]],
                      loading: false,
                  }
                }, ()  => 
                {
                  this.generateChat(this.state.messageList.sort((a, b) => b.time - a.time))
                  // console.log("last element of m list is: "+JSON.stringify(this.state.messageList.sort((a, b) => b.time - a.time)[0].time));
                  this.setState(
                    {
                      loadedMessageTime: this.state.messageList.sort((a, b) => b.time - a.time)[0].time+1,
                      inSecondStage: true,
                    }
                  );
                }
                );
              }
            }
            else{
              this.setState(
                {
                  loading: false,
                  loadedMessageTime: firebase.database.ServerValue.TIMESTAMP,
                  inSecondStage: true,
                }
              );
            }
            
        });

        let newMessages = await firebase.database().ref('messages').child(User.phone).child(this.state.grievanceId).child(this.state.person.phone)
        .orderByChild("time").startAt(this.state.loadedMessageTime).on('child_added',(value) => {
          // console.log("i am in child added: ")
              if(this.state.inSecondStage){
                console.log("loaded time + 1 is: "+ this.state.loadedMessageTime);
                // console.log(value.val());
              this.setState((prevState) => {
                return{
                    messageList: [...prevState.messageList, value.val()]
                }
              }, () => this.generateChat(this.state.messageList.sort((a, b) => b.time - a.time)));
            }  
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
   componentDidMount(){
    let isBadge = firebase.database().ref().child('grievances').child(User.phone).child(this.state.grievanceId).child('isBadgeVisible')
                    .once('value').then((val) => {
                        let isBadgeVal = val.val();
                        console.log("isBadgeValue before is:"+ isBadgeVal);
                        if(isBadgeVal){
                            let updates={};
                            updates[`grievances/${User.phone}/${this.state.grievanceId}/isBadgeVisible`] = false;
                            firebase.database().ref().update(updates);
                        }
                    });
   }  

   componentWillUnmount() {
        const x = firebase.database().ref('messages').child(User.phone).child(this.state.grievanceId).child(this.state.person.phone);
        x.off();
    };

//    sendNotification(message, token){
//         var messages = [];
//         messages.push({
//             'to': token,
//             'body': message,
//             'sound': 'default',
//             'subtitle': `Message from ${User.name}`
//         })
//         fetch('https://exp.host/--/api/v2/push/send', {
//             'method': 'POST',
//             'headers': {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(messages)
//         });
//         console.log("Notification sent")
//     }
   
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

    sendImageMessage = async(url2) => {
      console.log("reached image message send fn");
      let msgId = firebase.database().ref('message').child(User.phone).child(this.state.grievanceId).child(this.state.person.phone).push().key;
      let updates = {};
      console.log("image url is: "+url2);
      let message = {
        time: firebase.database.ServerValue.TIMESTAMP,
        from: User.phone,
        imageUrl: url2,
        type: "image" 
      }

      updates[`messages/${User.phone}/${this.state.grievanceId}/${this.state.person.phone}/${msgId}`] = message;
      updates[`messages/${this.state.person.phone}/${this.state.grievanceId}/${User.phone}/${msgId}`] = message;
      updates[`grievances/${User.phone}/${this.state.grievanceId}/isBadgeVisible`]=false;
      firebase.database().ref().update(updates);

      this.setState({
        loading: false
      });

    }
    sendMessage = async (messsages) => {
        if(messsages.length > 0){
            let msgId = firebase.database().ref('message').child(User.phone).child(this.state.grievanceId).child(this.state.person.phone).push().key;
            let updates = {};
            let message = {
                message: messsages[0].text,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone,
            }
            let listMessage= {
                message: messsages[0].text,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone,
                to: this.state.person.phone
            }
            updates[`messages/${User.phone}/${this.state.grievanceId}/${this.state.person.phone}/${msgId}`] = message;
            updates[`messages/${this.state.person.phone}/${this.state.grievanceId}/${User.phone}/${msgId}`] = message;
            updates[`grievances/${User.phone}/${this.state.grievanceId}/isBadgeVisible`]=false;
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

    renderCustomActions = (props) => {
        if (Platform.OS === 'ios') {
          return (
            <CustomActions
              {...props}
            />
          );
        }
        const options = {
          'Pick an image': (props) => {
            this._pickImage();
          },
          'Cancel': () => {},
        };
        return (
          <Actions
            {...props}
            options={options}
          />
        );
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
    
      
    render() {
        let {height, width} = Dimensions.get('window');
        
        return (
          <View style={{flex: 1}}>
            <Loader
            loading={this.state.loading} />
            <GiftedChat
                scrollToBottom
                inverted={true}
                onSend={messages => this.sendMessage(messages)}
                renderBubble={this.renderBubble.bind(this)}
                isAnimated
                timeTextStyle={{color:'#48498B'}}
                textInputStyle={{color:'black'}}
                renderActions={this.renderCustomActions}
                messages={this.state.giftedMessages}
                user={{
                _id: User.phone,
                name: User.name
            }}
          />
        </View>
        );
    }
}