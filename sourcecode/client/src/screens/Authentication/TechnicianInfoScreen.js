import React from 'react'

import { View, Text, Image, ScrollView, TouchableOpacity, Linking, SafeAreaView } from 'react-native'

import { content, technician, heightToDp, global, widthToDp, color } from '../../stylesheet'
import { infoStyles as styles } from './UserInfoScreen'

import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { infoStyles } from './UserInfoScreen'

import { connect } from 'react-redux'
import { GET_TECHNICIAN_INFO } from '../../store/actions/techAction'
import { ENTER_PRIVATE_CHAT } from '../../store/actions/chatAction'
import TechnicianInfoComponent from '../../components/TechnicianInfo/TechnicianInfoComponent'
import LinearGradient from 'react-native-linear-gradient'
const mapStateToProps = (state) => ({
    info: state.tech.info,
    uid: state.auth.userInfo.uid,
    badge: state.chat.badge

})

const TechnicianInfo = (props) => {

    return (
        <>
            <SafeAreaView style={content.topsafearray} />
            <SafeAreaView style={content.safearray}>

                <View style={[global.header]}>
                    <Image
                        style={infoStyles.profileImage}
                        source={{ uri: props.info.personalInfo.avatar }}
                    />
                    <View style={[global.chatIconContainer, { flexDirection: 'row-reverse' }]}>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('message')}
                            style={{ marginLeft: widthToDp('2') }}
                        >
                            <Feather name="mail" style={global.chatIcon} />
                            {
                                props.badge > 0 ?
                                    (<View style={global.badges}>
                                        <Text style={global.badgesText}>
                                            1
                                    </Text>
                                    </View>
                                    ) : null

                            }
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={global.backIconContainer}
                        onPress={() => {
                            props.navigation.goBack()
                        }}
                    >
                        <Feather name="chevron-left" style={global.backIcon} />
                    </TouchableOpacity>
                </View>
                <View style={[infoStyles.headerContainer, { padding: 8 }]}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: widthToDp('5'), fontWeight: 'bold' }}>
                            {`${props.info.personalInfo.firstname} ${props.info.personalInfo.lastname}`}
                        </Text>
                    </View>
                </View>
                <View
                    style={[
                        infoStyles.headerContainer,
                        {
                            paddingBottom: widthToDp('2'),
                            justifyContent: 'space-evenly',
                            borderBottomWidth: widthToDp('0.1'),
                            borderColor: color.GREY_4
                        }
                    ]}
                >
                    <TouchableOpacity

                        onPress={() => {
                            Linking.openURL(`tel:${props.info.personalInfo.phone}`)
                        }}
                    >
                        <LinearGradient
                            style={{
                                width: widthToDp('24'),
                                height: widthToDp('10'),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: widthToDp('5')
                            }}
                            colors={[
                                color.IOS_GREEN_DARK,
                                color.IOS_GREEN_LIGHT,
                            ]}
                        >
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                colors={[
                                    color.GREEN_2,
                                    color.GREEN_0
                                ]}
                            >
                                <Ionicons name='call' style={{ color: '#fff', fontSize: widthToDp('4.5'), marginRight: widthToDp('1') }} />
                                <Text style={{ color: '#fff', fontSize: widthToDp('4'), fontWeight: 'bold' }}>
                                    โทร
                            </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            props.ENTER_PRIVATE_CHAT(props.uid, props.info.personalInfo.userID)
                                .then(() => {
                                    props.navigation.navigate('chat')
                                })
                        }}
                    >
                        <LinearGradient
                            style={{
                                width: widthToDp('24'),
                                height: widthToDp('10'),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: widthToDp('5')
                            }}
                            colors={[
                                color.IOS_PURPLE_DARK,
                                color.IOS_INDIGO_LIGHT,
                            ]}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Ionicons name='chatbox' style={{ color: '#fff', fontSize: widthToDp('4'), marginRight: widthToDp('1') }} />
                                <Text style={{ color: '#fff', fontSize: widthToDp('4'), fontWeight: 'bold' }}>
                                    แชท
                            </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={content.container}>
                        <TechnicianInfoComponent info={props.info} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default connect(mapStateToProps, { ENTER_PRIVATE_CHAT, GET_TECHNICIAN_INFO })(TechnicianInfo)