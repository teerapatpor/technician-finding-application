import React from 'react'
import { View , Text, SafeAreaView} from 'react-native'
import { connect } from 'react-redux'

import Main from './MainScreen'
import Notification from './NotificationTab'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()

import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { color as myColor, heightToDp, widthToDp } from '../../stylesheet'
import TechnicianNotification from './TechnicianNotification'
import LogoutConfirmModal from '../../components/Modal/LogoutConfirmModal'
import SearchScreen from './SearchScreen'
import PostScreen from './PostScreen'
import UserInfoScreen from './UserInfoScreen'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const mapStateToProps = (state) => ({
    notification_badge: state.noti.notification_badge,
})

const mapDispatchToProps = {

}

const TabScreen = (props) => {
    const {navigate} = useNavigation()
    return (
        <>
            <Tab.Navigator
                lazy
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let iconSize = widthToDp('4')

                        if (route.name === 'menu') {
                            iconName = focused ? 'home' : 'home';
                            // iconName = focused ? 'trail-sign' : 'trail-sign-outline'
                            return <Feather name={iconName} size={iconSize} color={color} />;
                        } else if (route.name === 'notification') {
                            iconName = focused ? 'bell' : 'bell';
                            // iconName = focused ? 'notifications' : 'notifications-outline';
                            return <Feather name={iconName} size={iconSize} color={color} />;


                        } else if (route.name === 'technicianNotification') {
                            iconName = focused ? 'reader' : 'reader-outline'
                            return <Feather name={iconName} size={iconSize} color={color} />;

                        } else if (route.name === 'search') {
                            iconName = focused ? 'search' : 'search'
                            return <Feather name={iconName} size={iconSize} color={color} />;

                        } else if (route.name === 'userInfo') {
                            iconName = focused ? 'user' : 'user'
                            return <Feather name={iconName} size={iconSize} color={color} />;

                        }else if (route.name === 'post') {
                            iconName = focused ? 'edit' : 'edit'
                            return (
                                <>
                                    <View
                                        style={{
                                            width : widthToDp('9'),
                                            height : widthToDp('9'),
                                            borderRadius : widthToDp('6'),
                                            justifyContent : 'center',
                                            alignItems : 'center',
                                            backgroundColor : focused ? myColor.IOS_YELLOW_LIGHT : myColor.BLUE_2,
                                            borderWidth : 1.5,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            borderColor : color,
                                            elevation: 5,
                                        }}
                                        onPress={ () => {
                                            navigate('post')
                                        }}
                                    >
                                        <Feather name={iconName} size={iconSize} color={ focused ? myColor.BLUE_2 : myColor.GREY_5} />
                                    </View>
                                </>    
                            );

                        }
                        // return <Feather name={iconName} size={25} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: myColor.IOS_YELLOW_LIGHT,
                    inactiveTintColor: myColor.GREY_5,
                    showLabel: false,
                    // inactiveBackgroundColor : color.GREY_5,
                    // activeBackgroundColor : color.GREY_5,
                    style: {
                        // borderTopLeftRadius : heightToDp('3'),
                        // borderTopRightRadius : heightToDp('3'),
                        backgroundColor : myColor.BLUE_2,
                        borderTopColor : myColor.BLUE_0,
                        borderTopWidth : 0,
                        // paddingVertical : widthToDp('2'),
                        height : heightToDp('8')
                    }
                }}
            >
                <Tab.Screen name="menu" component={Main} />
                <Tab.Screen name="search" component={SearchScreen} />
                <Tab.Screen name="post" component={PostScreen}  />
                <Tab.Screen name="notification" component={Notification}
                    options={{
                        tabBarBadge : props.notification_badge > 0 ? props.notification_badge : null
                    }}
                />
                <Tab.Screen name="userInfo" component={UserInfoScreen}  />

            </Tab.Navigator>

        </>
    )
}


// const TabScreen = (props) => {
//     return (
//         <>
//             <Tab.Navigator
//                 screenOptions={({ route }) => ({
//                     tabBarIcon: ({ focused, color, size }) => {
//                         let iconName;

//                         if (route.name === 'menu') {
//                             // iconName = focused ? 'home' : 'home';
//                             // iconSize = focused ? 30 : 25
//                             iconName = focused ? 'trail-sign' : 'trail-sign-outline'

//                         } else if (route.name === 'notification') {
//                             // iconName = focused ? 'bell' : 'bell';
//                             // iconSize = focused ? 30 : 25
//                             iconName = focused ? 'notifications' : 'notifications-outline';

//                         } else if (route.name === 'technicianNotification') {
//                             iconName = focused ? 'reader' : 'reader-outline'

//                         }
//                         return <Ionicons name={iconName} size={25} color={color} />;
//                     },
//                 })}
//                 tabBarOptions={{
//                     activeTintColor: color.BLUE_2,
//                     inactiveTintColor: color.BLUE_2,
//                     showLabel: false,
//                     // inactiveBackgroundColor : color.GREY_5,
//                     // activeBackgroundColor : color.GREY_5,
//                     style: {
//                         // borderTopLeftRadius : heightToDp('3'),
//                         // borderTopRightRadius : heightToDp('3'),
//                         backgroundColor : color.GREY_5,
//                     }
//                 }}
//             >
//                 <Tab.Screen name="menu" component={Main} />
//                 {
//                     props.role === 'technician' ? <Tab.Screen
//                         name='technicianNotification'
//                         component={TechnicianNotification}
//                         options={
//                             props.techOrder.length > 0
//                                 ? { tabBarBadge: props.techOrder.length + props.techAcceptedOrder.length }
//                                 : null
//                         }
//                     />
//                         : null
//                 }
//                 <Tab.Screen
//                     name="notification" component={Notification}
//                 />
//             </Tab.Navigator>
//         </>
//     )
// }

export default connect(mapStateToProps, mapDispatchToProps)(TabScreen)