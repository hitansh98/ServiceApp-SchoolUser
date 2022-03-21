import React from 'react';
import { StyleSheet, View, TextInput,Image,KeyboardAvoidingView, RefreshControl, Dimensions,
TouchableOpacity, Alert, AsyncStorage, SafeAreaView, FlatList} from 'react-native';
import User from '../User';
import firebase, { Notification } from 'react-native-firebase';
import TabHardware from './TabHardware';
import TabSoftware from './TabSoftware';
import { FloatingAction } from 'react-native-floating-action';
import Loader from '../loader';

import { Container, Header, Content, Text,Form, Item, Icon, Tabs, Tab, Input, Label, Button, Fab } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';



const styles = StyleSheet.create({

  bigScroll:{
    backgroundColor:"#EFF7F6",
  },

  mainFlatlist:{
    backgroundColor:"#EFF7F6",
    paddingTop:5,
    margin:5 
  },

  bigView:{
    backgroundColor:"#EFF7F6",
    flex: 1,
    flexDirection: 'row',
    height: 150,
  },

  mainButton :{
    flex: 1.0,
    flexDirection: 'column',
    padding:8,
    margin:8,
    borderColor:'#5E5E5E',
    borderWidth:1,
    height: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    justifyContent: 'center'
  },
  schoolNameView:{
    justifyContent:'center',
    marginTop:10,
    marginBottom:3
  },

  innerButtonNameView:{
    flex:3,
    width: "auto",
    flexDirection:"row",
    alignContent: 'flex-start',
  },
  innerButtonModelOuterView:{
    flex:2,
    width: 'auto',
    flexDirection:"row",
    justifyContent: 'flex-end'
  },
  innerButtonModelInnerView:{
    flex:2,
    width: 'auto',
    flexDirection:"column",
    justifyContent: 'center'
  },
  innerTextName:{
    paddingLeft:3,
    fontFamily: 'Montserrat-SemiBold',
    fontSize:15,
    width:'70%',
    color: '#5a5a5a',
    alignSelf: 'center'
  },
  innerTextModel:{
    fontFamily: 'Montserrat-Regular',
    fontSize:12,
    color: 'black',
    paddingLeft:3,
  },
  innerTextSerial:{
    fontFamily: 'Montserrat-Regular',
    fontSize:12,
    color: 'black',
    paddingLeft:3,
  },
  innerTextCount:{
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    fontSize:30,
    paddingRight:"5%",
   
  },
  schoolName:{
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    fontSize: 16,
    textAlign:'center'
  }

});

const actions = [
  {
    text: "My Issues",
    icon: require("../images/student.png"),
    color: "#567672",
    name: "bt_myissues",
    buttonSize: 45,
    position: 1
  },
  {
    text: "Logout",
    icon: require("../images/logout.png"),
    color: "#567672",
    name: "bt_logout",
    buttonSize: 45,
    position: 2
  }
];


export default class ProblemScreen1 extends React.Component {

  constructor(props){
    super(props);
    // console.log("in constructor");
    this.state ={
      itemList: [],
      active:false,
      buttonOpacity: 0,
      isLoading: true,
      hasUnreadMessage: false,
      masterItemList: []
    }
    // console.log("while leaving cons isLoading is:" + this.state.isLoading);
  }

  

 componentWillMount = async() => {
    // let tempList = [];
    //console.log("isLoading is:" + this.state.isLoading);
    // console.log("user code is"+User.code);
    
    // console.log("in cwm");
    
    // console.log("master list: "+ this.state.masterItemList);

    let dbfetch2 = await firebase.database().ref('items').once('value').then((val) => {
      // console.log("before"+JSON.stringify(val));
      // console.log(Object.keys(val.val()));
      let disKeys = Object.keys(val.val());
      let val1 =  val.val();
      // console.log("after"+JSON.stringify(val1));
      for(let i=0; i<disKeys.length; i++){
        // console.log(disKeys[i]);
        // console.log(val1["10001"]);
        this.setState((prevState) => {
          return {
            masterItemList: [...prevState.masterItemList ,val1[disKeys[i]]], 
          }
        });
      }
      // console.log("master items are "+JSON.stringify(masterItem))
      // console.log("master items are:"+JSON.stringify(masterItem));
      
    });

    // console.log("in cwm dbfetch2 results: "+JSON.stringify(this.state.masterItemList));
    let dbfetch3 = await firebase.database().ref('schoolitems').child(User.code).child('items').once('value').then((val) => {
      let disKeys = Object.keys(val.val())
      let val1 =  val.val();
      for(let i=0; i<disKeys.length; i++){
        // console.log(disKeys[i]);
        // console.log(val1["10001"]);
        this.setState((prevState) => {
          return {
            itemList: [...prevState.itemList ,val1[disKeys[i]]],
            isLoading: false 
          }
        });
      }
    });
  
    
    // console.log("in cwm dbfetch3 results: "+JSON.stringify(this.state.itemList));
    // let dbfetch = await firebase.database().ref('grievances').child(User.phone).on('child_added' , (val) => {
    //   this.val = val.val();
    //   let griev = val.val();
    //   // console.log("grievance id: "+griId)
    //   // console.log("grievanxcces are: "+JSON.stringify(griev));
    //   if(griev.isBadgeVisible){
    //     this.state.hasUnreadMessage = true;
    //     return this.checkUnread(griev);
    //   }
    //   // console.log("will mount unread message is:"+this.state.hasUnreadMessage);
    // });
    // console.log("in cwm dbfetch3 results: "+JSON.stringify(this.state.itemList));
    // console.log("isLoading updated is:" + this.state.isLoading);
  }

  // checkUnread = (item) => {
  //   //console.log("did mount unread message is:"+this.state.hasUnreadMessage);
  //     if(this.state.hasUnreadMessage){
  //       this.showAlert(item);
  //     }
  // }
    static navigationOptions = ({navigation}) => {
        return{
            title: User.schoolName,
            headerStyle:{
              backgroundColor:"#567672",
              elevation: 0,
              height:70
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize:17,
              textAlign:'center',
              alignSelf:'center'
            },
          
        }
    }

    _logOut = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
  }

  //   showAlert = (item) => {
  //   Alert.alert(
  //     "New Message",
  //     `You have a new message from ${item.serviceName} with ID ${item.grievanceId}, go to My Issues by clicking the + icon.`,
  //     [
  //       {text: 'OK', onPress: () =>{
  //         console.log('OK Pressed');
  //         this.state.hasUnreadMessage = false;
  //         console.log("after OK state has new message "+this.state.hasUnreadMessage);
  //       }},
  //     ],
  //     {cancelable: false},
  //   );
  // }
  navigateToStatic = (item) => {
    if(item.itemname == "LG Display"){
      this.props.navigation.navigate('DesktopStatic', {"data":item})
    }
    else if(item.itemname == "Logitech Keyboard and Mouse"){
      this.props.navigation.navigate('KeyboardStatic', {"data":item})
    }
  }

  renderHardwareRow = ({item}) => {
    // console.log(item);
    let itemArr = this.state.masterItemList.filter( (el) => {
      return(el.name == item.itemname);
    });
    // console.log("i found the isloading to be: "+this.state.isLoading);
    if(item.itemType=="Hardware")
    {
      // console.log("in the renders ");
        // console.log("master list: "+JSON.stringify(this.state.masterItemList));
        // console.log("item list: "+JSON.stringify(this.state.itemList));
        // AsyncStorage.setItem('masterItemList', this.state.masterItemList);
        // AsyncStorage.setItem('itemList', this.state.itemList);
        // console.log("item array is: "+JSON.stringify(itemArr));
        return(
          <ScrollView style={styles.bigScroll}>
          <View style={styles.bigView}>
            <TouchableOpacity onPress={() =>{
                    this.props.navigation.navigate('DesktopStatic', {"data":item});
                }}
                style={styles.mainButton}>

                <View style= {styles.innerButtonNameView}>
                  <Text style={styles.innerTextName}>{item.itemname}</Text>
                  <Icon type="MaterialCommunityIcons" name={itemArr[0].iconName} style={{fontSize: 50, color:'#5a5a5a', alignSelf: 'center', alignSelf:'flex-start'}} />
                </View>
                
                
                <View style= {styles.innerButtonModelOuterView}>
                    <View style={styles.innerButtonModelInnerView}>
                        <Text style={styles.innerTextModel}>{item.modelNo}</Text>
                        <Text style={styles.innerTextSerial}>{item.serialNo}</Text>
                    </View>
                    
                </View>
            </TouchableOpacity >
            </View>
            </ScrollView>
        );
    }  
  }

  renderSoftwareRow = ({item}) => {
    let itemArr = this.state.masterItemList.filter( (el) => {
          return(el.name == item.itemname);
      });
    if(item.itemType=="Software")
    {
        return(
          <ScrollView style={styles.bigScroll}>
          <View style={styles.bigView}>
            <TouchableOpacity onPress={this.navigateToStatic(item)}
                style={styles.mainButton}>
                <View style= {styles.innerButtonNameView}>
                  <Text style={styles.innerTextName}>{item.itemname}</Text>
                  <Icon type="MaterialCommunityIcons" name={itemArr[0].iconName} style={{fontSize: 50, color:'#5a5a5a', alignSelf: 'center', alignSelf:'flex-start'}} />
                </View>
                
                
                <View style= {styles.innerButtonModelOuterView}>
                    <View style={styles.innerButtonModelInnerView}>
                        <Text style={styles.innerTextModel}>{item.modelNo}</Text>
                        <Text style={styles.innerTextSerial}>{item.serialNo}</Text>
                    </View>
                </View>
            </TouchableOpacity >
            </View>
            </ScrollView>
        );
    }   
  }

  renderFABIcon =() =>{
    if(this.state.active){
        return(<Icon name="ios-close" style={{fontSize:45, color:"#FFFFFF", position:'absolute'}} color="#567672"></Icon>);
    }
    else{
        return(<Icon name="ios-add" style={{fontSize:45, color:"#FFFFFF", position:'absolute'}} color="#567672"></Icon>);
    }
}
    // <Header hasTabs />

  render() {
    const {height: screenHeight} = Dimensions.get('window');
    return (
      <Container style={{backgroundColor:"#EFF7F6"}}>
          <Content style={styles.bigScroll}>
          <Loader loading={this.state.isLoading} />
          <Tabs tabBarPosition="top" style={{backgroundColor:"#EFF7F6"}} tabBarUnderlineStyle={{backgroundColor:"#39D075"}}>
            <Tab heading="Hardware" tabStyle={{ backgroundColor:"#567672"}} style={{backgroundColor:"#EFF7F6"}} activeTabStyle={{backgroundColor:"#567672"}} textStyle={{color:"#B9D3D0",fontFamily:"Montserrat-Bold", textTransform:'uppercase', fontSize: 12}} activeTextStyle={{color:"#39D075",fontFamily:"Montserrat-Bold", textTransform:'uppercase', fontSize: 12}}>
            
              <FlatList style={styles.mainFlatlist}
                  data={this.state.itemList}
                  extraData={this.state}
                  renderItem={this.renderHardwareRow}
                  keyExtractor={(item) => item._id}
                  numColumns={2}
                  horizontal={false}
                  
              />
            
            </Tab>
            <Tab heading="Software" tabStyle={{ backgroundColor:"#567672"}} style={{backgroundColor:"#EFF7F6"}} activeTabStyle={{backgroundColor:"#567672"}} textStyle={{color:"#B9D3D0",fontFamily:"Montserrat-Bold", textTransform:'uppercase', fontSize: 12}} activeTextStyle={{color:"#39D075",fontFamily:"Montserrat-Bold", textTransform:'uppercase', fontSize: 12}}>
            
              <FlatList style={styles.mainFlatlist}
                  data={this.state.itemList}
                  extraData={this.state}
                  renderItem={this.renderSoftwareRow}
                  keyExtractor={(item) => item._id}
                  numColumns={2}
                  horizontal={false}
              />
            
            </Tab>
          </Tabs>
        </Content>
        
        <FloatingAction
          color="#567672"
          actions={actions}
          onPressItem={name => {
            if(name=="bt_myissues"){
              this.props.navigation.navigate("Home");
            }
            else if(name=="bt_logout"){
              this._logOut();
            }
            console.log(`selected button: ${name}`);
          }}
        />
         
                
      </Container>
    );
  }
} 