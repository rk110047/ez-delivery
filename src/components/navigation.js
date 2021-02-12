import Login from './authentication/Login';
import AuthLoadingScreen from './authentication/LoadingScreen';
import Logout from './authentication/Logout';
import AcceptOrder from './orders/OrdersForAccept';
import Profile from './authentication/profile';
import React , {Component} from 'react';
import {View , Text} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator } from 'react-navigation-drawer';
import PendingOrders from './orders/PendingOrders';
import Home from './index';
import ShippedOrders from './shippedOrder/shippedOrders';
import ShippedOrderDetail from './shippedOrder/shippedOrderDetail';
import Aboutus from './about';




const shippedOrderNavigation = createStackNavigator(
  {

    shippedList: { screen: ShippedOrders },
    shippedDetail: { screen: ShippedOrderDetail },
  

  },
  {
    initialRouteName: 'shippedList',
    header: null,
    headerMode: 'none'
  }
)






const TabStack = createBottomTabNavigator({
  home:{
        screen: Home, 
        navigationOptions: {
            tabBarLabel: 'Home', 
            color:"#17baa1",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-home" color="#fff" 
                		style={{}} size={25} />
            )
        }
    },
    accept:{
        screen: AcceptOrder, 
        navigationOptions: {
            tabBarLabel: 'Orders', 
            color:"#17baa1",
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="check" color="#fff" 
                    style={{}} size={25} />
            )
        }
    },
    "Active Order":{
        screen: PendingOrders, 
        navigationOptions: {
            tabBarLabel: 'Active Order', 
            color:"#17baa1",
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="clock" color="#fff" 
                    style={{}} size={25} />
            )
        }
    },
    
    shipped:{
        screen: shippedOrderNavigation, 
        navigationOptions: {
            tabBarLabel: 'Delivered Orders', 
            color:"#17baa1",
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="truck" color="#fff" 
                    style={{}} size={25} />
            )
        }
    },
},

{
	header: null,
  headerMode: 'none',
  tabBarOptions:{
        activeBackgroundColor:'orange',
        inactiveBackgroundColor:'#17baa1',
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
                }
},
);


const Drawer = createDrawerNavigator({

  Home: {
      screen: TabStack,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="home" size={25} color={tintColor} />
      }
    },
    "Accept Order": {
      screen: AcceptOrder,
      navigationOptions: {
        drawerLabel: 'Orders',
        drawerIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="check" size={25} color={tintColor} />
      }
    },
    "Shipped Orders": {
      screen: shippedOrderNavigation,
      navigationOptions: {
        drawerLabel: 'Delivered Orders',
        drawerIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="truck" size={25} color={tintColor} />
      }
    },
   Profile: {
      screen: Profile,
      navigationOptions: {
        drawerLabel: 'Profile',
        drawerIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="account" size={25} color={tintColor} />
      }
    },
  Logout:{
      screen: Logout,
      navigationOptions: {
        drawerLabel: 'Logout',
        drawerIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="logout" size={25} color={tintColor} />
      }
    },
    "About Us":{
      screen: Aboutus,
      navigationOptions: {
        drawerLabel: 'About Us',
        drawerIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="information" size={25} color={tintColor} />
      }
    },

}, {
  initialRouteName: 'Home',
   style: {
        backgroundColor: '#17baa1',
        fontSize:25,
      },
  contentOptions: {
    inactiveTintColor:"#fff",
    activeTintColor: '#fff',
    activeBackgroundColor:"orange"

  },
});

const MainSwitch = createSwitchNavigator(
	{
    	AppStart:AuthLoadingScreen, 
        App: Drawer, 
        Auth: Login
    }, 
    {
        initialRouteName: 'AppStart'
    }
	)

export default createAppContainer(MainSwitch);

