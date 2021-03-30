import React from 'react'
import { View, TouchableOpacity, Animated, Easing } from 'react-native'
import { widthToDp, color } from '../stylesheet'

const Radio = (props) => {

    const [opacity, setOpacity] = React.useState( props.status ?  new Animated.Value(1) : new Animated.Value(0))

    const selectedAnimate = () => {
        Animated.timing(
            opacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.elastic(2),
            useNativeDriver: true,
        }).start()
    }
    const unselectedAnimate = () => {
        Animated.timing(
            opacity, {
            toValue: 0,
            duration: 500,
            easing: Easing.elastic(2),
            useNativeDriver: true,
        }).start()
    }
    return (
        <>
            <TouchableOpacity
                style={{
                    width: widthToDp('6'),
                    height: widthToDp('6'),
                    borderRadius: widthToDp('3.5'),
                    backgroundColor: 'transparent',
                    borderColor: !props.status ? color.IOS_BLUE : color.IOS_GREEN_LIGHT,
                    borderWidth: widthToDp('0.5'),
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    if(props.status){
                        unselectedAnimate()
                    }else {
                        selectedAnimate()
                    }
                    props.setStatus()
                }}
            >

                <Animated.View
                    style={{
                        opacity
                    }}
                >
                    <View
                        style={[{
                            width: widthToDp('2.5'),
                            height: widthToDp('2.5'),
                            borderRadius: widthToDp('3.5'),
                            backgroundColor: !props.status ? color.IOS_BLUE : color.IOS_GREEN_LIGHT,
                        }]}
                    />
                </Animated.View>

            </TouchableOpacity>
        </>
    )
}

export default Radio