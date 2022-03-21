import React, { useReducer } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Alert,
  View,
} from 'react-native';
import User from '../User';
import { Notification, NotificationOpen, RemoteMessage } from 'react-native-firebase';
import firebase from 'react-native-firebase';
import ChatScreen from './ChatScreen';
//import firebaseConfig from '../firebaseConfig';
import Loader from '../loader';



export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
    this._bootstrapAsync();
    //  this.checkPermission();
    this.messageListener();
  }

  
   
   checkPermission = async () => {
   const enabled = await firebase.messaging().hasPermission();
   if (enabled) {
     this.getFcmToken();
   } else {
     this.requestPermission();
   }
  }
  
  getFcmToken = async () => {
   const fcmToken = await firebase.messaging().getToken();
   if (fcmToken) {
    console.log(fcmToken);
    this.showAlert("Your Firebase Token is:", fcmToken);
   } else {
    this.showAlert("Failed", "No token received");
   }
  }
  
  
  requestPermission = async () => {
   try {
    await firebase.messaging().requestPermission();
    // User has authorised
   } catch (error) {
     // User has rejected permissions
   }
  }

  messageListener = async () => {
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      let notificationMessage = notification._android._notification._data.action;
      let recordId = notification._android._notification._data.recordID;
      let data1 =  notification._android._notification._data;
      
      console.log("data is" +data1);
      console.log("new data" +JSON.stringify(data1))
      const channelId = new firebase.notifications.Android.Channel(
        'Default',
        'Default',
        firebase.notifications.Android.Importance.High
      );
  
      firebase.notifications().android.createChannel(channelId);
      let notification_to_be_displayed = new firebase.notifications.Notification({
        data: notification._android._notification._data,
        sound: 'default',
        show_in_foreground: true,
        title: notification.title,
        body: notification.body,
      });
      if (Platform.OS == 'android') {
        notification_to_be_displayed.android
          .setPriority(firebase.notifications.Android.Priority.High)
          .android.setAutoCancel(true)
          .android.setChannelId('Default')
          .android.setVibrate(1000);
      }
      console.log('FOREGROUND NOTIFICATION LISTENER: \n', notification_to_be_displayed);
      firebase.notifications().displayNotification(notification_to_be_displayed);
      const {
        title,
        body
      } = notification;
      console.log("in function displayNotification");     
      // this.showAlert(title, body);
      });
  
  
   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
     const { title, body } = notificationOpen.notification;
        let data1 =  notificationOpen.notification.data;
        let schoolno = data1.schoolNo;
        let id = data1.grievanceId;
      console.log("data is" +data1.senderPhone);
      console.log("griaaaa" +data1.grievanceId)
      console.log("new data" +JSON.stringify(data1))
      
      console.log(User.phone);
        let object = {
          school: data1.senderPhone,
          grievanceId: data1.grievanceId,
          service: data1.service,
          serviceName: data1.serviceName,
        }
        let dbRef = firebase.database().ref('grievances/').child(schoolno).child(id);
        dbRef.on('value', (val) => {
          let grievanceId1 = val.val();
          console.log("reached");
          
          console.log("reached"+ JSON.stringify(grievanceId1));
            this.props.navigation.navigate('Chat',grievanceId1);
        }); 
      });
  
   const notificationOpen = await firebase.notifications().getInitialNotification();
   if (notificationOpen) {
       let data1 =  notificationOpen.notification.data;
      console.log("data is hhh" +data1.senderPhone);
      console.log("new data" +JSON.stringify(data1))
        let schoolno = data1.schoolNo;
        let id = data1.grievanceId;
        console.log(User.phone);
        let object = {
          school: data1.senderPhone,
          grievanceId: data1.grievanceId,
          service: data1.service,
          serviceName: data1.serviceName,
        }

        let dbRef = firebase.database().ref('grievances/').child(schoolno).child(id);
        dbRef.on('value', (val) => {
          let grievanceId1 = val.val();
          console.log("reached");
          
          console.log("reached"+ JSON.stringify(grievanceId1));
            this.props.navigation.navigate('Chat',grievanceId1);
        }); 
   }
  
  
   this.messageListener = firebase.messaging().onMessage((message) => {
    console.log(JSON.stringify(message));
   });
  
  }

  showAlert = (title, message) => {
    Alert.alert(
     title,
     message,
     [
      {text: "OK", onPress: () => console.log("OK Pressed")},
     ],
     {cancelable: false},
    );
   }
  
  
    _bootstrapAsync = async () => {
      User.name = await AsyncStorage.getItem('userName');
      User.phone = await AsyncStorage.getItem('userPhone');
      User.code = await AsyncStorage.getItem('userSchoolCode');
      User.schoolName = await AsyncStorage.getItem('userSchoolName');
      if(User.name && User.phone){
        console.log("i managed to stay logged in");
        this.setState({isLoading: false});
       this.props.navigation.navigate('App',User);
      }
      else{
         this.setState({isLoading: false});
         this.props.navigation.navigate('Auth',User);
      }
    };
  
    render() {
      console.disableYellowBox = true;
      return (
        <View>
          <Loader
            loading={this.state.isLoading} />
        </View>
      );
    }
}
  
  



// firebase.database().ref('TotalList')
//         .on('child_added', (value) => {
//             this.setState((prevState) => {
//                 return{
//                     messageList: [...prevState.messageList, value.val()]
//                 }
//             }, () => this.generateChat(this.state.messageList));
//         });

//         const localNotification = new firebase.notifications.Notification({
//                 sound: 'sampleaudio',
//                 show_in_foreground: true,
//               })
//               .setSound('sampleaudio.wav')
//               .setNotificationId(notification.notificationId)
//               .setTitle(notification.title)
//               .setBody(notification.body)
//               .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
//               .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
//               .android.setColor('#000000') // you can set a color here
//               .android.setPriority(firebase.notifications.Android.Priority.High);