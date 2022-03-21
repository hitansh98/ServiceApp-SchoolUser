import React from 'react';
import { StyleSheet, View, TextInput,Image,KeyboardAvoidingView, Dimensions,
TouchableOpacity, Alert, AsyncStorage, SafeAreaView, FlatList} from 'react-native';
import User from '../User';
import firebase, { Notification } from 'react-native-firebase';
import TabHardware from './TabHardware';
import TabSoftware from './TabSoftware';

import { Container, Header, Content, Text,Form, Item,Icon, Tabs, Tab, Input, Label, Button, Fab } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import GLOBAL from '../global';


const styles = StyleSheet.create({

  bigScroll:{
    backgroundColor:"#EFF7F6"
  },

  mainFlatlist:{
    paddingTop:5,
    margin:5 
  },

  bigView:{
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
export default class ProblemScreen1 extends React.Component {

  state ={
    itemList: [],
    active:false,
    buttonOpacity: 0,
    isLoading: true,
  }

  

  async componentWillMount(){
    let tempList = [];
    console.log("isLoading is:" + this.state.isLoading);
    firebase.database().ref('items').on('child_added' , (val) => {
      let item = val.val();
      console.log(item);
      GLOBAL.screen1.setState({
         itemList:[...itemList, item],
         isLoading: false
        });
    });
    console.log(GLOBAL.test);
    console.log("isLoading updated is:" + this.state.isLoading);
  }

    static navigationOptions = ({navigation}) => {
        return{
            title: 'Z.P. School, Dhekwad',
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

  renderHardwareRow = ({item}) => {
    // console.log(item);
    if(item.itemType=="Hardware")
    {
        return(
          <ScrollView style={styles.bigScroll}>
          <View style={styles.bigView}>
            <TouchableOpacity onPress={() =>{
                    this.props.navigation.navigate('DesktopStatic');
                }}
                style={styles.mainButton}>

                <View style= {styles.innerButtonNameView}>
                  <Text style={styles.innerTextName}>{item.name}</Text>
                  <Icon type={item.iconType} name={item.iconName} style={{fontSize: 50, color:'#5a5a5a', alignSelf: 'center', alignSelf:'flex-start'}} />
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
    // console.log(item);
    if(item.itemType=="Software")
    {
        return(
          <ScrollView style={styles.bigScroll}>
          <View style={styles.bigView}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('DesktopStatic') }}
                style={styles.mainButton}>
                <View style= {styles.innerButtonNameView}>
                  <Text style={styles.innerTextName}>{item.name}</Text>
                  <Icon type={item.iconType} name={item.iconName} style={{fontSize: 50, color:'#5a5a5a', alignSelf: 'center', alignSelf:'flex-start'}} />
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
      <Container>
          <Content style={styles.bigScroll}>
          <Tabs tabBarPosition="top" tabBarUnderlineStyle={{backgroundColor:"#39D075"}}>
            <Tab heading="Hardware" tabStyle={{ backgroundColor:"#567672"}} activeTabStyle={{backgroundColor:"#567672"}} textStyle={{color:"#B9D3D0",fontFamily:"Montserrat-Bold", textTransform:'uppercase', fontSize: 12}} activeTextStyle={{color:"#39D075",fontFamily:"Montserrat-Bold", textTransform:'uppercase', fontSize: 12}}>
            {this.state.isLoading ? <Text style={{fontFamily:"Montserrat-Regular"}}> Fetching items....... </Text> :
              <FlatList style={styles.mainFlatlist}
                  data={this.state.itemList}
                  renderItem={this.renderHardwareRow}
                  keyExtractor={(item) => item._id}
                  numColumns={2}
                  horizontal={false}
              />
            }
            </Tab>
            <Tab heading="Software" tabStyle={{ backgroundColor:"#567672"}} activeTabStyle={{backgroundColor:"#567672"}} textStyle={{color:"#B9D3D0",fontFamily:"Montserrat-Bold", textTransform:'uppercase', fontSize: 12}} activeTextStyle={{color:"#39D075",fontFamily:"Montserrat-Bold", textTransform:'uppercase', fontSize: 12}}>
            {this.state.isLoading ? <Text> Fetching items....... </Text> :
              <FlatList style={styles.mainFlatlist}
                  data={this.state.itemList}
                  renderItem={this.renderSoftwareRow}
                  keyExtractor={(item) => item._id}
                  numColumns={2}
                  horizontal={false}
              />
            }
            </Tab>
          </Tabs>
        </Content>
        
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#567672' }}
            position="bottomRight"
            onPress={() => {
                  if(this.state.active==false){
                    this.setState({ 
                      active: !this.state.active,
                      buttonOpacity:100
                    })
                  }
                  else{
                    this.setState({ 
                      active: !this.state.active,
                      buttonOpacity:0
                    })}
                  }}>



            {this.renderFABIcon()}
            
            
            

            <Button>
            <Button style={{ backgroundColor: '#3B5998', width:140, marginRight:60, opacity:this.state.buttonOpacity,height:42, backgroundColor: "#567672", borderRadius:16 }} block onPress={()=>this.props.navigation.navigate("Home")}>
                <Text style={{textAlign:'center', color:'#B9D3D0', fontFamily:"Montserrat-Bold", textTransform:'uppercase', fontSize: 12}}>My Issues</Text>
            </Button>
            </Button>


            <Button>
            <Button style={{ backgroundColor: '#3B5998', width:140, marginRight:60, opacity:this.state.buttonOpacity,height:42, backgroundColor: "#567672", borderRadius:16 }} block onPress={()=>this.props.navigation.navigate("Dialog",{'fromLG':'false'})}>
                <Text style={{textAlign:'center', color:'#B9D3D0', fontFamily:"Montserrat-Bold", textTransform:'uppercase', fontSize: 12}}>Raise an Issue</Text>
            </Button>
            </Button>


            <Button>
            <Button style={{ backgroundColor: '#3B5998', width:140, marginRight:60, opacity:this.state.buttonOpacity, height:42, backgroundColor: "#567672", borderRadius:16 }} block onPress={this._logOut}>
                <Text style={{textAlign:'center', color:'#B9D3D0', fontFamily:"Montserrat-Bold", textTransform:'uppercase', fontSize: 12}}>Logout</Text>
            </Button>
            </Button>

          </Fab> 
                
      </Container>
      
    );
  }
}