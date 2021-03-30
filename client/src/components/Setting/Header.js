import React from 'react'

import { TouchableOpacity, View, Text } from 'react-native'

import Feather from 'react-native-vector-icons/Feather'

import { useNavigation } from '@react-navigation/native'

import { global, widthToDp, color } from '../../stylesheet'

const Header = (props) => {
    const { goBack } = useNavigation()
    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: widthToDp('10'),
                    backgroundColor: '#fff'
                }}>
                <TouchableOpacity
                    style={global.backIconContainer}
                    onPress={() => {
                        goBack()
                    }}
                >
                    <Feather style={{
                        fontSize: widthToDp('5'),
                        color: color.BLUE_2,
                    }} name='chevron-left' />
                </TouchableOpacity>
                <Text style={{ color: color.BLUE_2, fontSize: widthToDp('4'), fontWeight: 'bold' }}>
                    {props.title}
                </Text>
            </View>
        </>
    )
}

export default Header