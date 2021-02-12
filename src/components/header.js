import React from 'react';
import {View,Text , StyleSheet , Button , ScrollView} from 'react-native';
import {Header ,Item ,  Input} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';





export default class AppHeader extends React.Component{

	render(){
		return(
			<Header style={styles.headerStyle}>
    
                         <MaterialCommunityIcons style={{color:"white",padding:12}}
                         			size={25}name="menu" 
                         			onPress={()=>{this.props.navigation.toggleDrawer()}}/>

                         <View style={{padding:10,flexDirection:"row"}}>
                              <Text style={{color:'orange',fontSize:25,fontStyle:"italic",fontWeight:'bold'}}>EZ</Text>
                               <Text style={{color:'#17baa1',fontSize:25,fontStyle:"italic",fontWeight:'bold'}}>Delivery</Text>
                        </View>
                         <MaterialCommunityIcons style={{color:"white",padding:12}}
                         			size={25}name="account" 
                         			onPress={()=>{this.props.navigation.navigate("Profile")}}/>
                 
                </Header>
			)
	}
}

const styles = StyleSheet.create({
	headerStyle:{
		flexDirection:'row',
		backgroundColor:'black',
		justifyContent:"space-between"
           
		
      
		},
      viewStyle:{

      	backgroundColor:'orange',
      }




})