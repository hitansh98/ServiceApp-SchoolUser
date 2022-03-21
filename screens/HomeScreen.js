import React from 'react';
import {SafeAreaView,Alert, Image,View, TouchableOpacity, RefreshControl, AsyncStorage, FlatList,StyleSheet} from 'react-native';
import User from '../User';
import firebase from 'react-native-firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { FloatingAction } from 'react-native-floating-action';
import Loader  from '../loader';
import { Container, Header, Content, Text,Form, Item,Icon, Tabs, Tab, Input, Label, Button, Fab } from 'native-base';
// import { Permissions, Notifications } from 'react-native-unimodules';

const styles = StyleSheet.create({

    bigScroll:{
        backgroundColor:"#EFF7F6",
    },

    mainButton: {
        flex: 1.0,
        flexDirection: 'column',
    },

    mainTouchable:{
        flex: 1.0,
        flexDirection: 'row-reverse',
        padding:18,
        margin:8,
        borderColor:'#5E5E5E',
        borderWidth:1,
        height: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        justifyContent: 'center'
    },

    mainFlatlist:{
        paddingTop:5,
        margin:5,
        height:'100%'
      },

    innerButtonNameView:{
        flex:1,
        flexDirection:'row',
        
    },
    innerIconView:{
        flex:3,
        flexDirection:'row',
    },

    icons:{
        flex:3,
        alignContent:'center',
        fontSize:60,
        textAlign:'center',
        alignSelf:'center',
        color:'#A9A9A9',
    },

    badge:{
        color:'red',
        fontSize:50,
        position:'relative',
        justifyContent:'flex-end',

    },

    innerButtoninnerNameView:{
        flex:8,
        flexDirection:'column',
        justifyContent:'center'
    },

    nameText:{
        fontSize:16,
        fontFamily:"Montserrat-Bold",
        textTransform:'capitalize'
    },

    idText:{
        fontSize:14,
        fontFamily:"Montserrat-SemiBold"
    },

    statusText:{
        fontSize:13,
        fontFamily:"Montserrat-Medium",
        textTransform: 'capitalize'
    },


});

const actions = [
    {
        text: "Refresh Data",
        icon: require("../images/student.png"),
        color: "#567672",
        name: "bt_refresh",
        buttonSize: 45,
        position: 1
    },
    {
      text: "Logout",
      icon: require("../images/logout.png"),
      color: "#567672",
      name: "bt",
      buttonSize: 45,
      position: 2
    }
  ];

export default class HomeScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return{
            title: `${User.schoolName}`,
            headerStyle:{
                backgroundColor:"#567672",
                elevation: 0,
                height:90,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: 'Montserrat-Bold',
                fontSize:17
              },
        }
    }

    state = {
        users: [],
        chatList: [],
        isLoading: true,
        isRefreshing: false,
        active:false,
        buttonOpacity: 0
    }

    onRefresh = async() =>{
        this.setState({isLoading:true, chatList:[]});
        await this.getData();
    }

    getData = async() =>{
        let dbRef = await firebase.database().ref('grievances').child(User.phone).once('value').then((val) => {
            let grievances = val.val();
            let disKeys = Object.keys(grievances)
            for(let i=0; i<disKeys.length; i++){
                this.setState((prevState) => {
                    return {
                        chatList: [...prevState.chatList, grievances[disKeys[i]]],
                        isLoading: false
                    }
                });
            }
        });
    }
    componentWillMount = async() => {

        await this.getData();
        
        // let dbRef1 = firebase.database().ref('users');
        // dbRef1.on('child_added', (val) => {
        //     let person = val.val();
        //     console.log(val+ " "+val.key);
        //     // console.log("I am here "+ person);
        //     //Don't show logged in user in list
        //     if(person.phone === User.phone){
        //         User.name = person.name
        //     }
        //     else{
        //         this.setState((prevState) => {  
        //             return {
        //                 users: [...prevState.users, person],
        //                 isLoading: false
        //             }
        //         });
        //     }

        //     // console.log(this.state.users[0]);
        
        // });
        // this.registerForPushNotificationsAsync();

    
    }
    renderIcon = (item) =>{
        if(item.service=="1234567890"){
            return(<Icon style={[styles.icons, {color:'#7ecb20'}]} name="robot" type="MaterialCommunityIcons"></Icon>);
        }
        else if(item.isTicket){
            return(<Icon style={styles.icons} name="ticket-confirmation" type="MaterialCommunityIcons" ></Icon>);
        }
        else{
            return(<Icon style={styles.icons} name="chat-processing" type="MaterialCommunityIcons"></Icon>);
        }
        
    }
    
    renderName = (item) => {
            return(<Text style={styles.nameText}>{item.itemName+"-"+item.itemId+"-"+item.grievanceId}</Text>);
            
    }
        
    renderID = (item) =>
    {
        return(<Text style={styles.idText}>{item.service+"  "+item.serviceName}</Text>);
    }
    
    renderStatus = (item) =>
    {
        if(item.status=="open")
        {
            return(<Text style={[styles.statusText, {color:'green'}]}>{"Status: "+item.status}</Text>); 
        }
        else{
            return(<Text style={[styles.statusText, {color:'red'}]}>{"Status: "+item.status}</Text>); 
        }
        
    }

    renderOpenTime = (item) =>
    {
        return(<Text style={styles.statusText}>{"Opened on: "+item.openTime}</Text>);
    }

    renderCloseTime = (item) =>
    {
        if(item.status=="open"){
            return;
        }
        else{
            return(<Text style={styles.statusText}>{"Closed on: "+item.closeTime}</Text>);
        }
    }

    renderDescription = (item) =>
    {
        if(!item.description){
            return(<Text style={styles.statusText}>{"Description: Not Set"}</Text>);
        }
        else{
            return(<Text style={styles.statusText}>{"Description: "+item.description}</Text>)
        }
    }

    renderBadge = (item) => {
        if(!item.isBadgeVisible){
            return;
        }
        else{
            return(
                <View style={{position:'absolute', alignSelf:'center', paddingLeft:"230%", paddingBottom:"230%"}}> 
                    <Image style={{width:25, height:25}} source={require('../images/red-dot1.png')}></Image>
                </View> 
            );
        }
    }

    handleLongPress = (item) =>{
        console.log("entered long press state");
        
    }

    
    
    
    renderRow = ({item}) => {
        // console.log(item);
        return(
                <TouchableOpacity>
                    
                    <TouchableOpacity 
                    
                    onPress={() =>{
                    
                    if(item.service != "1234567890"){
                        //item.isBadgeVisible = false
                        if(item.isBadgeVisible){
                            item.isBadgeVisible = !item.isBadgeVisible;
                        }
                        let index=0;
                        for(let i=0; i<this.state.chatList.length; i++){
                            if(item.grievanceId === this.state.chatList[i].grievanceId){
                                index=i;
                                break;
                            }
                        }
                        this.state.chatList[index] = item;
                        this.setState({
                            chatList: this.state.chatList,
                        });
                        this.props.navigation.navigate('Chat', item);
                    }else{
                        this.props.navigation.navigate('Dialog', item);
                    }
                }} style={styles.mainTouchable}>
                    
                <View style={styles.mainButton}> 
                
                    {
                        
                            
                        <View style={styles.innerButtonNameView}>
                            <View style={styles.innerIconView}>
                                {this.renderIcon(item)}
                                {this.renderBadge(item)}
                            </View>
                            
                            <View style={styles.innerButtoninnerNameView}>
                                {
                                    this.renderName(item)}
                                    {this.renderID(item)}
                                    {this.renderStatus(item)}
                                    {this.renderOpenTime(item)}
                                    {this.renderCloseTime(item)}
                                    {this.renderDescription(item)
                                }
                            </View>
                        </View>
                        
                        // console.log(this.renderElement(item)),
                        
                    }           
                </View>   
            </TouchableOpacity>
                                                                                    
        </TouchableOpacity>
     );      
    
            
            
        
    }

    // registerForPushNotificationsAsync = async (currentUser) => {
    //     const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    //     let finalStatus = existingStatus;

    //     // only ask if permissions have not already been determined, because
    //     // iOS won't necessarily prompt the user a second time.
    //     if (existingStatus !== 'granted') {
    //         // Android remote notification permissions are granted during the app
    //         // install, so this will only ask on iOS
    //         const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //         finalStatus = status;
    //     }

    //     // Stop here if the user did not grant permissions
    //     if (finalStatus !== 'granted') {
    //         return;
    //     }

    //     // Get the token that uniquely identifies this device
    //     let token = await Notifications.getExpoPushTokenAsync();

    //     // POST the token to our backend so we can use it to send pushes from there
    //     var updates = {}
    //     updates['/expoToken'] = token
    //     await firebase.database().ref('/users/' + User.phone).update(updates)
    //     //call the push notification 
    // }
    logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

   
    renderFABIcon =() =>{
        if(this.state.active){
            return(<Icon name="ios-close" style={{fontSize:45, color:"#FFFFFF", position:'absolute'}} color="#567672"></Icon>);
        }
        else{
            return(<Icon name="ios-add" style={{fontSize:45, color:"#FFFFFF", position:'absolute'}} color="#567672"></Icon>);
        }
    }
    render(){
        return(
            <Container>
            <Content style={styles.bigScroll}>
                
            <Loader loading={this.state.isLoading}/> 
                <FlatList
                    data={this.state.chatList.sort((x,y) => x.isBadgeVisible - y.isBadgeVisible).reverse()}
                    renderItem={this.renderRow}
                    extraData={this.state}
                    keyExtractor={(item) => item.grievanceId}
                    style={styles.mainFlatlist}
                />

            {console.log(this.state.chatList)}
            </Content>

            <FloatingAction
                color="#567672"
                actions={actions}
                onPressItem={name => {
                    if(name=="bt"){
                     this.logOut()
                    }
                    if(name=="bt_refresh"){
                        this.onRefresh();
                    }
                    console.log(`selected button: ${name}`);
                }}
            />    
                
            
            </Container>
        );
    }
}
// keyExtractor={(item) => item.key}

// [0402mobi&