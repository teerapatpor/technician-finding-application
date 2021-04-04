import React, { } from 'react'

import { View, Text } from 'react-native'

import { technician } from '../../stylesheet'

import { Rating } from 'react-native-ratings';


const List = ({name , comment , star}) => {
    return (
        <>
            <View style={technician.ratingContainer}>
                <View style={technician.ratingNameContainer}>
                    <Text style={technician.ratingName}>{name} </Text>
                </View>
                <Rating imageSize={15}  startingValue={star} />
                <View style={technician.commentContainer}>
                    <Text style={technician.commentText}>
                        {comment}
                    </Text>
                </View>
            </View>
        </>
    )
}

const Review = ({navigation}) => {
    return (
        <>
            <View style={technician.reviewContainer}>
                <View style={technician.reviewHeader}>
                    <Text style={technician.locationText}>รีวิว</Text>
                    <Rating imageSize={20} startingValue={3.5}  />
                </View>
                <View>
                    <List name='ปริญญากร เตจ๊ะเสาร์' comment='คนนี้บริการดีครับ ซ่อมไว แต่ตั้งเรทราคา range ราคากว้างเกิน 100 - 10000 กว้างเกิ๊นน' star={3} />
                    <List name='นนทวัฒน์ อ็อฟ' comment='ตั้งเรทราคากว้างเกินครับ 100 - 10000 ' star={4} />
                </View>
            </View>
        </>
    )
}

export default Review