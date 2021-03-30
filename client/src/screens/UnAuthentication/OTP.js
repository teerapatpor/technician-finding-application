import React, { useRef, useState, useEffect } from 'react'


import Footer from '../../components/Registor/Footer'
import { registor, color, content } from '../../stylesheet'
import { registor_success } from '../../store/actions/regAction'
import { checkToken  , LOADING} from '../../store/actions/authAction'
import MyButton from '../../components/MyButton'

import { Text, SafeAreaView, View, TouchableOpacity, Keyboard } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect, useDispatch } from 'react-redux'


import WEB_URL from '../../misc/web_url'
import axios from 'axios'

const mapStateToProps = (state) => ({
    username: state.reg.username,
    password: state.reg.password,
    firstname: state.reg.firstname,
    lastname: state.reg.lastname,
    phone: state.reg.phone,
    avatar : state.reg.avatar,
    avatar_status : state.reg.avatar_status
})

const connector = connect(mapStateToProps, { registor_success , checkToken , LOADING })

const OTP = (props) => {
    const pin1_ref = useRef()
    const pin2_ref = useRef()
    const pin3_ref = useRef()
    const pin4_ref = useRef()
    const pin5_ref = useRef()
    const pin6_ref = useRef()

    const [pin1, setPin1] = useState('')
    const [pin2, setPin2] = useState('')
    const [pin3, setPin3] = useState('')
    const [pin4, setPin4] = useState('')
    const [pin5, setPin5] = useState('')
    const [pin6, setPin6] = useState('')

    const [confirmOTP ,setConfirmOTP] = useState('')

    const handleOTP = () => {
        if (pin1.length === 1 && pin2.length === 1 && pin3.length === 1
            && pin4.length === 1 && pin5.length === 1 && pin6.length === 1) {
            return true
        }
        else {
            return false
        }
        
    }

    const checkOTP = (otp) => {
        if (otp === confirmOTP){
            return true
        }else {
            return false
        }
    }

    const handleInput = (val , set , pin_ref) => {
        if(val !== '') {
            set(val)
            pin_ref.current.focus()
        }else {
            set('')
        }
    }

    useEffect(() => {
        axios({
            url: `${WEB_URL}/api/graphql`,
            method: 'post',
            data: {
                query:
                    `query{
                    sendOTP(phone:"${props.phone}")
                }`
            }
        }).then(res => {
            setConfirmOTP(res.data.data.sendOTP)
        })
    },[])

    return (
        <>
            <SafeAreaView style={content.safearray}>
                <View style={registor.container}>
                    <View style={{ marginBottom: 15, width: '100%', alignItems: 'center' }}>
                        <Text style={registor.whaturname}>
                            กรอกรหัส OTP 6 หลัก
                        </Text>
                    </View>
                    <View style={registor.otpContainer}>
                        <TextInput
                            autoFocus
                            placeholder=''
                            style={registor.otpInput}
                            keyboardType='number-pad'
                            maxLength={1}
                            ref={pin1_ref}
                            value={pin1}
                            onChangeText={(val) => {
                                handleInput(val , setPin1 , pin2_ref)
                            }}
                            onFocus={() => setPin1('')}
                            selectionColor={color.BLUE_3}
                        />
                        <TextInput
                            placeholder=''
                            style={registor.otpInput}
                            keyboardType='number-pad'
                            maxLength={1}
                            value={pin2}
                            ref={pin2_ref}
                            onChangeText={ async (val) => {
                                handleInput(val , setPin2 , pin3_ref)
                            }}
                            onFocus={() => setPin2('')}
                            selectionColor={color.BLUE_3}
                        />
                        <TextInput
                            placeholder=''
                            style={registor.otpInput}
                            keyboardType='number-pad'
                            maxLength={1}
                            value={pin3}
                            ref={pin3_ref}
                            onChangeText={ async (val) => {
                                handleInput(val , setPin3 , pin4_ref)
                            }}
                            onFocus={() => setPin3('')}
                            selectionColor={color.BLUE_3}
                        />
                        <TextInput
                            placeholder=''
                            style={registor.otpInput}
                            keyboardType='number-pad'
                            maxLength={1}
                            value={pin4}
                            ref={pin4_ref}
                            onChangeText={ (val) => {
                                handleInput(val , setPin4 , pin5_ref)
                            }}
                            onFocus={() => setPin4('')}
                            selectionColor={color.BLUE_3}
                        />
                        <TextInput
                            placeholder=''
                            style={registor.otpInput}
                            keyboardType='number-pad'
                            maxLength={1}
                            value={pin5}
                            ref={pin5_ref}
                            onChangeText={ (val) => {
                                handleInput(val , setPin5 , pin6_ref)
                            }}
                            onFocus={() => setPin5('')}
                            selectionColor={color.BLUE_3}
                        />
                        <TextInput
                            placeholder=''
                            style={registor.otpInput}
                            keyboardType='number-pad'
                            maxLength={1}
                            value={pin6}
                            ref={pin6_ref}
                            onChangeText={(val) => {
                                setPin6(val)
                                Keyboard.dismiss()
                            }}
                            onFocus={() => setPin6('')}
                            selectionColor={color.BLUE_3}
                        />
                    </View>
                    <MyButton title='ยืนยัน' onPress={() => {
                        if (handleOTP()) {
                            var otp = pin1.concat(pin2).concat(pin3).concat(pin4).concat(pin5).concat(pin6)
                            if(checkOTP(otp)) {
                                props.LOADING()
                                props.registor_success({
                                    username : props.username,
                                    password : props.password,
                                    firstname : props.firstname,
                                    lastname : props.lastname,
                                    phone : props.phone,
                                    avatar : props.avatar,
                                    avatar_status : props.avatar_status
                                }).then( () => {
                                    props.checkToken()
                                })
                            }
                            else alert('รหัส OTP ไม่ตรง')
                        }
                    }} />
                </View>
                <Footer navigation={props.navigation} />
            </SafeAreaView>
        </>
    )
}

export default connector(OTP)