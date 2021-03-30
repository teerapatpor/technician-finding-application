import React, { useEffect } from 'react'

import { Text, View, TouchableOpacity, SafeAreaView, Platform } from 'react-native'

import Modal from 'react-native-modalbox'

import { CLOSE_DATE_PICKER_MODAL } from '../../store/actions/modalAction'
import { SET_DATE, SET_MONTH, SET_YEAR } from '../../store/actions/formAction'

import { Picker } from '@react-native-picker/picker'

import { connect } from 'react-redux'

import { widthToDp } from '../../stylesheet'

import { techRegModalStyles } from './SelectAptitudeModal'
import { color } from '../../stylesheet/colors'

const mapStateToProps = (state) => ({
    isOpen: state.modal.date_picker_modal,
    date_count: state.form.date_count,
    date: state.form.date,
    month: state.form.month,
    year: state.form.year
})

const connector = connect(mapStateToProps, { CLOSE_DATE_PICKER_MODAL, SET_DATE, SET_MONTH, SET_YEAR })

const DatePickerModal = (props) => {
    const month = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฏาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    const current_date = new Date()

    useEffect(() => {
        props.SET_DATE(current_date.getDate())
        props.SET_MONTH(current_date.getMonth())
        props.SET_YEAR(current_date.getFullYear())
    }, [])

    return (
        <>
            <Modal
                isOpen={props.isOpen}
                onClosed={() => {
                    props.CLOSE_DATE_PICKER_MODAL()
                }}
                backButtonClose={true}
                style={{ backgroundColor: 'transparent' }}
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
                                เลือกวันที่
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
                                    [techRegModalStyles.rowContainer,
                                    {
                                        ...Platform.select({
                                            ios: {
                                                flexDirection: 'row'
                                            },
                                            android: {
                                                flexDirection: 'column'
                                            }
                                        })
                                    }
                                    ]
                                }
                            >
                                <View
                                    style={{
                                        ...Platform.select({
                                            ios: {
                                                flex: 1
                                            },
                                            android: {
                                                height: widthToDp('10'),
                                                width: '100%'
                                            }
                                        }),
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
                                        selectedValue={props.date}
                                        onValueChange={(val) => props.SET_DATE(val)}
                                    >
                                        {
                                            [...Array(props.date_count)].map((item, index) => <Picker.Item key={index} label={`${index + 1}`} value={index + 1} />)
                                        }
                                    </Picker>
                                </View>
                                <View
                                    style={{
                                        ...Platform.select({
                                            ios: {
                                                flex: 2
                                            },
                                            android: {
                                                height: widthToDp('10'),
                                                width: '100%'
                                            }
                                        }),
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
                                        selectedValue={props.month}
                                        onValueChange={(val) => props.SET_MONTH(val)}
                                    >
                                        {
                                            month.map((item, index) => <Picker.Item key={index} label={`${item}`} value={index} />)
                                        }
                                    </Picker>
                                </View>
                                <View
                                    style={{
                                        ...Platform.select({
                                            ios: {
                                                flex: 2
                                            },
                                            android: {
                                                height: widthToDp('10'),
                                                width: '100%'
                                            }
                                        }),
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
                                        selectedValue={props.year}
                                        onValueChange={(val) => props.SET_YEAR(val)}
                                    >
                                        {
                                            [...Array(40)].map((item, index) => <Picker.Item key={index} label={`${current_date.getFullYear() + index + 543}`} value={current_date.getFullYear() + index} />)
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
                                    props.CLOSE_DATE_PICKER_MODAL()
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
                        <View style={{ flex: 1 }}>
                            <Picker
                                itemStyle={{ height: 150 }}
                                selectedValue={props.date}
                                onValueChange={ (val) => props.SET_DATE(val)}
                            >
                                {
                                    [...Array(props.date_count)].map((item , index) => <Picker.Item key={index} label={`${index+1}`} value={index+1} />)
                                }
                            </Picker>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Picker
                                itemStyle={{ height: 150 }}
                                selectedValue={props.month}
                                onValueChange={ (val) => props.SET_MONTH(val)}
                            >
                                {
                                    month.map((item, index) => <Picker.Item key={index} label={`${item}`} value={index} />)
                                }
                            </Picker>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Picker
                                itemStyle={{ height: 150 }}
                                selectedValue={props.year}
                                onValueChange={ (val) => props.SET_YEAR(val)}
                            >
                                {
                                    [...Array(40)].map((item, index) => <Picker.Item key={index} label={`${current_date.getFullYear() + index + 543}`} value={current_date.getFullYear() + index} />)
                                }
                            </Picker>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={datePicker.closeContainer}
                    onPress={() => props.CLOSE_DATE_PICKER_MODAL()}
                >
                    <Text style={datePicker.closeBtnText}>Close</Text>
                </TouchableOpacity> */}
            </Modal>
        </>
    )
}

export default connector(DatePickerModal)