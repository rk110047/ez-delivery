import React , {Component} from 'react';
import {View , Text , AsyncStorage , ActivityIndicator ,StatusBar , ScrollView , Image} from 'react-native';
import{ListItem } from 'native-base';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';




export default class profile extends Component{

	state={
		"loading":true,
		"first_name": "",
	    "last_name": "",
	    "person_photo": "",
	    "contact_number": "",
	    "address": "",
	    "state": "",
	    "city": "",
	    "postal_code": "",
	    "vehicle_number": "",
	    "licence_number": "",
	}

	componentDidMount(){
		this.profileFetchHandler()
	}


	async profileFetchHandler(){
		let token = await AsyncStorage.getItem("token")
		let res = await axios("http://100.25.15.160/delivery/profile/",
			{
				headers:{
					Authorization:token
				}

			})
		this.setState({first_name:res.data.first_name})
		this.setState({last_name:res.data.last_name})
		this.setState({person_photo:"http://100.25.15.160"+res.data.person_photo})
		this.setState({contact_number:res.data.contact_number})
		this.setState({address:res.data.address})
		this.setState({state:res.data.state})
		this.setState({city:res.data.city})
		this.setState({postal_code:res.data.postal_code})
		this.setState({vehicle_number:res.data.vehicle_number})
		this.setState({licence_number:res.data.licence_number})
		this.setState({loading:false})
		
	
	}

	render(){
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

			<View style={{flex:1}}>
				<View style={{backgroundColor:"black",height:50 , padding:10}}>
					<Icon name="md-arrow-back" 
						onPress={()=>{this.props.navigation.goBack()}}
							size={35} color="white" />		
				</View>
				<ScrollView>
				<View style={styles.viewStyle}>
					<Image style={styles.imgStyle} source={{uri:this.state.person_photo}} />
					<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
						<Text>first_name</Text>
						<Text style={styles.textStyle}>{this.state.first_name} {this.state.last_name}</Text>
					</ListItem>
					<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
						<Text>contact_number</Text>
						<Text style={styles.textStyle}>{this.state.contact_number}</Text>
					</ListItem>
				</View>
				<View style={styles.viewStyle}>
					<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
						<Text>address</Text>
						<Text style={styles.textStyle}>{this.state.address}</Text>
					</ListItem>
					<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
						<Text>city</Text>
						<Text style={styles.textStyle}>{this.state.city}</Text>
					</ListItem>
					<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
						<Text>state</Text>
						<Text style={styles.textStyle}>{this.state.state}</Text>
					</ListItem>
					<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
						<Text>postal_code</Text>
						<Text style={styles.textStyle}>{this.state.postal_code}</Text>
					</ListItem>
				</View>
				<View style={styles.viewStyle}>
					<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
						<Text>vehicle_number</Text>
						<Text style={styles.textStyle}>{this.state.vehicle_number}</Text>
					</ListItem>
					<ListItem style={{alignItems:"flex-start",flexDirection:"column"}}>
						<Text>licence_number</Text>
						<Text style={styles.textStyle}>{this.state.licence_number}</Text>
					</ListItem>
				</View>	
			</ScrollView>
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
    viewStyle:{
    	margin:10,
    	borderColor:"#17baa1",
    	borderWidth:1,
    	borderRadius:2,
    	flex:1
    	
    },
    textStyle:{
    	fontSize:18
    },
    imgStyle:{
    	margin:10,
    	alignItems:"center",
    	height:200,
    	width:200,
    	borderRadius:200,
    	backgroundColor:"#17baa1",
    	borderColor:"orange",
    	borderWidth:2
    }
}