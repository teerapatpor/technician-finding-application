import React, { } from 'react'

import { View, Text, Image, TouchableOpacity } from 'react-native'

import { Rating } from 'react-native-ratings'

import { searchScreen, widthToDp, color } from '../../stylesheet'

import Feather from 'react-native-vector-icons/Feather'

import { connect } from 'react-redux'
import { SET_TID, GET_TECHNICIAN_INFO } from '../../store/actions/techAction'

const mapStateToProps = (state) => ({

})

const ListBox = (props) => {

    return (
        <>
            <TouchableOpacity
                style={[searchScreen.listContainer]}
                onPress={() => {
                    props.GET_TECHNICIAN_INFO(props.tid)
                        .then(() => {
                            props.navigation.navigate('techInfo')
                        })
                }}
            >
                <View style={searchScreen.imageContainer}>
                    <Image style={searchScreen.techImage} source={{ uri: props.avatar }} />
                </View>
                <View style={searchScreen.infoContainer}>
                    <View style={searchScreen.listRowContainer}>
                        <Text style={searchScreen.nameText}>
                            {props.name}
                        </Text>
                        <View style={[searchScreen.listRowContainer, { backgroundColor: 'red' }]}>
                            <Rating
                                type='custom'
                                startingValue={props.star}
                                imageSize={widthToDp('3.5')}
                                ratingBackgroundColor={color.GREY}
                                ratingColor={color.IOS_YELLOW_LIGHT}
                                tintColor={'#fff'}
                                readonly={true} />
                        </View>
                    </View>
                    <View style={[searchScreen.listRowContainer, { justifyContent: 'space-between' }]}>
                        <Text style={searchScreen.distanceText}>
                            ห่างจากคุณ: {props.distance} กม.
                        </Text>
                        <View
                            style={[searchScreen.detailbtnContainer]}
                        >
                            <Text
                                style={{
                                    fontSize: widthToDp('3'),
                                    color: color.BLUE_3
                                }}
                            >
                                กดเพื่อดูรายละเอียด
                            </Text>
                            <Feather style={{
                                fontSize: widthToDp('3'),
                                color: color.BLUE_3
                            }} name='chevron-right' />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default connect(mapStateToProps, { SET_TID, GET_TECHNICIAN_INFO })(ListBox)