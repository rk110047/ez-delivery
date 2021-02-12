import React from 'react';
import {Text , View , Button ,AsyncStorage , TouchableOpacity, ActivityIndicator , StatusBar , ScrollView} from 'react-native';
import ShippedOrderHeader from './shippedOrdersHeader';
import axios from 'axios';
import ListShippedOrders from './shippedOrdersList';
import Toast from 'react-native-simple-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



export default class ShippedOrders extends React.Component{

	state={
		loading:true,
		data:[]
	}


	componentDidMount(){
			this.orderListFetchHandler()
	}

	orderListFetchHandler = async() => {
		let token   =   await AsyncStorage.getItem("token")
		let res		=	await axios.get("http://100.25.15.160/orders/ordersfordelivery/shipped/",
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
		return this.state.data.map((t,key)=>{ return(<ListShippedOrders
			navigation={this.props.navigation} 
			refreshFun={this.refreshPageHandler} data={t} key={key}/>)})
	}

	render(){
		if(this.state.loading){
			return (
				<View  style={{flex:1}}>
					<ShippedOrderHeader   navigation={this.props.navigation}  />
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
			<View style={{flex:1,elevation:3}}>

				<ShippedOrderHeader Fun={this.refreshPageHandler}  navigation={this.props.navigation}  />
				<ScrollView  style={{}}>
					
						{this.mapOrder()}
				
				</ScrollView>
			</View>

			)
		}
		else{
			return(
			<View style={{flex:1,elevation:3}}>

				<ShippedOrderHeader Fun={this.refreshPageHandler}  navigation={this.props.navigation}  />
				<View style={{flex:1,alignItems:"center",justifyContent:"center"}}> 
					 <Text style={{color:"#17baa1",fontSize:18}}>No Order Delivered</Text>
					 <TouchableOpacity onPress={this.refreshPageHandler}>
					 	<MaterialCommunityIcons  color="orange" size={50} name="reload"/>
					 </TouchableOpacity>
				</View>
			</View>
			)
		}
	}
}

const styles = {
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
   }