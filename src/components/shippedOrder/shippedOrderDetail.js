import React from 'react';
import axios from 'axios';
import { View ,ScrollView, Text ,TouchableOpacity, Button , Image , ActivityIndicator , StatusBar} from 'react-native';
import {ListItem} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Linking from 'expo-linking';
import Toast from 'react-native-simple-toast';


  




class  ShippedOrderDetail extends React.Component{


	state={
		data:{},
		customer:{},
		shipping:{},
		cart:{},
		product:[],
		shop:{},
		token:"",
		loading:false

	}


	componentDidMount(){
	    this.getTokenhandler()
	  }

	  async getTokenhandler(){
	      var self= this;
	      let token = await AsyncStorage.getItem('token')
	      this.setState({token:token})
	      const {data} 	=	this.props.navigation.state.params;
	      this.setState({data:data})
	      this.setState({customer:data.customer})
	      this.setState({shipping:data.shipping_address})
	      this.setState({cart:data.cart})
	      this.setState({product:data.cart.product})
	      this.setState({shop:data.shop})
	    }

	
	productMapHandler(){
		// const {data} 	=	this.props.navigation.state.params;
		var data = this.state.product
		return this.state.product.map((t,key)=>{
			return(
				<View style={styles.container}>
					<ListItem>
						<View>
							<Image style={styles.imgStyle}
							source={{uri:t.product.product_image}}/>
							
						</View>
						<View style={{margin:5,flex:1}} >
							<Text style={{marginLeft:50}}>{t.product.product_name}</Text>
							<Text style={{marginLeft:50,color:"#17baa1",fontSize:15,fontWeight:"bold"}}>₹{t.product.product_price}</Text>
							<View style={{flexDirection:"row",marginLeft:50}}>
								<Text>Qty : {t.quantity}</Text>
				
							</View>
						</View>
					</ListItem>
				</View>

				)
		}
		)
	}

	_handlePress = () => {
    Linking.openURL(`tel:${this.state.shop.contact}`);
  };

  _handlePress4 = () => {
    Linking.openURL(`mailTo:${this.state.shop.email_address}`);
  };


  _handlePress2 = () => {
    Linking.openURL(`tel:${this.state.shipping.phone_number}`);
  };

   _handlePress3 = () => {
    Linking.openURL(`tel:${this.state.shipping.alternate_phone_number}`);
  };

 
	render(){
		
	if(this.state.loading){
			return (
            <View style={styles.container}>
            	<View style={styles.activityStyle}>
	                <ActivityIndicator size="large" color="#17baa1" />
	                <StatusBar barStyle="default" />
                </View>
            </View>
        )
		}
		else{
			return(
				<View style={{flex:1}}>
					<View style={styles.container1}>	
						<Icon style={{color:"white",padding:12}}  
	                         			size={30}name="md-arrow-back" 
	                         			onPress={()=>{this.props.navigation.goBack()}}/>
	                        
					</View>
				<ScrollView>
					<View style={{backgroundColor:"#eee"}}>
										<View style={{backgroundColor:"#fff",margin:10,borderWidth:2,borderColor:"#eee",elevation:3}}>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Order ID:</Text>
									<Text style={styles.textStyle2} >{this.state.data.order_id}</Text>
							
						</ListItem>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Order Status:</Text>
									<Text style={styles.textStyle2} >{this.state.data.order_status}</Text>
							
						</ListItem>
						<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Delivery Type:</Text>
									<Text style={styles.textStyle2} >{this.state.data.delivery_status}</Text>
							
						</ListItem>
					</View>
					<View style={{backgroundColor:"#fff",margin:10,borderWidth:2,borderColor:"#eee",elevation:3}}>
							<View style={{alignItems:"center",fontStyle:"italic"}}>
								<Text style={{fontSize:25,color:"#17baa1"}}>Customer Details</Text>
							</View>
							<View>
								<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Customer Name:</Text>
									<Text style={styles.textStyle2} >{this.state.shipping.name}</Text>
							
								</ListItem>
								<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1}>Shipping Address:</Text>
									<Text style={styles.textStyle2}>{this.state.shipping.address_line_1},</Text>
									<Text style={styles.textStyle2}>{this.state.shipping.address_line_2},</Text>
									<Text style={styles.textStyle2}>{this.state.shipping.city},</Text>
									<Text style={styles.textStyle2}>{this.state.shipping.state},</Text>
									<Text style={styles.textStyle2}>{this.state.shipping.zip_code}</Text>
								</ListItem>
								<ListItem  style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1}>Contact Customer:</Text>
									<TouchableOpacity style={{flexDirection:"row"}} onPress={this._handlePress2}>
										<MaterialCommunityIcons name="phone" size={25}/>
										<Text style={styles.textStyle2}>{this.state.shipping.phone_number}</Text>
									</TouchableOpacity>
									<TouchableOpacity style={{flexDirection:"row"}} onPress={this._handlePress3}>
										{this.state.shipping.alternate_phone_number ?<MaterialCommunityIcons name="phone" size={25}/>: null }
										{this.state.shipping.alternate_phone_number ?<Text style={styles.textStyle2}>{this.state.shipping.alternate_phone_number}</Text>:null}
									</TouchableOpacity>
								</ListItem>
								</View>

						</View>
						<View style={{backgroundColor:"#fff",margin:10,borderWidth:2,borderColor:"#eee",elevation:3}}>
							<View style={{alignItems:"center",fontStyle:"italic",}}>
								<Text style={{fontSize:25,color:"#17baa1"}}>Shop Details</Text>
								<Image  style={styles.imgStyle2} source={{uri:this.state.shop.shop_image}}/>
							</View>
							<View>
								<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1} >Shop Name:</Text>
									<Text style={styles.textStyle2} >{this.state.shop.shop_name}</Text>
								</ListItem>
								<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1}>Shop Address:</Text>
									<Text style={styles.textStyle2}>{this.state.shop.address_line_1},</Text>
									<Text style={styles.textStyle2}>{this.state.shop.address_line_2},</Text>
									<Text style={styles.textStyle2}>{this.state.shop.town_city}</Text>
								</ListItem>
								<ListItem  style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1}>Contact:</Text>
									<TouchableOpacity style={{flexDirection:"row"}} onPress={this._handlePress}>
										<MaterialCommunityIcons name="phone" size={25}/>
										<Text style={styles.textStyle2}>{this.state.shop.contact}</Text>
									</TouchableOpacity>
								</ListItem>
								<ListItem  style={{alignItems:"flex-start",flexDirection:"column"}}>
									<Text style={styles.textStyle1}>Email:</Text>
									<TouchableOpacity style={{flexDirection:"row"}} onPress={this._handlePress4}>
										<MaterialCommunityIcons name="email" size={25}/>
										<Text style={styles.textStyle2}>{this.state.shop.email_address}</Text>
									</TouchableOpacity>
								</ListItem>
								</View>

						</View>
						<View style={{padding:10,margin:10,backgroundColor:"#fff",borderWidth:2,borderColor:"#eee",elevation:3}}>
							<View style={{alignItems:"center",fontStyle:"italic"}}>
						    	<Text style={{fontSize:25,color:"#17baa1"}}>Order Details</Text>
						    </View>
							{this.productMapHandler()}
							<View style={{alignItems:'center'}}>
									<Text style={styles.SummaryStyle}> Order Summary</Text>
										<ListItem>
											<Text>Total Items :-{this.state.cart.total_items}</Text>
										</ListItem>
							</View>
						</View>
						
					</View>
					</ScrollView>
				</View>
						
				
				)
			}
	}
}

export default ShippedOrderDetail;



const styles = {
	container1:{
		width:"100%",
		flexDirection:"row",
		justifyContent:"space-between",
		backgroundColor:"black"
	},
	activityStyle:{
		padding:30,
		// borderWidth:1,
		borderRadius:5,
		backgroundColor:"#fff",
		borderColor:"#17baa1"

	},
	activitycontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
	container:{
		backgroundColor:'#eee',
		margin:5,
		
		borderColor:"#eee",
		borderWidth:2,
		elevation:3


},
imgStyle:{
	height:100,
	width:100,
	borderWidth:2,
	borderColor:"#eee"

},
imgStyle2:{
	height:300,
	width:300,
	borderWidth:2,
	borderColor:"#eee"

},
SummaryStyle:{
		alignItems:"center", 
		color:"grey"},

buttonStyle:{
	flexDirection:"row",
	backgroundColor:"#17baa1",
	alignItems:"center",
	padding:5,
	borderRadius:5
	},
buttonStyle2:{
	flexDirection:"row",
	backgroundColor:"red",
	alignItems:"center",
	padding:5,
	borderRadius:5
	},
	textStyle1:{
		fontSize:20,
		color:"#17baa1"
	},
	textStyle2:{
		fontSize:15,
		color:"orange"
	}
}



