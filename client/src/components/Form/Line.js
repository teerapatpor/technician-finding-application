import React , {} from 'react'

import {View , Text} from 'react-native'

import { posting } from '../../stylesheet'


const Line = ({text , mt}) => {
    return(
        <>
            <View style={mt ? [posting.descContainer , posting.mt] : posting.descContainer}>
                <View style={posting.descLine} />
                    <Text style={posting.descText}>{text}</Text>
                <View style={posting.descLine} />
            </View>
        </>
    )
}

export default Line