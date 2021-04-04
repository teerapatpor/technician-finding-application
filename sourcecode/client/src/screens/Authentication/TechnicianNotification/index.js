import React from 'react'

import {
    View,
    Text,
    Button,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native'

import Feather from 'react-native-vector-icons/Feather'

import Header from '../../../components/Header'

import { content, widthToDp, color, heightToDp } from '../../../stylesheet'

import UserNotification from '../../../components/UserNotification'
import { connect } from 'react-redux'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import NewOrderTab from './NewOrderTab'
import AcceptedOrderTab from './AcceptedOrderTab'


const TopTab = createMaterialTopTabNavigator()

const mapStateToProps = (state) => ({
    role: state.auth.userInfo.role,
    userResponse: state.noti.userResponse,
    techOrder: state.noti.techOrder,
    techAcceptedOrder: state.noti.techAcceptedOrder
})

const mapDispatchToProps = {

}


const Notification = ({ navigation, role, userResponse, techAcceptedOrder, techOrder }) => {
    return (
        <>
            <SafeAreaView style={content.topsafearray} />
            <SafeAreaView style={content.safearray}>
                <Header page="การแจ้งเตือน (ช่าง)" navigation={navigation} />
                <TopTab.Navigator lazy tabBarPosition='top'
                    tabBarOptions={{
                        labelStyle: { fontSize: widthToDp('3'), fontWeight: 'bold' },
                        indicatorStyle: { 
                            width : 0
                        },
                        bounces : true,
                        activeTintColor : color.IOS_YELLOW_DARK,
                        inactiveTintColor : color.GREY_5,
                        style : {
                            backgroundColor : '#fff',
                            borderBottomLeftRadius : heightToDp('3'),
                            borderBottomRightRadius : heightToDp('3')
                        }
                    }}
                    screenOptions={({ route  }) => ({
                        tabBarLabel: ({ focused }) => {
                            let name
                            let weight
                            let fontColor
                            let badge
                            let badgeColor
                            if (route.name === 'newOrderTab') {
                                name = 'ออเดอร์ใหม่'
                                weight = focused ? 'bold' : 'normal'
                                fontColor = focused ? color.BLUE_0 : color.GREY_2
                                badge = techOrder.length
                                badgeColor = focused ? 'red' : color.YELLOW_1
                            } else if (route.name === 'acceptedOrderTab') {
                                name = 'ยืนยันแล้ว'
                                weight = focused ? 'bold' : 'normal'
                                fontColor = focused ? color.BLUE_0 : color.GREY_2
                                badge = techAcceptedOrder.length
                                badgeColor = focused ? 'red' : color.YELLOW_1
                            }
                            return (<Text 
                                style={{ 
                                    fontWeight: 'normal', 
                                    color: fontColor, 
                                    fontSize: widthToDp('4') ,
                                }}>{name}
                                {badge > 0 ? (
                                    <View style={{
                                        width: widthToDp('4') , 
                                        height: widthToDp('4') , 
                                        borderRadius: widthToDp('3') , 
                                        backgroundColor:badgeColor,
                                        justifyContent:'center',
                                        alignItems:'center',
                                    }}>
                                        <Text style={{fontSize : widthToDp('3') , color:'#fff' , fontWeight : 'bold'}}>
                                            {badge}
                                        </Text>
                                    </View>
                                ) : null
                                }
                            </Text>
                            )
                        },
                    })
                    
                }
                >
                    <TopTab.Screen name='newOrderTab' component={NewOrderTab} />
                    <TopTab.Screen name='acceptedOrderTab' component={AcceptedOrderTab} />
                </TopTab.Navigator>
                {/* <View style={{ flex: 1 }}>
                                <View style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                                    <View style={{ flexDirection: 'row' , justifyContent : 'space-evenly' }}>
                                        <TouchableOpacity>
                                            <Text>New Order</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text>Accepted Order</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View> */}
            </SafeAreaView>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)