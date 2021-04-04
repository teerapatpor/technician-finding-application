import React, { useState } from 'react'

import { Text, View, TextInput, Keyboard } from 'react-native'

import { posting, color } from '../../stylesheet'

import { connect } from 'react-redux'

import { SET_DETAIL } from '../../store/actions/formAction'

const mapStateToProps = (state) => ({
    detail : state.form.detail
})

const DetailInput = (props) => {

    return (
        <>
            <View style={posting.fullContainer}>
                {/* <Text style={posting.fullHeader}>
                    ลายละเอียด
                </Text> */}
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    value={props.detail}
                    maxLength={200}
                    style={[posting.detailInput,]}
                    placeholder="รายละเอียด"
                    placeholderTextColor={color.BLUE_3}
                    onChangeText={(val) => {
                        props.SET_DETAIL(val)
                    }}
                />
                {/* <View style={posting.detailLength}>
                    <Text style={{ color: color.BLUE_4 }}>{`${props.detail.length}/150`}</Text>
                </View> */}
            </View>
        </>
    )
}

export default connect(mapStateToProps, { SET_DETAIL })(DetailInput)