import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'

import { content, heightToDp, global, widthToDp, color } from '../../stylesheet'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

import TechnicianInfoComponent from '../../components/TechnicianInfo/TechnicianInfoComponent'

import { GET_TECHNICIAN_INFO } from '../../store/actions/techAction'
import { logout, LOADED } from '../../store/actions/authAction'
import { ENTER_PRIVATE_CHAT, INITIAL_HISTORY_LIST } from '../../store/actions/chatAction'
import { useNavigation } from '@react-navigation/native'

const mapStateToProps = (state) => ({
    info: state.tech.info,
    uid: state.auth.userInfo.uid,
    role: state.auth.userInfo.role,
    firstname: state.auth.userInfo.firstname,
    lastname: state.auth.userInfo.lastname,
    avatar: state.auth.userInfo.avatar,
    badge: state.chat.badge
})

const UserInfo = (props) => {
    const { goBack, navigate } = useNavigation()
    return (
        <>
            <SafeAreaView style={content.topsafearray} />
            <SafeAreaView style={content.safearray} >
                <View style={[global.header]}>
                    <Image
                        style={infoStyles.profileImage}
                        source={{ uri: props.avatar }}
                    />
                    <View style={[global.chatIconContainer, { flexDirection: 'row-reverse' }]}>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('message')
                                // props.INITIAL_HISTORY_LIST(props.uid)
                                //     .then(() => {
                                //         props.LOADED()
                                //         navigate('message')
                                //     })
                            }}
                            style={{ marginLeft: widthToDp('2') }}
                        >
                            <Feather name="mail" style={global.chatIcon} />
                            {
                                props.badge > 0 ? (
                                    <View style={global.badges}>
                                        <Text style={global.badgesText}>
                                            1
                                        </Text>
                                    </View>
                                ) : null
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('setting')
                            }}
                        >
                            <Feather name="settings" style={global.chatIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[infoStyles.headerContainer]}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: widthToDp('4'), fontWeight: 'bold', color: '#333' }}>
                            {`${props.firstname} ${props.lastname}`}
                        </Text>
                    </View>
                </View>
                <ScrollView
                    style={{
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            padding: 8,
                            backgroundColor: '#fff',
                            marginVertical: widthToDp('2'),
                        }}>
                        {
                            props.role === 'technician' ? (
                                <>
                                    <TouchableOpacity
                                        style={infoStyles.iconBtn}
                                        onPress={() => navigate('techNotification')}
                                    >
                                        <Ionicons name='build-outline' color={color.BLUE_2} size={widthToDp('6')} />
                                        <Text
                                            style={{
                                                fontSize: widthToDp('3.5'),
                                                color: color.BLUE_2
                                            }}
                                        >
                                            ช่าง
                                    </Text>
                                    </TouchableOpacity>

                                </>
                            ) : null
                        }
                        <TouchableOpacity
                            style={infoStyles.iconBtn}
                            onPress={() => navigate('userNotification')}
                        >
                            <Ionicons name='time-outline' color={color.IOS_ORANGE_LIGHT} size={widthToDp('6')} />
                            <Text
                                style={{
                                    fontSize: widthToDp('3.5'),
                                    color: color.IOS_ORANGE_LIGHT
                                }}
                            >
                                รอการยืนยัน
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={infoStyles.iconBtn}
                            onPress={() => {
                                navigate('accepted')
                            }}
                        >
                            <Ionicons name='checkmark-circle-outline' color={color.GREEN_1} size={widthToDp('6')} />
                            <Text
                                style={{
                                    fontSize: widthToDp('3.5'),
                                    color: color.GREEN_1
                                }}
                            >
                                ยืนยันแล้ว
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={infoStyles.iconBtn}
                            onPress={() => {
                                navigate('history')
                            }}
                        >
                            <Ionicons name='refresh-outline' color={color.IOS_INDIGO_DARK} size={widthToDp('6')} />
                            <Text
                                style={{
                                    fontSize: widthToDp('3.5'),
                                    color: color.IOS_INDIGO_LIGHT
                                }}
                            >
                                ประวัติ
                        </Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ justifyContent: 'center', alignItems: 'center', padding: 8, backgroundColor: '#fff' }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigate('editInfo')
                        }}
                    >
                        <View
                            style={{ width: widthToDp('70'), backgroundColor: color.BLUE_3, borderRadius: widthToDp('1'), justifyContent: 'center', alignItems: 'center', height: widthToDp('7') }}
                        >
                            <Text style={{ color: '#fff', fontSize: widthToDp('3.5'), fontWeight: 'bold' }}>แก้ไขข้อมูลส่วนตัว</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
                    <View style={[content.container]}>
                        {
                            props.role === 'user' ? (
                                <>
                                    <View
                                        style={{
                                            flex: 1,
                                        }}
                                    >
                                        <View
                                            style={{
                                                marginTop: widthToDp('5'),
                                                alignSelf: 'center'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: widthToDp('5'),
                                                    color: color.BLUE_3
                                                }}
                                            >มาเป็นช่างกับเรา</Text>
                                        </View>
                                        <Image
                                            source={require('../../assets/image/techVector.png')}
                                            style={{
                                                height: widthToDp('60')
                                            }}
                                            resizeMethod='resize'
                                            resizeMode='contain'
                                        />
                                        <TouchableOpacity
                                            style={{
                                                alignSelf: 'center',
                                                backgroundColor: '#F0EEEB',
                                                paddingHorizontal: widthToDp('10'),
                                                margin: widthToDp('3'),
                                                paddingVertical: widthToDp('2'),
                                                borderRadius: widthToDp('10'),
                                                shadowColor: color.BLUE_2,
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.25,
                                                shadowRadius: 3.84,

                                                elevation: 5,
                                            }}
                                            onPress={() => {
                                                navigate('regTech')
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: widthToDp('5'),
                                                    fontWeight: 'bold',
                                                    color: color.BLUE_2
                                                }}
                                            >สมัคร</Text>
                                        </TouchableOpacity>

                                    </View>
                                </>
                            ) :
                                props.role === 'technician' ? (
                                    <>
                                        <TechnicianInfoComponent
                                            info={props.info}
                                        />
                                    </>
                                ) : null
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default connect(mapStateToProps, { INITIAL_HISTORY_LIST, ENTER_PRIVATE_CHAT, GET_TECHNICIAN_INFO, logout, LOADED })(UserInfo)

export const infoStyles = StyleSheet.create({
    coverImage: {
        backgroundColor: color.BLUE_4,
        height: heightToDp('20')
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: widthToDp('1'),
        backgroundColor: '#fff'
    },
    profileImage: {
        width: heightToDp('5'),
        height: heightToDp('5'),
        borderRadius: heightToDp('3'),
        backgroundColor: color.GREEN_4,
    },
    headerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: widthToDp('1'),
        flexDirection: 'row',
        width: widthToDp('20'),
        height: widthToDp('6')
    },
    contactColor: {
        backgroundColor: color.BLUE_5,
    },
    callColor: {
        backgroundColor: color.GREEN_4
    },
    contactText: {
        color: color.BLUE_0,
        fontWeight: 'bold',
        fontSize: widthToDp('3')
    },
    callText: {
        color: color.GREEN_0,
        fontWeight: 'bold',
        fontSize: widthToDp('3')
    },
    onside: {
        height: widthToDp('10'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    onsideIcon: {
        fontSize: widthToDp('4'),
        marginHorizontal: widthToDp('1'),
    },
    infoContainer: {
        padding: widthToDp('2'),
    },
    xColor: {
        color: color.RED_2
    },
    checkColor: {
        color: color.GREEN_2
    },
    onsideText: {
        fontSize: widthToDp('4'),
    },
    infoRow: {
        flexDirection: 'row',
        marginVertical: widthToDp('1'),
        paddingHorizontal: widthToDp('3'),
        backgroundColor: '#fff',
        paddingVertical: widthToDp('2'),
    },
    bottomBorder: {
        borderBottomColor: color.BLUE_3,
        borderBottomWidth: 1
    },
    infoTopic: {
        flex: 1,
    },
    topicText: {
        fontSize: widthToDp('4'),
        color: color.BLUE_1,
        fontWeight: 'bold'
    },
    infoDetail: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    aptitude: {
        backgroundColor: color.GREY_4,
        justifyContent: 'center',
        paddingHorizontal: widthToDp('4'),
        paddingVertical: widthToDp('0.5'),
        marginHorizontal: widthToDp('0.5'),
        marginVertical: widthToDp('0.5'),
        borderRadius: widthToDp('5'),
    },
    aptitudeText: {
        fontSize: widthToDp('4'),
        color: color.BLUE_1
    },
    imageContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    image: {
        width: widthToDp('23'),
        height: widthToDp('23'),
        marginHorizontal: widthToDp('0.5'),
        marginVertical: widthToDp('0.5'),
        backgroundColor: color.YELLOW_4
    },
    ratingContainer: {
        backgroundColor: color.BLUE_5,
        paddingVertical: widthToDp('2'),
        borderRadius: widthToDp('2'),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnText: {
        color: color.GREY_5,
        fontSize: widthToDp('4'),
        fontWeight: 'bold'
    },
    iconBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: widthToDp('25')
    }

})