import React from 'react';
import {Text , View ,AsyncStorage , TouchableOpacity , Button,ActivityIndicator , StatusBar} from 'react-native';
import {ListItem} from 'native-base';
import axios from 'axios';
import Toast from 'react-native-simple-toast';




class ListShippedOrders extends React.Component{
		state={
			loading:false
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
			<TouchableOpacity style={styles.viewStyle} onPress={()=>{this.props.navigation.navigate('shippedDetail',{data:props.data})}}>
				<View style={{justifyContent:"center",flexDirection:"row",backgroundColor:"#fff"}}>
					<Text style={{fontSize:22,textDecorationLine:"underline",color:"#17baa1"}}>
						Order ID  
					</Text >
					<Text  style={{fontSize:20,color:"orange"}}>
						: {props.data.order_id}
					</Text>
				</View>
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
		
			</TouchableOpacity>
			)
		}
		}

}


export default ListShippedOrders;


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
		margin:10,
		padding:10,
		flex:1,
		backgroundColor:"#fff",
		elecation:3
	}
}