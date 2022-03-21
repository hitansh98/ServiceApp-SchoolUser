import React from 'react';
import { StyleSheet, View, TextInput,Image,KeyboardAvoidingView, Dimensions,
TouchableOpacity, TouchableHighlight, Alert, AsyncStorage, SafeAreaView} from 'react-native';

import { Accordion, Container, Header, Content, Text,Form, Footer, Item, Tabs, Tab,Icon, Input, Label, Button,Toast, Card, CardItem, Body } from 'native-base';

const styles = StyleSheet.create({
  WebViewContainer: {
    height:250
  },
  container:{
    alignItems: 'center',
    marginHorizontal: 20
  },
});

const quesAns= [
  { id:"1", ques:"1. Do the keyboard and mouse work in BIOS mode?", ans:"Ans. For a mouse, there is no operability in BIOS mode, because it is based entirely on keyboard entry. The keyboard works, though, perfectly fine"},
  { id:"2", ques:"2. Do the keyboard and mouse work in other operating systems(other than Windows) like Linux, MacOS, Debian?", ans:"Yes, these work in all popular operating systems, which includes all stated above."},
  { id:"3", ques:"3. Does the keyboard have a scroll lock option?", ans:"Yes, it does have a scroll lock option"},
]

const dataArray = [
  { title: "Description", content: "The Logitech MK220 Wireless keyboard and mouse combo is what you need if you want a break from the clutter of wires you find on your desk every day. Apart from reducing the mess on your table, the Logitech MK220 black is great for saving up on some space as the keyboard in the combo is about 36 percent smaller than standard keyboards. Despite the small size, all the essential keys are present on the keyboard and they are even adequately-sized to facilitate quick and accurate typing while barely making a sound. The minimalist and sleek design of the wireless keyboard and mouse combo make sure they appear eye-pleasing on your desk while you do the work done efficiently." },
  { title: "Specifications", content: "Brand:	Logitech\Series:	MK220\nColor: Black\nItem Weight:	481 g\nProduct Dimensions:	45.8 x 5.1 x 12.4 cm\nItem model number:	920-003157\nBatteries: 2 AA batteries required\nHardware Platform:  Wireless\nOperating System: Windows\nAverage Battery Life:	24 Months\nConnectivity Type: 2.4_ghz_radio_frequency" },
  { title: "Frequently Asked Questions", content: quesAns}
];

export default class DesktopStaticScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return{
            title: 'LG Screen',
            headerStyle:{
              backgroundColor:"#567672",
              elevation: 0,
              height:90
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold',
              fontSize:17
            },
        }
    }
    constructor(props){
      super(props);
      // console.log(props.navigation.getParam("data"))
      this.state = {
        data : props.navigation.getParam("data")
      } 
      console.log(this.state.data);
      this.state.data["from"]='Keyboard';
    }

    _renderHeader(item, expanded) {
      return (
        <View style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ACFF9C" }}>
        <Text style={{ fontWeight: "600", fontFamily:'OpenSans-Regular', color:"#000" }}>
            {" "}{item.title}
          </Text>
          {expanded
            ? <Icon style={{ fontSize: 18, color:"#000" }} name="remove-circle"/>
            : <Icon style={{ fontSize: 18, color:"#000" }} name="add-circle"/>}
        </View>
      );
    }
    

    _renderContent(item) {
    
        if(item.title!="Frequently Asked Questions"){
          return (
            <Text
              style={{
                backgroundColor: "#D9FFC9",
                padding: 10, 
              }}
            >
            {item.content}
            </Text>
          );
        }
        
        else{
            console.log("content into array is: "+item.content);
            let element1 = item.content[0];
            let element2 = item.content[1];
            let element3 = item.content[2];
            
            return(
              <View style={{paddingHorizontal:10, paddingRight:10, backgroundColor:'#D4FFCC'}}>
  
                <Button light iconRight onPress={() =>
                  Toast.show({
                    text: element1.ans,
                    buttonText: "Okay",
                    duration: 30000
                  })}
                  style={{marginTop:20, borderRadius: 10}}>
                  <Text style={{width:'80%', textTransform:'capitalize', fontFamily:'OpenSans-Regular'}}>{element1.ques}</Text>
                  <Icon name='arrow-forward' />
                  
                </Button>
  
                
  
                <Button light iconRight onPress={() =>
                  Toast.show({
                    text: element2.ans,
                    buttonText: "Okay",
                    duration: 30000
                  })}
                  style={{marginTop:20, borderRadius: 10}}
                  text>
                  <Text style={{width:'80%', textTransform:'capitalize', fontFamily:'OpenSans-Regular'}}>{element2.ques}</Text>
                  <Icon name='arrow-forward' />
                  
                </Button>

                <Button light iconRight onPress={() =>
                  Toast.show({
                    text: element3.ans,
                    buttonText: "Okay",
                    duration: 30000
                  })}
                  style={{marginTop:20, borderRadius: 10}}
                  text>
                  <Text style={{width:'80%', textTransform:'capitalize', fontFamily:'OpenSans-Regular'}}>{element3.ques}</Text>
                  <Icon name='arrow-forward' />
                  
                </Button>


              </View>
            );
        }
    }
    
    render() {
        return (
          <Container>
            <Content>
              <Card>
                
                  <View>
                    <Image style={{width: "100%", height:200}} source={ require('../../images/keyboard.jpg')}></Image>
                  </View> 
              </Card>
                <Card>
                    <CardItem header bordered>
                        <Text style={{fontFamily:"Montserrat-Bold"}}>LG 32LF520A</Text>
                    </CardItem>
                    <CardItem bordered>
                      <Accordion 
                        dataArray={dataArray} 
                        animation={true} 
                        contentStyle={{width:'100%'}}
                        headerStyle={{backgroundColor:'#4C923E', fontFamily:"OpenSans-Black"}}
                        contentStyle={{backgroundColor: '#D4FFCC'}}
                        renderContent={this._renderContent}
                        renderHeader={this._renderHeader} 
                      />
                        
                    </CardItem>
                    </Card>
                    <View style={styles.container}>
                      <TouchableHighlight onPress={() => this.props.navigation.navigate("DisplayPdf")}>
                          <Image style={styles.imagestyle} source={require('../../images/userManual.jpg') } />
                      </TouchableHighlight>
                    </View>
                    
                    </Content>
                {/* <Text> {"\n\n"} </Text> */}

                
                  <View>
                  <Text style={{textAlign:'center', marginTop:10, fontFamily:'Montserrat-Regular', fontSize: 15}}> {"In case you have a question other than the ones listed above in FAQ's, chat with me to solve this issue!"}</Text>
                  <Button block rounded info onPress={()=> this.props.navigation.navigate('Dialog',{"object":this.state.data})} style={{alignSelf:'center', alignContent:"center", width:"60%", marginBottom:13, margin:10}}>
                      <Text> Chat with me! </Text>
                  </Button>
                  </View>
                
          </Container>
        );
      }

}