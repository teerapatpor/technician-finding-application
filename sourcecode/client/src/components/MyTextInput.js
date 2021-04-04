import React, { useState } from 'react'

import { TextInput, View, TouchableOpacity, StyleSheet, Keyboard, Platform } from 'react-native'

import Feather from 'react-native-vector-icons/Feather'

import { color, widthToDp } from '../stylesheet'

const MyTextInput = ({ placeholder, onChangeText, value,
    isSecure = false, isOnBlur = false, onBlur, status = true ,
    onSubmit = () => {} ,
    }) => {
    const [secure, setSecure] = useState(isSecure)

    return (
        <>
            <View style={[inputStyles.container, !status && status !== null ? inputStyles.borderRed : null]}>
                <TextInput
                    style={[inputStyles.textInput, !status && status !== null ? inputStyles.textRed : null]}
                    placeholder={placeholder}
                    placeholderTextColor={!status && status !== null ? color.RED_0 : color.BLUE_2}
                    secureTextEntry={secure}
                    textContentType={"none"}
                    blurOnSubmit={false}
                    onSubmitEditing={() =>{
                        Keyboard.dismiss()
                        onSubmit()
                    }}
                    value={value}
                    onChangeText={(val) => onChangeText(val)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoCompleteType='off'
                    onBlur={() => {
                        if (isOnBlur) {
                            onBlur()
                        }
                    }}
                />
                {
                    isSecure ? (
                        <TouchableOpacity style={inputStyles.iconContainer} onPress={() => setSecure(!secure)}>
                            <Feather name={secure ? 'eye' : 'eye-off'} style={[inputStyles.icon, !status && status !== null ? inputStyles.textRed : null]} />
                        </TouchableOpacity>
                    ) : !status && status !== null ? (
                        <View style={inputStyles.iconContainer}>
                            <Feather name='x' style={[inputStyles.icon, inputStyles.textRed]} />
                        </View>
                    ) : status && status !== null ? (
                        <View style={inputStyles.iconContainer}>
                            <Feather name='check' style={[inputStyles.icon, inputStyles.textGreen]} />
                        </View>
                    ) : null
                }

            </View>
        </>
    )
}

export default MyTextInput

export const inputStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: widthToDp('2'),
        ...Platform.select({
            ios: {
                paddingVertical: widthToDp('2')
            },
            android: {
                paddingVertical: 0
            },
            default: {
                paddingVertical: 0
            }
        }),
        paddingLeft: widthToDp('4'),
        paddingRight: widthToDp('1'),
        marginVertical: widthToDp('1'),
        backgroundColor: color.BLUE_5
    },
    textInput: {
        flex: 1,
        fontSize: widthToDp('4'),
        color: color.BLUE_1,
        paddingLeft: widthToDp('1')
    },
    iconContainer: {
        width: widthToDp('5'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontSize: widthToDp('4'),
        color: color.BLUE_2
    },
    borderRed: {
        // borderColor : color.RED_1,
        // borderWidth:1,
        backgroundColor: color.RED_4
    },
    textRed: {
        color: color.RED_0
    },
    textGreen : {
        color : color.GREEN
    }
})