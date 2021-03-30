import React, { useEffect, useState } from 'react'

import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import Modal from 'react-native-modalbox'
import { Picker } from '@react-native-picker/picker'
import { connect } from 'react-redux'
import { posting, datePicker, widthToDp } from '../../stylesheet'
import { CLOSE_TIME_PICKER_MODAL } from '../../store/actions/modalAction'
import { SET_MINUTE, SET_HOUR } from '../../store/actions/formAction'
import { techRegModalStyles } from './SelectAptitudeModal'
import { color } from '../../stylesheet/colors'

const mapStateToProps = (state) => ({
    time_picker: state.modal.time_picker,
    hour: state.form.hour,
    minute: state.form.minute
})

const connector = connect(mapStateToProps, { CLOSE_TIME_PICKER_MODAL, SET_MINUTE, SET_HOUR })

const TimePickerModal = (props) => {

    const date_ = new Date

    useEffect(() => {
        props.SET_HOUR(date_.toTimeString().slice(0, 2))
        props.SET_MINUTE(date_.toTimeString().slice(3, 5))
    }, [])

    return (
        <>
            <Modal
                isOpen={props.time_picker}
                backButtonClose={true}
                onClosed={() => props.CLOSE_TIME_PICKER_MODAL()}
                style={{backgroundColor: 'transparent' }}
                position='center'
                swipeToClose={false}
            >
                <SafeAreaView
                    style={techRegModalStyles.container}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: widthToDp('80'),
                            borderRadius: widthToDp('4'),
                        }}>
                        <View style={techRegModalStyles.header}>
                            <Text
                                style={techRegModalStyles.headerText}
                            >
                                เลือกเวลาา
                            </Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: widthToDp('5'),
                                paddingVertical: widthToDp('2'),
                                width: '100%'
                            }}
                        >
                            <View
                                style={
                                    [
                                        techRegModalStyles.rowContainer,
                                        {
                                            flexDirection: 'row'
                                        }
                                    ]
                                }
                            >
                                <View
                                    style={{
                                        flex: 1
                                    }}
                                >
                                    <Picker
                                        itemStyle={{
                                            ...Platform.select({
                                                ios: {
                                                    height: widthToDp('30'),
                                                },
                                                android: {
                                                    height: widthToDp('10'),
                                                }
                                            })
                                        }}
                                        selectedValue={`${props.hour}`}
                                        onValueChange={(val) => {
                                            props.SET_HOUR(val)
                                        }}

                                    >
                                        {
                                            [...Array(24)].map((item, index) => <Picker.Item key={index} label={`${index}`} value={`${index}`} />)
                                        }
                                    </Picker>
                                </View>
                                <View
                                    style={{
                                        flex: 1
                                    }}>
                                    <Picker
                                        itemStyle={{
                                            ...Platform.select({
                                                ios: {
                                                    height: widthToDp('30'),
                                                },
                                                android: {
                                                    height: widthToDp('10'),
                                                }
                                            })
                                        }}
                                        selectedValue={`${props.minute}`}
                                        onValueChange={(val) => props.SET_MINUTE(val)}
                                    >
                                        {
                                            [...Array(60)].map((item, index) => <Picker.Item key={index} label={`${index}`} value={`${index}`} />)
                                        }
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        <View
                            style={techRegModalStyles.closeContainer}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    props.CLOSE_TIME_PICKER_MODAL()
                                }}
                            >
                                <Text
                                    style={{
                                        color: color.IOS_BLUE,
                                        fontWeight: 'bold',
                                        fontSize: widthToDp('4')
                                    }}
                                >
                                    ยืนยัน
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>

                {/* <View style={datePicker.contentContainer}>
                    <View style={datePicker.headerContainer}>
                        <Text style={datePicker.headerText}>เลือกเวลา</Text>
                    </View>
                    <View style={datePicker.pickerContainer}>
                        <View style={datePicker.dayContainer}>
                            <Picker
                                selectedValue={`${props.hour}`}
                                itemStyle={{height:150}}
                                onValueChange={(val) => {
                                    props.SET_HOUR(val)
                                }}
                            >
                                {
                                    [...Array(24)].map((item, index) => <Picker.Item key={index} label={`${index}`} value={`${index}`} />)
                                }
                            </Picker>
                        </View>
                        <View style={datePicker.dayContainer}>
                            <Picker
                                selectedValue={`${props.minute}`}
                                itemStyle={{height:150}}
                                onValueChange={(val) => props.SET_MINUTE(val)}
                            >
                                {
                                    [...Array(60)].map((item, index) => <Picker.Item key={index} label={`${index}`} value={`${index}`} />)
                                }
                            </Picker>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={datePicker.closeContainer}
                    onPress={() => props.CLOSE_TIME_PICKER_MODAL()}
                >
                    <Text style={datePicker.closeBtnText}>Close</Text>
                </TouchableOpacity> */}
            </Modal>
        </>
    )
}

export default connector(TimePickerModal)
