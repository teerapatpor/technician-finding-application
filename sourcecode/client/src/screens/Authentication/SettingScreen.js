import React from 'react'

import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { content, widthToDp, global, color } from '../../stylesheet'
import Feather from 'react-native-vector-icons/Feather'
import Header from '../../components/Setting/Header'

import { connect } from 'react-redux'
import { OPEN_LOGOUT_CONFIRM_MODAL } from '../../store/actions/modalAction'

const mapStateToProps = (state) => ({
    role: state.auth.userInfo.role
})

const mapDispatchToProps = {
    OPEN_LOGOUT_CONFIRM_MODAL
}

const Btn = (props) => {
    return (
        <>

            <TouchableOpacity
                style={
                    {
                        height: widthToDp('10'),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        paddingHorizontal: widthToDp('5')
                    }}
                onPress={() => {
                    props.navigation()
                }}
            >
                <Text
                    style={{
                        fontSize: widthToDp('3.5'),
                        color: color.BLUE_0
                    }}
                >
                    {props.title}
                </Text>
                <Feather name='chevron-right'
                    style={{
                        fontSize: widthToDp('3.5'),
                        color: color.BLUE_0
                    }} />
            </TouchableOpacity>
        </>
    )
}

const SettingScreen = (props) => {
    return (
        <>
            <SafeAreaView style={content.topsafearray} />
            <SafeAreaView style={content.safearray} >

                <Header navigation={props.navigation} title='ตั้งค่า' />
                <View style={{ flex: 1, backgroundColor: color.GREY_5 }}>
                    <View style={{ marginTop: widthToDp('2'), borderTopRightRadius: widthToDp('2'), borderTopLeftRadius: widthToDp('2') }}>
                        <Btn
                            title='รอการยืนยัน'
                            navigation={() => props.navigation.navigate('userNotification')}
                        />
                        <Btn
                            title='ยืนยันแล้ว'
                            navigation={() => props.navigation.navigate('accepted')}
                        />
                        {
                            props.role === 'user' ? (
                                <Btn
                                    title='สมัครเป็นช่าง'
                                    navigation={() => props.navigation.navigate('regTech')}
                                />
                            ) : null
                        }
                    </View>
                    <View style={{ height: widthToDp('10') }}>
                        <TouchableOpacity
                            style={
                                {
                                    height: widthToDp('12'),
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    paddingHorizontal: widthToDp('5'),
                                    alignItems: 'center',
                                    backgroundColor: '#fff',
                                    borderBottomRightRadius: widthToDp('2'),
                                    borderBottomLeftRadius: widthToDp('2'),
                                    borderTopWidth: widthToDp('0.1'),
                                    borderTopColor: `${color.GREY_1}66`
                                }}
                            onPress={() => {
                                props.OPEN_LOGOUT_CONFIRM_MODAL()
                            }}
                        >
                            <Feather name="log-out"
                                style={{
                                    fontSize: widthToDp('4'),
                                    marginRight: widthToDp('2'),
                                    color: color.IOS_RED_LIGHT,
                                    fontWeight: 'bold'
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: widthToDp('4'),
                                    marginRight: widthToDp('2'),
                                    color: color.IOS_RED_LIGHT,
                                    fontWeight: 'bold'
                                }}
                            >
                                ออกจากระบบ
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)