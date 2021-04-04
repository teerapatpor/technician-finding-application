import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import BasicInfo from './BasicInfo'
import Name from './Name'
import SelectRole from './SelectRole'
import PhoneNumber from './PhoneNumber'
import OTP from './OTP'
import ImageProfile from './ImageProfile'
import Login from './Login'

import { clear } from '../../store/actions/regAction'
import { setCurrentLocation } from '../../store/actions/authAction'
import { connect } from 'react-redux'
import Geolocation from '@react-native-community/geolocation'
import { useFocusEffect } from '@react-navigation/native'

import LoadingModal from '../../components/Modal/LoadingModal'
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'
import { content } from '../../stylesheet'

const mapStateToProps = (state) => ({

})

const UnAuth = (props) => {
    // useFocusEffect(
    //     React.useCallback( () => {
    //         return () => {
    //             Geolocation.getCurrentPosition(  ({coords:{latitude , longitude}}) => {
    //                 props.setCurrentLocation(latitude , longitude)
    //             },
    //             () => {

    //             } )
    //         }
    //     },[])
    // )
    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? null : 24}
            >
                <SafeAreaView
                    style={content.safearray}
                >
                    <Stack.Navigator>
                        <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name='reg_basic' component={BasicInfo} options={{ headerShown: false }} />
                        <Stack.Screen name='reg_name' component={Name} options={{ headerShown: false }} />
                        <Stack.Screen name='reg_select' component={SelectRole} options={{ headerShown: false }} />
                        <Stack.Screen name='reg_phone' component={PhoneNumber} options={{ headerShown: false }} />
                        <Stack.Screen name='reg_otp' component={OTP} options={{ headerShown: false }} />
                        <Stack.Screen name='reg_image' component={ImageProfile} options={{ headerShown: false }} />
                    </Stack.Navigator>
                    <LoadingModal />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </>

    )
}

export default connect(mapStateToProps, { clear , setCurrentLocation })(UnAuth)