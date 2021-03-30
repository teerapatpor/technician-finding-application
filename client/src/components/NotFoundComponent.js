import React from 'react'
import {View , Text ,Image} from 'react-native'
import {color , widthToDp} from '../stylesheet'
const NotFoundComponent = ({label}) => {
    return (
        <>
        <View
            style={{
                flex : 1,
                alignItems : 'center'
            }}
        >
                <Image 
                source={require('../assets/image/noItem.png')}
                style={{
                    width : widthToDp('50'),
                    height : widthToDp('50'),
                    alignSelf : 'center'
                }}
            />
            <Text
                style={{color : color.BLUE_1 , fontSize : widthToDp('5')}}
            >
                {label}
            </Text>
        </View>

        </>
    )
}

export default NotFoundComponent