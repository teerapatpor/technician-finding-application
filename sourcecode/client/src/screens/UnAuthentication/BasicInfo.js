import React, { useState, useRef } from 'react'


import Footer from '../../components/Registor/Footer'
import MyButton from '../../components/MyButton'
import MyTextInput from '../../components/MyTextInput'
import { registor, color, content } from '../../stylesheet'
import WEB_URL from '../../misc/web_url'

import { Text, SafeAreaView, View, Animated, Easing, KeyboardAvoidingView } from 'react-native'
import axios from 'axios'

import { connect } from 'react-redux'
import { setUsername, setPassword } from '../../store/actions/regAction'

const mapStateToProps = (state) => ({
    username: state.reg.username,
    password: state.reg.password
})

const connector = connect(mapStateToProps, { setUsername, setPassword })

const BasicInfo = (props) => {
    const [confirmPassword, setConfirmPassword] = useState('')
    const [unameStatus, setUnameStatus] = useState(null)
    const [passwordStatus, setPasswordStatus] = useState(null)
    const [confirmPasswordStatus, setConfirmPasswordStatus] = useState(null)
    const [unameDesc, setUnameDesc] = React.useState('')

    const checkUsername = async (username) => {
        const check = await axios({
            url: `${WEB_URL}/api/graphql`,
            method: 'post',
            data: {
                query: `
                        query{
                            usernameCheck(
                                username:"${username}"
                            )
                        }
                    `
            }
        }).then((res) => {
            if (res.data.data.usernameCheck) {
                if (/^[a-z0-9_-]{4,}/.test(username)) {
                    setUnameStatus(true)
                    setUnameDesc('')
                    return true
                } else {
                    setUnameStatus(false)
                    setUnameDesc('')
                    return false
                }
            }
            else {
                setUnameStatus(false)
                setUnameDesc('ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว')
                return false
            }
        })
        return check
    }

    const handleUsername = (username) => {

        if (/^[a-z0-9_-]{4,}/.test(username)) {
            setUnameStatus(true)
            setUnameDesc('')
        } else {
            setUnameStatus(false)
            setUnameDesc('')
        }
    }

    const handlePassword = (password) => {
        const check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password) && password !== '' ? true : false
        setPasswordStatus(check)
        return check
    }

    const handleConfirmPassword = (val) => {
        setConfirmPassword(val)
        const check = val === props.password && val !== '' ? true : false
        setConfirmPasswordStatus(check)
        return check
    }




    return (
        <>
                <SafeAreaView style={content.safearray}>
                    <View style={registor.container}>
                        <MyTextInput
                            placeholder='Username'
                            onChangeText={(val) => {
                                props.setUsername(val)
                                handleUsername(val)
                            }}
                            value={props.username}
                            isOnBlur={true}
                            onBlur={() => checkUsername(props.username)}
                            status={unameStatus}
                            descText={unameDesc}
                            onSubmit={() => {
                                checkUsername(props.username)
                            }}
                        />
                        <Text
                            style={[registor.descText,
                            unameStatus !== null ?
                                !unameStatus ? { color: color.RED_1 } : { color: color.GREEN_2 }
                                : null
                            ]}
                        >
                            {
                                unameDesc === 'ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว' ? (
                                    'ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว'
                                ) : (
                                        '- ใช้ตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น \n-  มีความยาวมากกว่า 4 ตัวอักษร'
                                    )
                            }
                        </Text>
                        <MyTextInput
                            placeholder='Password'
                            onChangeText={(val) => {
                                handlePassword(val)
                                props.setPassword(val)
                            }}
                            isSecure={true}
                            value={props.password}
                            isOnBlur={true}
                            onBlur={() => handlePassword(props.password)}
                            status={passwordStatus}
                        />
                        <Text
                            style={[registor.descText,
                            passwordStatus !== null ?
                                !passwordStatus ? { color: color.RED_0 } : { color: color.GREEN_2 }
                                : null
                            ]}
                        >
                            {'- ใช้อักขระ 8 ตัวขึ้นไปที่มีทั้ง ตัวเลข ตัวอักษรพิมเล็กและพิมใหญ่'}
                        </Text>
                        <MyTextInput
                            placeholder='Confirm Password'
                            onChangeText={async (val) => {
                                handleConfirmPassword(val)
                            }}
                            isSecure={true}
                            value={confirmPassword}
                            status={confirmPasswordStatus}
                        />
                        <MyButton title='ถัดไป'
                            onPress={() => {
                                checkUsername(props.username).then((isCheck) => {
                                    if (isCheck && handlePassword(props.password) && handleConfirmPassword(confirmPassword)) {
                                        props.navigation.navigate('reg_name')
                                    }
                                })
                            }}
                        />
                    </View>
                    <Footer navigation={props.navigation} />
                </SafeAreaView>
        </>
    )
}

export default connector(BasicInfo)