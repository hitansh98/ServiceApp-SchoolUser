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
  pdfButton:{
    shadowColor:'#000',
    shadowOpacity:1,
    shadowRadius: 3.84,
    elevation:5,
    shadowOffset:{
      width: 0,
    	height: 2,
    },
    width: '40%',
    borderRadius:20,

  }
});

const quesAns= [
  { id:"1", ques:"1. How can I fix the display of my LG Screen?", ans:"Ans. Follow these steps:", steps:"1. Check if display power indication is Red/Blue.\n2. If red, press display power ON button.\n3. If blue, check Input source. If not HDMI1, change to HDMI1."},
  { id:"2", ques:"2. How can i fix an audio issue in my LG Screen?", ans:"Ans. Follow these steps:", steps:"1. Check if the Main Power switch is turned ON.\n2. Ensure that the Screen has not been put on Mute mode.\n3. After this, using the screen's remote, click on the '+' button to increase the volume of the TV."},
  { id:"3", ques:"3. How can I fix the display of my LG Screen?", ans:"Ans. Follow these steps:", steps:"1. Check if display power indication is Red/Blue.\n2. If red, press display power ON button.\n3. If blue, check Input source. If not HDMI1, change to HDMI1."},
  { id:"4", ques:"4. How can I fix the display of my LG Screen?", ans:"Ans. Follow these steps:", steps:"1. Check if display power indication is Red/Blue.\n2. If red, press display power ON button.\n3. If blue, check Input source. If not HDMI1, change to HDMI1."},
  { id:"5", ques:"5. How can I fix the display of my LG Screen?", ans:"Ans. Follow these steps:", steps:"1. Check if display power indication is Red/Blue.\n2. If red, press display power ON button.\n3. If blue, check Input source. If not HDMI1, change to HDMI1."},
  { id:"6", ques:"6. How can I fix the display of my LG Screen?", ans:"Ans. Follow these steps:", steps:"1. Check if display power indication is Red/Blue.\n2. If red, press display power ON button.\n3. If blue, check Input source. If not HDMI1, change to HDMI1."},
  { id:"7", ques:"7. How can I fix the display of my LG Screen?", ans:"Ans. Follow these steps:", steps:"1. Check if display power indication is Red/Blue.\n2. If red, press display power ON button.\n3. If blue, check Input source. If not HDMI1, change to HDMI1."},
  { id:"8", ques:"8. How can I fix the display of my LG Screen?", ans:"Ans. Follow these steps:", steps:"1. Check if display power indication is Red/Blue.\n2. If red, press display power ON button.\n3. If blue, check Input source. If not HDMI1, change to HDMI1."}
]

const dataArray = [
  { title: "Description", content: "New LG 32LF520A smart screen loaded with amazing features and stunning picture quality through active HDR. It is lightweight and has a metallic design. Key features include: IPS display, wide viewing angle, DTS Virtual: X, 20w sound, upscaler, Web OS, AI Launcher (with preview) home dashboard, magic mobile connection, Quad Core Processor, cloud photo and video and 2 way Bluetooth audio playback." },
  { title: "Specifications", content: "Brand:	LG\nModel:	32LF520A\nModel Name:	32LF520A\nModel Year:	2018\nItem Weight:	16.2 Kg\nProduct Dimensions:	6.4 x 123.7 x 71.8 cm\nItem model number:	32LF520A\nOperating System:	webOS\nHardware Interface:	HDMI, USB\nGraphics Coprocessor:	LG Graphic Processor" },
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
      this.state.data["from"]="LGScreen";
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
            let element4 = item.content[3];
            let element5 = item.content[4];
            let element6 = item.content[5];
            let element7 = item.content[6];
            let element8 = item.content[7];
            return(
              <View style={{paddingHorizontal:10, paddingRight:10, backgroundColor:'#D4FFCC'}}>
  
                <Button light iconRight onPress={() =>
                  Toast.show({
                    text: element1.ans+"\n"+element1.steps,
                    buttonText: "Okay",
                    duration: 30000
                  })}
                  style={{marginTop:20, borderRadius: 10}}>
                  <Text style={{width:'80%', textTransform:'capitalize', fontFamily:'OpenSans-Regular'}}>{element1.ques}</Text>
                  <Icon name='arrow-forward' />
                  
                </Button>
  
                
  
                <Button light iconRight onPress={() =>
                  Toast.show({
                    text: element2.ans+"\n"+element2.steps,
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
                    text: element3.ans+"\n"+element3.steps,
                    buttonText: "Okay",
                    duration: 30000
                  })}
                  style={{marginTop:20, borderRadius: 10}}
                  text>
                  <Text style={{width:'80%', textTransform:'capitalize', fontFamily:'OpenSans-Regular'}}>{element3.ques}</Text>
                  <Icon name='arrow-forward' />
                  
                </Button>

                <Button light iconRight onPress={() =>
                  Toast.show({
                    text: element4.ans+"\n"+element4.steps,
                    buttonText: "Okay",
                    duration: 30000
                  })}
                  style={{marginTop:20, borderRadius: 10}}
                  text>
                  <Text style={{width:'80%', textTransform:'capitalize', fontFamily:'OpenSans-Regular'}}>{element4.ques}</Text>
                  <Icon name='arrow-forward' />
                  
                </Button>

                <Button light iconRight onPress={() =>
                  Toast.show({
                    text: element5.ans+"\n"+element5.steps,
                    buttonText: "Okay",
                    duration: 30000
                  })}
                  style={{marginTop:20, borderRadius: 10}}
                  text>
                  <Text style={{width:'80%', textTransform:'capitalize', fontFamily:'OpenSans-Regular'}}>{element5.ques}</Text>
                  <Icon name='arrow-forward' />
                  
                </Button>

                <Button light iconRight onPress={() =>
                  Toast.show({
                    text: element6.ans+"\n"+element6.steps,
                    buttonText: "Okay",
                    duration: 30000
                  })}
                  style={{marginTop:20, borderRadius: 10}}
                  text>
                  <Text style={{width:'80%', textTransform:'capitalize', fontFamily:'OpenSans-Regular'}}>{element6.ques}</Text>
                  <Icon name='arrow-forward' />
                  
                </Button>

                <Button light iconRight onPress={() =>
                  Toast.show({
                    text: element7.ans+"\n"+element7.steps,
                    buttonText: "Okay",
                    duration: 30000
                  })}
                  style={{marginTop:20, borderRadius: 10}}
                  text>
                  <Text style={{width:'80%', textTransform:'capitalize', fontFamily:'OpenSans-Regular'}}>{element7.ques}</Text>
                  <Icon name='arrow-forward' />
                  
                </Button>

                <Button light iconRight onPress={() =>
                  Toast.show({
                    text: element8.ans+"\n"+element8.steps,
                    buttonText: "Okay",
                    duration: 30000
                  })}
                  style={{marginTop:20, marginBottom:20, borderRadius: 10}}
                  text>
                  <Text style={{width:'80%', textTransform:'capitalize', fontFamily:'OpenSans-Regular'}}>{element8.ques}</Text>
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
                
                  <View style={{height: 200, flexWrap:'wrap', justifyContent:'flex-end', alignContent:'flex-end'}}>
                    <Image style={{width: "100%", height:'100%', position: 'absolute'}} source={ require('../../images/LGScreen.jpg')}></Image>
                    
                  </View> 
              </Card>
                <Card style={{width:'100%'}}>
                    <CardItem header bordered>
                        <View style={{flexDirection:'row', height: '100%', width:'100%', justifyContent:'space-between'}} >
                          <Text style={{fontFamily:"Montserrat-Bold"}}>LG 32LF520A</Text>
                          <Button iconLeft dark style={styles.pdfButton} onPress={() => this.props.navigation.navigate("DisplayPdf")}>
                            <Icon name='book' />
                            <Text>User Guide</Text>
                          </Button>
                        </View>
                    </CardItem>
                    <CardItem bordered style={{width:'100%'}}>
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