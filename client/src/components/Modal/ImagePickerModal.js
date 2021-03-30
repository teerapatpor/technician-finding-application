import React from 'react'

import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native'

import Modal from 'react-native-modalbox'

import { datePicker, color , widthToDp , heightToDp , modalRadiusDp , buttonRadiusDp } from '../../stylesheet'


import { connect } from 'react-redux'
import { CLOSE_IMAGE_PICKER_MODAL } from '../../store/actions/modalAction'
import { SET_URI  , SET_FILE } from '../../store/actions/formAction'

import ImagePicker from 'react-native-image-crop-picker'
import { techRegModalStyles } from './SelectAptitudeModal'

const mapStateToProps = (state) => ({
    isOpen: state.modal.image_picker_modal
})

const ImagePickerModal = (props) => {
    return (
        <>
            <Modal
                isOpen={props.isOpen}
                backButtonClose={true}
                onClosed={() => props.CLOSE_IMAGE_PICKER_MODAL()}
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
                                เลือกรูปภาพ
                            </Text>
                        </View>
                        <View 
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: widthToDp('2'),
                                width: '100%'
                            }}
                        >
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={ () => {
                                    props.camFunc()
                                }}
                            >
                                <Text style={styles.text}>
                                    ถ่ายรูป
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.btn , styles.borderTop]}
                                onPress={ () => {
                                    props.libFunc()
                                }}
                            >
                                <Text
                                    style={styles.text}
                                >
                                    เลือกจากคลังรูปภาพ
                                    </Text>
                            </TouchableOpacity>
                            
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
                                    props.CLOSE_IMAGE_PICKER_MODAL()
                                }}
                            >
                                <Text
                                    style={{
                                        color: color.IOS_RED_LIGHT,
                                        fontWeight: 'bold',
                                        fontSize: widthToDp('4')
                                    }}
                                >
                                    ยกเลิก
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </>
    )
}

export default connect(mapStateToProps, { CLOSE_IMAGE_PICKER_MODAL , SET_URI , SET_FILE })(ImagePickerModal)

const styles = StyleSheet.create({
    btn: {
        paddingVertical : widthToDp('2'),
        justifyContent: 'center',
        alignItems: 'center',
        width : '100%'
    },
    borderTop:{
        borderTopColor: color.GREY_5,
        borderTopWidth: 1,
    },
    text: {
        fontSize: widthToDp('4'),
        color: color.BLUE_1,
        fontWeight : 'bold'
    }
})