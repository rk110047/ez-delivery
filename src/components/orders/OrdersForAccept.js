import React from 'react';
import {Text , View ,Image, Button ,AsyncStorage,ActivityIndicator,TouchableOpacity , StatusBar , ScrollView} from 'react-native';
import OrderHeader from './orderheader';
import axios from 'axios';
import ListOrders from './OrderMapFunction';
import Toast from 'react-native-simple-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



var image =require('../assets/IMGBIN_delivery-motorcycle-courier-logistics-service-png_0K01Lans.png')
export default class AcceptOrder extends React.Component{

	state={
		loading:true,
		data:[]
	}


	componentDidMount(){
			this.orderListFetchHandler()
	}

	orderListFetchHandler = async() => {
		let token   =   await AsyncStorage.getItem("token")
		let res		=	await axios.get("http://100.25.15.160/orders/ordersfordelivery/",
				{
					headers:{
						Authorization:token
					}
				})
		this.setState({data:res.data})
		this.setState({loading:false})
		// console.warn(res.data)
		// console.warn(this.state.data)
		
	}

	refreshPageHandler = () =>{
		this.setState({loading:true})
		this.orderListFetchHandler()
	}

	mapOrder=()=>{
		return this.state.data.map((t,key)=>{ return(<ListOrders 
			refreshFun={this.refreshPageHandler} data={t} key={key}/>)})
	}

	render(){
		if(this.state.loading){
			return (
				<View  style={{flex:1}}>
					<OrderHeader   navigation={this.props.navigation}  />
		            <View style={styles.activitycontainer}>
		            	<View style={styles.activityStyle}>
			                <ActivityIndicator size="large" color="#17baa1" />
			                <StatusBar barStyle="default" />
		                </View>
		            </View>
		          </View>
        )
		}
		else if(this.state.data.length>>0){
		return(
			
			<View style={{flex:1}}>
				<OrderHeader Fun={this.refreshPageHandler}  navigation={this.props.navigation}  />
				<ScrollView  style={{}}>
						{this.mapOrder()}
				</ScrollView>
			</View>

			)
		}
		else{
			return(
			
			<View style={{flex:1}}>
				<OrderHeader Fun={this.refreshPageHandler}  navigation={this.props.navigation}  />
				<View style={{flex:1,alignItems:"center",justifyContent:"center"}}> 
					<Image style={{height:300,width:300}} source={image}/>
					 <Text style={{color:"#17baa1",fontSize:18}}>No Orders For Delivery</Text>
					 <TouchableOpacity onPress={this.refreshPageHandler}>
					 	<MaterialCommunityIcons  color="orange" size={50} name="reload"/>
					 </TouchableOpacity>
				</View>
			</View>)

		}
	}
}

const styles = {
	activityStyle:{
		padding:30,
		// borderWidth:1,
		borderRadius:5,
		backgroundColor:"#eee",
		borderColor:"#17baa1"

	},
	activitycontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
   }