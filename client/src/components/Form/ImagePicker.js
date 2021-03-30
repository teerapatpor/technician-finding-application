import React, { } from 'react'

import { Text, View, TouchableOpacity, Image, Platform } from 'react-native'
import { datePicker, posting, color, widthToDp } from '../../stylesheet'
import { connect } from 'react-redux'
import { OPEN_IMAGE_PICKER_MODAL } from '../../store/actions/modalAction'
import { DELETE_FILE } from '../../store/actions/formAction'
import Feather from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient'

const mapStateToProps = (state) => ({
    uri: state.form.uri,
    file: state.form.file
})

const ImageShower = ({ item , onDelete }) => {
    return (
        <>
            <View>
                <Image
                    source={{ uri: item.path }}
                    style={{
                        width: widthToDp('25'),
                        height: widthToDp('25'),
                        margin: widthToDp('1'),
                        borderRadius: widthToDp('4')
                    }}
                />
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: widthToDp('6'),
                        height: widthToDp('6'),
                        backgroundColor: color.BLUE_5,
                        borderRadius: widthToDp('5'),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={ () => onDelete()}
                >
                    <Feather name='x-circle' size={widthToDp('5')} color={color.IOS_RED_DARK} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const ImagePickerComponent = (props) => {


    return (
        <>
            <View style={posting.fullContainer}>
                <TouchableOpacity
                    onPress={() => props.OPEN_IMAGE_PICKER_MODAL()}
                >
                    <LinearGradient
                        style={{
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 10,
                            padding: 5
                        }}
                        colors={[
                            color.BLUE_5,
                            color.BLUE_5
                        ]}
                    >

                        {
                            props.file.length === 0 ? (
                                <>
                                    <Feather name='upload' style={{
                                        fontSize: 40,
                                        color: color.BLUE_3,
                                    }} />
                                    <Text style={posting.inputText}>
                                        อัปโหลดรูปภาพ
                                </Text>
                                </>
                            ) : (
                                    <>
                                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                            {
                                                props.file.map((item, index) => {
                                                    return (
                                                        <ImageShower
                                                            item={item}
                                                            key={index}
                                                            onDelete={ () => props.DELETE_FILE(item)}
                                                        />
                                                    )
                                                })
                                            }
                                            <View
                                                style={{
                                                    width: widthToDp('25'),
                                                    height: widthToDp('25'),
                                                    margin: widthToDp('1'),
                                                    borderRadius: widthToDp('4'),
                                                    justifyContent : 'center',
                                                    alignItems : 'center'
                                                }}
                                            >
                                                <Feather name='plus' size={widthToDp('8')} color={color.BLUE_0} />
                                            </View>
                                            {/* {
                                                props.file.length < 5 ? (
                                                    <>
                                                        {
                                                            props.file.map((item, index) => {
                                                                return (
                                                                    <ImageShower
                                                                        item={item}
                                                                        key={index}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </>

                                                ) : (
                                                        <>
                                                            {
                                                                props.file.map((item, index) => {
                                                                    return (
                                                                        <>
                                                                            <ImageShower 
                                                                                key={index}
                                                                                item={item}
                                                                            />
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                    )

                                            } */}
                                        </View>
                                    </>
                                )
                        }
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            {/* <View style={posting.detailLength}>
                <Text style={{ color: color.BLUE_4 }}>{`${props.file.length}/5`}</Text>
            </View> */}
        </>
    )
}

export default connect(mapStateToProps, { DELETE_FILE, OPEN_IMAGE_PICKER_MODAL })(ImagePickerComponent)