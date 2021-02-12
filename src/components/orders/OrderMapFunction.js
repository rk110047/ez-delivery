import React from 'react';
import {Text , View ,AsyncStorage , Button,ActivityIndicator , StatusBar} from 'react-native';
import {ListItem} from 'native-base';
import axios from 'axios';
import Toast from 'react-native-simple-toast';




class ListOrders extends React.Component{
		state={
			loading:false
		}

		AcceptOrderHandler=async()=>{
			this.setState({loading:true})
			let token   =   await AsyncStorage.getItem("token")
			let res		=	await axios.get(this.props.data.acceptbyperson,
					{
						headers:{
							Authorization:token
						}
					})
			this.setState({data:res.data})
			this.props.refreshFun()
			this.setState({loading:false})
			Toast.show(res.data.message, Toast.LONG)
		   }

		render(){
		let props = this.props
		if(this.state.loading){
			return (
				<View  style={{flex:1}}>
		            <View style={styles.activitycontainer}>
		            	<View style={styles.activityStyle}>
			                <ActivityIndicator size="large" color="#17baa1" />
			                <StatusBar barStyle="default" />
		                </View>
		            </View>
		          </View>
        )
		}
		else{
		return(
			<View style={styles.viewStyle}>
				<View style={{flex:1,flexDirection:"row",justifyContent:"space-between"}}>
					<View style={{width:"50%"}}>
						<ListItem style={{justifyContent:"flex-start"}}>
							<Text>Shop Address</Text>
						</ListItem>
								<Text>
									{props.data.shop.shop_name}
								</Text>
								<Text>
									{props.data.shop.address_line_1}
								</Text>
								<Text>
									{props.data.shop.address_line_2}
								</Text>
								<Text>
									{props.data.shop.town_city}
								</Text>

							
					</View>
					<View style={{width:"50%"}}>
						<ListItem style={{}}>
							<Text>Shipping Address</Text>
						</ListItem>
						<Text>
							{props.data.shipping_address.address_line_1}
						</Text>
						<Text>
							{props.data.shipping_address.address_line_2}
						</Text>
						<Text>
							{props.data.shipping_address.city}
						</Text>
						<Text>
							{props.data.shipping_address.state}
						</Text>
						<Text>
							{props.data.shipping_address.zip_code}
						</Text>
					</View>
				</View>
				<View style={{padding:10}}>
					<Button  onPress={this.AcceptOrderHandler}
						color="#17baa1" title="Accept Order"/>
				</View>
		
			</View>
			)
		}
		}

}


export default ListOrders;


const styles={
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
	viewStyle:{
		borderWidth:2,
		borderColor:"orange",
		margin:5,
		padding:10
	}
}