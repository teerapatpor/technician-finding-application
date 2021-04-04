import React, { useState, useEffect } from 'react'

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

import { posting } from '../../stylesheet'

import Feather from 'react-native-vector-icons/Feather'

import { OPEN_DATE_PICKER_MODAL , OPEN_TIME_PICKER_MODAL } from '../../store/actions/modalAction'

import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    date : state.form.date,
    month: state.form.month,
    year: state.form.year,
    hour : state.form.hour,
    minute : state.form.minute,
})

const connector = connect(mapStateToProps , {OPEN_DATE_PICKER_MODAL , OPEN_TIME_PICKER_MODAL })

const DateTimePicker = (props) => {

    const month_ = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    

    return (
        <>
            <View style={[posting.halfContainer]}>
                <View style={{ flex: 3 }}>
                    <Text style={posting.halfHeader}>วันที่</Text>
                    <TouchableOpacity style={posting.halfInput} onPress={() => props.OPEN_DATE_PICKER_MODAL()} >
                            <Text style={posting.inputText}>{
                                `${("0" + props.date).slice(-2)} ${month_[props.month]} ${props.year+543}`
                            }</Text>
                        <Feather name='calendar' style={posting.inputText} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2 , marginLeft:10 }}>
                    <Text style={posting.halfHeader}>เวลา</Text>
                    <TouchableOpacity style={posting.halfInput} onPress={() => props.OPEN_TIME_PICKER_MODAL()} >
                        <Text style={posting.inputText}>{`${("0" + props.hour).slice(-2)} : ${("0" + props.minute).slice(-2)} น.`}</Text>
                        <Feather name='clock' style={posting.inputText} />
                    </TouchableOpacity>
                </View>
            </View>

        </>
    )
}

export default connector(DateTimePicker)