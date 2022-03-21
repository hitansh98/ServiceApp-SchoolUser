import React, { Component } from 'react';

import {
  View,
  Platform,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableOpacity, 
  StyleSheet
} from 'react-native';

import { Container, Header, Content, List, ListItem, Text,Card, Icon} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';



const styles = StyleSheet.create({

  bigScroll:{
    flex:1,
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
    marginBottom:3,
    marginHorizontal:10
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
    fontFamily: 'Montserrat-Bold',
    fontSize:16,
    width:'70%',
    color: 'black',
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


export default class TabSoftware extends Component {
    constructor(props) {
        super(props);
          this.state = {
            items: this.props.items,
            navigate: this.props.navigate,
          }
          console.log(this.state.items);
      }
      
      
    
      renderRow = ({item}) => {
        // console.log(item);
        if(item.itemType=="Software")
        {
            return(
              
              <View style={styles.bigView}>
                <TouchableOpacity onPress={() => { this.state.navigate.navigate('DesktopStatic') }}
                    style={styles.mainButton}>
                    <View style= {styles.innerButtonNameView}>
                      <Text style={styles.innerTextName}>{item.name}</Text>
                      <Icon type={item.iconType} name={item.iconName} style={{fontSize: 50, color:'black', alignSelf: 'center', alignSelf:'flex-start'}} />
                    </View>
                    
                    
                    <View style= {styles.innerButtonModelOuterView}>
                        <View style={styles.innerButtonModelInnerView}>
                            <Text style={styles.innerTextModel}>{item.modelNo}</Text>
                            <Text style={styles.innerTextSerial}>{item.serialNo}</Text>
                        </View>
                        
                    </View>
                </TouchableOpacity >
                </View>
            );
        }
        
    }


    render() {
      return (
        <ScrollView style={styles.bigScroll}>
            <FlatList style={styles.mainFlatlist}
                data={this.state.items}
                renderItem={this.renderRow}
                keyExtractor={(item) => item._id}
                numColumns={2}
                horizontal={false}
            />
        </ScrollView>
      );
    }
  }