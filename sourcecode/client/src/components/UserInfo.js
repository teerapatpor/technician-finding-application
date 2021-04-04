import React from 'react'

import { View, Text, TouchableOpacity, Image } from 'react-native'
import { userInfo, widthToDp, color } from '../stylesheet'
import { connect } from 'react-redux'

import Feather from 'react-native-vector-icons/Feather'

import { GET_TECHNICIAN_INFO } from '../store/actions/techAction'
import { GET_INTERLOCUTOR_INFO } from '../store/actions/chatAction'
import { LOADING, LOADED, logout } from '../store/actions/authAction'
import { OPEN_LOGOUT_CONFIRM_MODAL } from '../store/actions/modalAction'

const mapStateToProps = (state) => ({
    firstname: state.auth.userInfo.firstname,
    lastname: state.auth.userInfo.lastname,
    avatar: state.auth.userInfo.avatar,
    role: state.auth.userInfo.role,
    uid: state.auth.userInfo.uid
})


const UserInfo = (props) => {
    return (
        <>
            <View style={userInfo.container}>
                <View style={{
                    flexDirection : 'row'
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('userInfo')

                            // props.LOADING()
                            // if (props.role === 'technician') {
                            //     props.GET_TECHNICIAN_INFO(props.uid).then(() => {
                            //         props.navigation.navigate('userInfo')
                            //         props.LOADED()
                            //     }).catch(err => {
                            //         props.LOADED()
                            //     })
                            // }
                            // else {
                            //     props.navigation.navigate('userInfo')
                            //     props.LOADED()
                            // }
                        }}
                    >
                        <Image
                            style={userInfo.userImage}
                            source={{ uri: props.avatar }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('userInfo')

                            // props.LOADING()
                            // if (props.role === 'technician') {
                            //     props.GET_TECHNICIAN_INFO(props.uid).then(() => {
                            //         props.navigation.navigate('userInfo')
                            //         props.LOADED()
                            //     }).catch(err => {
                            //         props.LOADED()
                            //     })
                            // }
                            // else {
                            //     props.navigation.navigate('userInfo')
                            //     props.LOADED()
                            // }
                        }}
                    >
                        <View style={[userInfo.subContainer, { flex: 1 }]}>
                            <Text style={userInfo.name}>
                                {`${props.firstname} ${props.lastname}`}
                            </Text>
                            <Text style={userInfo.type}>
                                {
                                    props.role === 'user' ? 'ผู้ใช้ทั่วไป' 
                                    : props.role === 'technician' ? 'ช่าง'
                                    : props.role
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: widthToDp('3'),
                    }}
                    onPress={ () => {
                        props.OPEN_LOGOUT_CONFIRM_MODAL()
                    }}
                >
                    <Feather
                        name='log-out'
                        style={{
                            fontSize: widthToDp('5'),
                            color: color.IOS_RED_LIGHT
                        }}
                    />
                </TouchableOpacity>
            </View>
            
        </>
    )
}

export default connect(mapStateToProps, { OPEN_LOGOUT_CONFIRM_MODAL, logout, LOADING, LOADED, GET_INTERLOCUTOR_INFO, GET_TECHNICIAN_INFO })(UserInfo)