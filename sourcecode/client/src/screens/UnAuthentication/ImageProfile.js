import React, { useState } from 'react'

import { SafeAreaView, View, Text, TouchableOpacity, Image, Platform, KeyboardAvoidingView } from 'react-native';

import ImagePickerModal from '../../components/Modal/ImagePickerModal'

import ImagePicker from 'react-native-image-crop-picker'

import Feather from 'react-native-vector-icons/Feather'

import { OPEN_IMAGE_PICKER_MODAL, CLOSE_IMAGE_PICKER_MODAL } from '../../store/actions/modalAction'
import { SET_IMAGE_PROFILE } from '../../store/actions/regAction'

import { connect } from 'react-redux';
import MyButton from '../../components/MyButton';
import { registor, color, content, widthToDp } from '../../stylesheet';
import Footer from '../../components/Registor/Footer';

const mapStateToProps = (state) => ({
    avatar: state.reg.avatar,
    avatar_status: state.reg.avatar_status
})

const ImageProfile = (props) => {

    const handleLibPicker = (image) => {
        props.SET_IMAGE_PROFILE(image.path)
            .then(res => {
                props.CLOSE_IMAGE_PICKER_MODAL()
            })
    }



    return (
        <>
            <SafeAreaView style={content.safearray}>
                <View style={[registor.container, { alignItems: 'center' }]}>
                    <View style={{ marginBottom: 15, width: '100%', alignItems: 'center' }}>
                        <Text style={registor.whaturname}>
                            เลือกรูปโปรไฟล์
                    </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            width: widthToDp('25'),
                            height: widthToDp('25'),
                            borderRadius: widthToDp('12.5'),
                            backgroundColor: color.BLUE_5,
                            marginBottom: widthToDp('3'),
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                        onPress={() => {
                            props.OPEN_IMAGE_PICKER_MODAL()
                        }}
                    >
                        {
                            !props.avatar_status ? (
                                <Feather name='image'
                                    style={{
                                        fontSize: widthToDp('10'),
                                        color: color.BLUE_3,
                                        opacity: 0.4
                                    }}
                                />
                            ) :
                                (
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: widthToDp('25'),
                                                height: widthToDp('25'),
                                                borderRadius: widthToDp('12.5'),
                                            }}
                                            source={
                                                Platform.OS === 'ios' ? { uri: props.avatar.path }
                                                    : { uri: props.avatar.path }
                                            }
                                        />
                                        <Feather name='upload'
                                            style={{
                                                fontSize: widthToDp('10'),
                                                color: color.BLUE_3,
                                                position: 'absolute',
                                                opacity: 0.4,
                                            }}
                                        />
                                    </View>
                                )
                        }
                    </TouchableOpacity>
                    <MyButton
                        title='ถัดไป'
                        onPress={() => {
                            if (props.avatar_status) props.navigation.navigate('reg_phone')
                            else alert('กรุณาเลือกรูปโปรไฟล์')
                        }}
                    />
                    <TouchableOpacity style={{ margin: 10 }}

                    >
                        <Text
                            style={{ color: color.IOS_BLUE, fontSize: 16 }}
                            onPress={() => {
                                props.navigation.navigate('reg_phone')
                            }}
                        >
                            ข้าม
                        </Text>
                    </TouchableOpacity>
                </View>
                <Footer navigation={props.navigation} />
            </SafeAreaView>
            <ImagePickerModal
                libFunc={() => {
                    ImagePicker.openPicker({
                        multiple: false,
                        width: 400,
                        height: 400,
                        cropping: true,
                        mediaType : 'photo',
                        cropperCircleOverlay: true
                    }).then(res => {
                        handleLibPicker(res, 'file')
                    }).catch(err => {
                        console.log(err);
                    })
                }}
                camFunc={() => {
                    ImagePicker.openCamera({
                        mediaType : 'photo',
                        cropping : true,
                        multiple : false,
                        width: 400,
                        height: 400,
                    }).then( res => {
                        handleLibPicker(res , 'file')
                    }).catch(err => {
                        console.log(err);
                    })
                }}
            />
        </>
    )
}

export default connect(mapStateToProps, { CLOSE_IMAGE_PICKER_MODAL, SET_IMAGE_PROFILE, OPEN_IMAGE_PICKER_MODAL })(ImageProfile)