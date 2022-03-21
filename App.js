import React, { useEffect } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// import LoginScreen from './screens/LoginScreen';
import NewLoginScreen from './screens/NewLoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import DialogChatScreen from './screens/DialogChatScreen';
import SplashScreen from 'react-native-splash-screen'
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ProfileScreen from './screens/ProfileSetting';
import ProblemScreen1 from './screens/ProblemScreen1';
import DesktopStaticScreen from './screens/statics/DesktopStaticScreen';
import KeyboardStaticScreen from './screens/statics/KeyboardStaticScreen'; 
import DisplayManualScreen from './assets/manuals/DisplayManualScreen';
import { Root } from 'native-base';
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
const AuthStack = createStackNavigator({ Login: NewLoginScreen });
// const AppStack = createStackNavigator({ });
const AppStack = createStackNavigator({ ProblemList: ProblemScreen1, DesktopStatic: DesktopStaticScreen, KeyboardStatic: KeyboardStaticScreen, Home: HomeScreen , Chat: ChatScreen, Profile: ProfileScreen, Dialog: DialogChatScreen, DisplayPdf: DisplayManualScreen });

class App{
  constructor(){
    useEffect(() => {
      SplashScreen.hide()
    }, []);
  }
}

const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default () => {
  return(
    <Root>
    <AppNavigator />
    </Root>
  )
}



// async componentDidMount(){
  //   firebase.messaging().hasPermission()
  //   .then(enabled => {
  //   if (enabled) {
  //     // user has permissions
  //     console.log('I have reached - user has permissions');
  //   } else {
  //     // user doesn't have permission
  //     firebase.messaging().requestPermission()
  //     .then(() => {
  //       console.log('user has authorized');
  //       // User has authorised  
  //     })
  //     .catch(error => {
  //       // User has rejected permissions
  //       alert("Please provide permissions.");  
  //     });
  //   } 
  // });

  // const fcmToken = await firebase.messaging().getToken();
  // if (fcmToken) {
  //     alert(fcmToken)
  // } else {
  //     // user doesn't have a device token yet
  // }

  // this.notificationListener = firebase.notifications().onNotification((notification) => {
  //   let notificationMessage = notification._android._notification._data.action;
  //   let recordId = notification._android._notification._data.recordID;
  //   const channelId = new firebase.notifications.Android.Channel(
  //     'Default',
  //     'Default',
  //     firebase.notifications.Android.Importance.High
  //   );
  //   firebase.notifications().android.createChannel(channelId);
  //   let notification_to_be_displayed = new firebase.notifications.Notification({
  //     data: notification._android._notification._data,
  //     sound: 'default',
  //     show_in_foreground: true,
  //     title: notification.title,
  //     body: notification.body,
  //    });
  //    if (Platform.OS == 'android') {
  //     notification_to_be_displayed.android
  //       .setPriority(firebase.notifications.Android.Priority.High)
  //       .android.setChannelId('Default')
  //       .android.setVibrate(1000);
  //   }
  //   console.log('FOREGROUND NOTIFICATION LISTENER: \n', notification_to_be_displayed);
  //   firebase.notifications().displayNotification(notification_to_be_displayed);
  //   const {
  //     title,
  //     body
  //   } = notification;
  //   this.showAlert(title, body, );
  //    });
  //    const notificationOpen = await firebase.notifications().getInitialNotification();
  //    if (notificationOpen) {
  //   const {
  //     title,
  //     body
  //   } = notificationOpen.notification;
  //   this.showAlert(title, body);
  //    }
  //   this.notificationOpenedListener =
  //   firebase.notifications().onNotificationOpened((notificationOpen) => {
  //     const {
  //       title,
  //       body
  //     } = notificationOpen.notification;
      
  //     this.showAlert(title, body);
  //   });
  //    this.messageListener = firebase.messaging().onMessage((message) => {
  //   //process data message
  //    });
    
  //    }
  // }

  // showAlert = (title, message) => {
  //   Alert.alert(
  //     title,
  //     message,
  //     [
  //       {text: 'OK', onPress: () => console.log('OK Pressed')},
  //     ],
  //     {cancelable: false},
  //   );
  // }

  //   async componentDidMount(){
//     firebase.messaging().hasPermission()
//     .then(enabled => {
//     if (enabled) {
//       // user has permissions
//       console.log('I have reached - user has permissions');
//     } else {
//       // user doesn't have permission
//       firebase.messaging().requestPermission()
//       .then(() => {
//         console.log('user has authorized');
//         // User has authorised  
//       })
//       .catch(error => {
//         // User has rejected permissions
//         alert("Please provide permissions.");  
//       });
//     } 
//   });

//   const fcmToken = await firebase.messaging().getToken();
//   if (fcmToken) {
//       //alert(fcmToken)
//   } else {
//       // user doesn't have a device token yet
//   }

//   this.notificationListener = firebase.notifications().onNotification((notification) => {
//     let notificationMessage = notification._android._notification._data.action;
//     let recordId = notification._android._notification._data.recordID;
//     let data1 =  notification._android._notification._data;
//     console.log("data is" +data1);
//     console.log("new data" +JSON.stringify(data1))
//     const channelId = new firebase.notifications.Android.Channel(
//       'Default',
//       'Default',
//       firebase.notifications.Android.Importance.High
//     );

//     firebase.notifications().android.createChannel(channelId);
//     let notification_to_be_displayed = new firebase.notifications.Notification({
//       data: notification._android._notification._data,
//       sound: 'default',
//       show_in_foreground: false,
//       title: notification.title,
//       body: notification.body,
//     });
//     if (Platform.OS == 'android') {
//       notification_to_be_displayed.android
//         .setPriority(firebase.notifications.Android.Priority.High)
//         .android.setChannelId('Default')
//         .android.setVibrate(1000);
//     }
//     // console.log('FOREGROUND NOTIFICATION LISTENER: \n', notification_to_be_displayed);
//     // firebase.notifications().displayNotification(notification_to_be_displayed);
//     // const {
//     //   title,
//     //   body
//     // } = notification;
//     // console.log("in function displayNotification");     
//     // this.showAlert(title, body);
//     });


//     const notificationOpen = await firebase.notifications().getInitialNotification();
//       if (notificationOpen) {
//      let data1 =  notificationOpen.notification.data;
//     console.log("data is hhh" +data1.senderPhone);
//     console.log("new data" +JSON.stringify(data1))
//       schoolno = data1.senderPhone;
//       id = data1.grievanceId;
//      const { title, body } = notificationOpen.notification;     
//         let dbRef = firebase.database().ref('grievances/').child(schoolno);
//         let tempList
//         dbRef.on('child_added', (val) => {
//               let grievanceId = val.val();
//           if(grievanceId.grievanceId == id) {
//               console.log("school is "+grievanceId.school)
//              this.props.navigation.navigate('Chat',grievanceId);  
//           }
//         });    
//  }


//     this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
//       const { title, body } = notificationOpen.notification;
//         let data1 =  notificationOpen.notification.data;
//         schoolno = data1.senderPhone;
//         id = data1.grievanceId;
//       console.log("data is" +data1.senderPhone);
//       console.log("griaaaa" +data1.grievanceId)
//       console.log("new data" +JSON.stringify(data1))
              
//           let dbRef = firebase.database().ref('grievances/').child(schoolno);
//           let tempList
//           dbRef.on('child_added', (val) => {
//                 let grievanceId = val.val();
//             if(grievanceId.grievanceId == id) {
//                 console.log("school is "+grievanceId.school)
//                 this.props.navigation.navigate('Chat',grievanceId);  
//             }
//           });
//     });


//     this.messageListener = firebase.messaging().onMessage((message) => {
//     //process data message
//     console.log(JSON.stringify(message));
//     });
  
//    }
// }

// showAlert = (title, message) => {
//   Alert.alert(
//     title,
//     message,
//     [
//       {text: 'OK', onPress: () => console.log('OK Pressed')},
//     ],
//     {cancelable: false},
//   );
// }
  